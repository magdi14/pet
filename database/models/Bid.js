const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bid = new Schema({
  amount_of_money: Number,
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  pet_id: { type: Schema.Types.ObjectId, ref: "Pet"}
});

module.exports = mongoose.model("Bid", bid);
