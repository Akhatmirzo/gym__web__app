const mongoose = require("mongoose");
const { Schema } = mongoose;

const MemberShipSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  member_id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const MemberShip = mongoose.model("MemberShip", MemberShipSchema);
module.exports = MemberShip;