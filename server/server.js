const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./graphql/schema");
const rootValue = require("./graphql/resolves");

const isAuth = require("./middleware/is-auth");
const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(isAuth);
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
