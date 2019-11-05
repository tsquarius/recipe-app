const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt
} = graphql;
const mongoose = require("mongoose");

//Models and Types
const User = mongoose.model("users");
const UserType = require("./types/user_type");
const Recipe = mongoose.model("recipes");
const RecipeType = require("./types/recipe_type");
const RatingType = require("./types/rating_type");

// for User Auth services (login/logout/register)
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newRecipe: {
      type: RecipeType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        author: { type: GraphQLString },
        ingredients: { type: new GraphQLList(GraphQLString) },
        steps: { type: new GraphQLList(GraphQLString) },
        image: { type: GraphQLString }
      },
      resolve(_, { name, description, author, ingredients, steps, image }) {
        // reminder to update to use Current user as author
        return new Recipe({
          name,
          description,
          author,
          ingredients,
          steps,
          image
        }).save();
      }
    },

    updateRecipe: {
      type: RecipeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        ingredients: { type: new GraphQLList(GraphQLString) },
        steps: { type: new GraphQLList(GraphQLString) },
        image: { type: GraphQLString }
      },
      resolve(_, { id, name, description, ingredients, steps, image }) {
        const updateObj = {};
        if (name) updateObj.name = name;
        if (description) updateObj.description = description;
        if (ingredients) updateObj.ingredients = ingredients;
        if (steps) updateObj.steps = steps;
        if (image) updateObj.image = image;

        return Recipe.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, recipe) => {
            return recipe;
          }
        );
      }
    },

    removeRecipe: {
      type: RecipeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(_, { id }) {
        return Recipe.remove({ _id: id });
      }
    },

    rateRecipe: {
      type: RecipeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        user: { type: GraphQLString },
        rating: { type: GraphQLInt }
      },
      resolve(_, { id, user, rating }) {
        return Recipe.updateRating(id, user, rating);
      }
    },

    removeRating: {
      type: RecipeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        user: { type: GraphQLString }
      },
      resolve(_, { id, user }) {
        return Recipe.removeRating(id, user);
      }
    },

    register: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },

    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },

    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },

    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    }
  }
});

module.exports = mutation;
