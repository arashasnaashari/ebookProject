const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Book {
    _id : ID!,
    title: String!,
    group:String!,
    author:String!,
    publication:String!,
    price:Float!
}
type User {
    _id : ID!,
    username: String!,
    password:String!,
    posts:[Post]!,
}
type Post {
    _id : ID!,
    title: String!,
    body:String!,
    creator:User!,
    date:String!,
}


input UserInput {
    username: String!,
    password:String!,
}
input PostInput {
    title: String!,
    body:String!,
    date:String!,
}

type rootQuery {
    users:[User!]!
    posts:[Post!]!
}
type rootMutation {
    createPost(postInput:PostInput):Post
    createUser(userInput:UserInput):User
}
schema {
    query:rootQuery,
    mutation:rootMutation
}

`);
