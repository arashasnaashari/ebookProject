const User = require("../models/userAuthInfo");
const Post = require("../models/post");
const bcrypt = require("bcrypt");

const posts = async (postsIds) => {
  try {
    const posts = await Post.find({ _id: { $in: postsIds } });
    posts.map((posts) => {
      return {
        ...posts._doc,
        _id: posts.id,
        date: new Date(posts._doc.date).toISOString(),
        creator: user.bind(this, posts.creator),
      };
    });
    return posts;
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      posts: posts.bind(this, user._doc.posts),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  posts: async () => {
    try {
      const posts = await Post.find();
      return posts.map((post) => {
        return {
          ...post._doc,
          _id: post.id,
          date: new Date(post._doc.date).toISOString(),
          creator: user.bind(this, post._doc.creator),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({
        username: args.userInput.username,
      });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        username: args.userInput.username,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (error) {
      throw error;
    }
  },
  createPost: async (args) => {
    const post = new Post({
      title: args.postInput.title,
      body: args.postInput.body,
      creator: "5f9ee7c7e690053798646f16",
      date: new Date(args.postInput.date),
    });
    let createdPost;
    try {
      const result = await post.save();
      createdPost = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(post._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };
      const creator = await User.findById("5f9ee7c7e690053798646f16");
      if (!creator) {
        throw new Error("User not found.");
      }
      creator.posts.push(post);
      await creator.save();

      return createdPost;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

// return { ...result._doc, password: null, _id: result.id };
//WHY ?
// becuse it contains meta data and we get the read of them by doing ._doc
