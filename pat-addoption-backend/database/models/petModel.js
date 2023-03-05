const { any, string, object } = require("joi");
const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    type: String,
    name: String,
    status: String,
    image: String,
    height: Number,
    weight: Number,
    color: String,
    bio: String,
    hypoallergenic: Boolean,
    dietary: String,
    breed: String,
    userId: [{ type: mongoose.Schema.Types.String, ref: "users" }],
    image: Buffer,
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("pet", petSchema);
