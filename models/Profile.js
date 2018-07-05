const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  likes: {
    type: Array
  },
  compare: {
    type: Array
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
