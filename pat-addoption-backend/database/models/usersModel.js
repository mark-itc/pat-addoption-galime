const { boolean } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    confirmPassword: String,
    bio: String,
    permissions: String,
    isAdmin: Boolean,
    phone: String,
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet" }],
    savedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet" }],
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.confirmPassword;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("user", userSchema);
