const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
} = graphql;

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
        return Recipe.find({ _id: { $gt: "5dc0ccb96a6ea150fc54a980" } }).limit(
          8
        );
      }
    },

    recipe: {
      type: RecipeType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Recipe.findById(args._id);
      }
    },

    recipesPaginated: {
      type: new GraphQLList(RecipeType),
      args: {
        cursor: { type: GraphQLID },
        limit: { type: GraphQLInt }
      },
      resolve(_, { cursor, limit }) {
        if (!cursor) {
          return Recipe.find().limit(limit);
        } else {
          return Recipe.find({ _id: { $gt: cursor } }).limit(limit);
        }
      }
    }
  })
});

module.exports = RootQueryType;
