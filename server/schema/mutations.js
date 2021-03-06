const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
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
        ingredients: { type: new GraphQLList(GraphQLString) },
        steps: { type: new GraphQLList(GraphQLString) },
        image: { type: GraphQLString }
      },
      async resolve(_, data, context) {
        const currentUser = await AuthService.currentUser({
          token: context.token
        });

        // ensure the user is signed in before we move on
        if (!currentUser) return;

        return Recipe.addNewRecipe(data, currentUser);
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
      async resolve(
        _,
        { id, name, description, ingredients, steps, image },
        context
      ) {
        const currentUser = await AuthService.currentUser({
          token: context.token
        });

        if (!currentUser) return;

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
        rating: { type: GraphQLInt }
      },
      async resolve(_, { id, rating }, context) {
        const currentUser = await AuthService.currentUser({
          token: context.token
        });

        if (!currentUser) return;

        return Recipe.updateRating(id, currentUser._id, rating);
      }
    },

    // for admin usage
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

    facebookAuth: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        facebookId: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.facebookAuth(args);
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
    },

    increaseViewCount: {
      type: RecipeType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, { _id }) {
        return Recipe.addViewCount(_id);
      }
    }
  }
});

module.exports = mutation;
