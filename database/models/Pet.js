const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pet = new Schema({
  name: String,
});

module.exports = mongoose.model("Pet", pet);
