const express = require("express"); // For Routing endpoints
const mongoose = require("mongoose"); // noSQL database
const bodyParser = require("body-parser"); // parse requests into JSON
const db = require("../config/keys").mongoURI;
const app = express();
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors"); // allows us to communicate between our two servers

if (!db) {
  throw new Error("Please provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);

module.exports = app;
