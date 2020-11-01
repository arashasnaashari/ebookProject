const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publication: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Event", eventSchema);
