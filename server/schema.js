const monk = require("monk");
const db = monk(
  "mongodb+srv://admin:admin@cluster0.dcr08.mongodb.net/book?retryWrites=true&w=majority"
);
const coll = db.get("book");
const db2 = monk(
  "mongodb+srv://admin:admin@cluster0.dcr08.mongodb.net/user?retryWrites=true&w=majority"
);
const coll2 = db2.get("user");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
} = require("graphql");

const bookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    title: { type: GraphQLString },
    _id: { type: GraphQLID },
    isbn: { type: GraphQLString },
    pageCount: { type: GraphQLInt },
    publishedDate: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString },
    shortDescription: { type: GraphQLString },
    longDescription: { type: GraphQLString },
    // authors: { type: GraphQLNonNull },
    // categories: { type: GraphQLNonNull },
  }),
});

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    name: { type: GraphQLString },
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    // pageCount: { type: GraphQLInt },
    // publishedDate: { type: GraphQLString },
    // thumbnailUrl: { type: GraphQLString },
    // shortDescription: { type: GraphQLString },
    // longDescription: { type: GraphQLString },
    // authors: { type: GraphQLNonNull },
    // categories: { type: GraphQLNonNull },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    books: {
      type: new GraphQLList(bookType),
      async resolve(parent, args) {
        const books = await coll.find({});
        return books;
      },
    },
    book: {
      type: bookType,
      args: { title: { type: GraphQLString } },
      async resolve(parent, args) {
        const title = args.title;
        const item = await coll.findOne({
          title: title,
        });
        return item;
      },
    },
    users: {
      type: new GraphQLList(userType),
      async resolve(parent, args) {
        const users = await coll2.find({});
        return users;
      },
    },
    user: {
      type: userType,
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        const name = args.name;
        const item = await coll2.findOne({
          name: name,
        });
        return item;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userType,
      args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let value = {
          name: args.name,
          username: args.username,
        };

        const inserted = await coll2.insert(value);

        return inserted;
      },
    },
    createBook: {
      type: bookType,
      args: {
        title: { type: GraphQLString },
        thumbnailUrl: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let value = {
          title: args.title,
          thumbnailUrl: args.thumbnailUrl,
        };

        const inserted = await coll.insert(value);

        return inserted;
      },
    },
    updateBook: {
      type: bookType,
      args: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const updated = await coll.update(
          {
            _id: args._id,
          },
          {
            $set: { title: args.title },
          }
        );

        return updated;
      },
    },
    deleteUser: {
      type: userType,
      args: {
        name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await coll2.remove({ name: args.name });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
