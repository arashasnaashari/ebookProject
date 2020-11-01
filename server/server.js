const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");

const schema = require("./graphql/schema");
const rootValue = require("./graphql/resolves");

const app = express();

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.dcr08.mongodb.net/new?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(4000, console.log("!!!!!!!!!!!"));
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue,
  })
);
