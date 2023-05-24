const { Schema, default: mongoose } = require("mongoose");

const ProductInfoSchema = new Schema(
  {
    productname: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductInfo", ProductInfoSchema);
