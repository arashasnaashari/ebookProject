const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.dcr08.mongodb.net/book?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("########")
);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, console.log("!!!!!!!!!!!"));
