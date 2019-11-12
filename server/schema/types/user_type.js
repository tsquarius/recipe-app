const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} = graphql;

const User = mongoose.model("users");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    recipes: {
      type: new GraphQLList(require("./recipe_type")),
      resolve(parentValue) {
        return User.findById(parentValue)
        .populate("recipes")
        .then(user => user.recipes);
      }
    },
    hasAccess: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
