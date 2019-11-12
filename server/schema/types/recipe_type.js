const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat
} = graphql;

const Recipe = mongoose.model("recipes");
const RatingType = require("./rating_type");
const User = mongoose.model("users");

const RecipeType = new GraphQLObjectType({
  name: "RecipeType",
  fields: () => ({
    _id: { type: GraphQLID },
    scrapeId: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    url: { type: GraphQLString },
    image: { type: GraphQLString },
    rating: { type: new GraphQLList(RatingType) },
    author: { type: GraphQLString },
    ingredients: { type: new GraphQLList(GraphQLString) },
    steps: { type: new GraphQLList(GraphQLString) },
    viewCount: { type: GraphQLInt },
    averageRate: { type: GraphQLFloat, resolve(parentValue) {
      return Recipe.findById(parentValue._id).then(recipe => {
        const reducer = (acc, cv) => {
          return acc + cv;
        };
        const rates = recipe.rating.map(rater => rater.rating);
        if (rates.length === 0 ) return 0;
        return rates.reduce(reducer) / rates.length;
      });
    } },
    user: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.user._id);
      }
    }
  })
});

module.exports = RecipeType;
