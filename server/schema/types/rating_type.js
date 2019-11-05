const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat } = graphql;

const RatingType = new GraphQLObjectType({
  name: "RatingType",
  fields: () => ({
    user: { type: GraphQLString },
    rating: { type: GraphQLFloat }
  })
});

module.exports = RatingType;
