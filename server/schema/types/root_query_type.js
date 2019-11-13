const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} = graphql;

const AuthService = require("../../services/auth");

const UserType = require("./user_type");
const User = mongoose.model("users");

const RecipeType = require("./recipe_type");
const Recipe = mongoose.model("recipes");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },

    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },

    recipes: {
      type: new GraphQLList(RecipeType),
      resolve() {
        return Recipe.find({});
      }
    },

    recipe: {
      type: RecipeType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Recipe.findById(args._id);
      }
    },

    newestRecipe: {
      type: new GraphQLList(RecipeType),
      resolve(_) {
        return Recipe.find({})
          .sort({ _id: -1 })
          .limit(4);
      }
    },

    recipesPaginated: {
      type: new GraphQLList(RecipeType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      resolve(_, { limit, offset }) {
        return Recipe.find()
          .skip(offset ? offset : "")
          .limit(limit);
      }
    },

    ingredientSearch: {
      type: new GraphQLList(RecipeType),
      args: {
        ingredients: { type: new GraphQLList(GraphQLString) },
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        method: {
          type: GraphQLString,
          description: "Search for 'any' matching ingredients or 'all'"
        }
      },
      resolve(_, { ingredients, offset, limit, method }) {
        let ingredientsRegex;

        if (method === "any") {
          ingredientsRegex = ingredients.join("|.*");

          return Recipe.find({
            ingredients: {
              $regex: ".*" + ingredientsRegex + ".*",
              $options: "i"
            }
          })
            .skip(offset ? offset : "")
            .limit(limit ? limit : "");
        } else {
          ingredientsRegex = ingredients.map(ingredient => {
            return {
              ingredients: { $regex: ".*" + ingredient + ".*", $options: "i" }
            };
          });
          return Recipe.find({
            $and: ingredientsRegex
          })
            .skip(offset ? offset : "")
            .limit(limit ? limit : "");
        }
      }
    },

    //check if current user is author of content
    isAuthor: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      async resolve(_, { id }, context) {
        const currentUser = await AuthService.currentUser({
          token: context.token
        });

        if (!currentUser) return;

        return User.isAuthor(currentUser._id, id);
      }
    }
  })
});

module.exports = RootQueryType;
