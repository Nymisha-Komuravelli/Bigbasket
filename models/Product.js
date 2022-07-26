const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    info: { type: String, required: true },
  }, { timestamps: true });

  //Product represents our table. We can do insert, update etc. using Product.
const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
