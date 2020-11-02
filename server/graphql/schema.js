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
    email:String!,
    posts:[Post]!,
}
type Post {
    _id : ID!,
    title: String!,
    body:String!,
    creator:User!,
    date:String!,
}
type AuthData {
    userId : ID!,
    token:String!,
    tokenExpire:Int!

}

input UserInput {
    username: String!,
    password:String!,
    email:String!,
}
input PostInput {
    title: String!,
    body:String!,
    date:String!,
}

type rootQuery {
    users:[User!]!
    posts:[Post!]!
    login(email:String!,password:String!):AuthData
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
