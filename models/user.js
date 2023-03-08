const mongoose = require("mongoose");
const { Schema } = mongoose;

// the key should be same as that of the json coming from request of frontpage
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    sparse: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", userSchema);
// User.createIndexes();/
module.exports = User;
