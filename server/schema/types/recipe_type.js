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
    viewCount: { type: GraphQLInt }
  })
});

module.exports = RecipeType;
