const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  auth: {
    type: Schema.Types.ObjectId,
    ref: "UserAuthInfo",
  },
  age: {
    type: Number,
    required: true,
  },
  books: [
    {
      type: String,
      required: true,
    },
  ],
  readingBooks: {
    type: String,
    required: true,
  },
  readBooks: {
    type: String,
  },
  bio: {
    type: Number,
  },
});

module.exports = mongoose.model("UserMoreInfo", eventSchema);
