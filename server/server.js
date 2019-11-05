const express = require("express"); // For Routing endpoints
const mongoose = require("mongoose"); // noSQL database
const bodyParser = require("body-parser"); // parse requests into JSON
const db = require("../config/keys").mongoURI;

const app = express();

if (!db) {
  throw new Error("Please provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

module.exports = app;