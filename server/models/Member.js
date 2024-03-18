const mongoose = require("mongoose");
const { Schema } = mongoose;

const MemberSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  admin_id: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^(\+998)\d{2}\d{3}\d{2}\d{2}$/.test(value);
      },
      message: "Invalid phone number format",
    },
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;