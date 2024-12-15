const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  username: {
    required: true,
    unique: true,
    minLength: 3,
    type: String,
  },
  favoriteGenre: {
    required: false,
    type: String,
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);
