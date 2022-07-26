const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { body, validationResult } = require("express-validator");
const { response } = require("express");

/* 
    @usage: Get all Products
    @url: http://127.0.0.1:5000/api/products
    @fields: no-fields
    @method: GET
    @access: public
*/
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json({ products: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: error.message });
  }
});
/* 
    @usage: Get a single Product
    @url: http://127.0.0.1:5000/api/products/:product_id
    @fields: no-fields
    @method: GET
    @access: public
*/
router.get("/products/:product_id", async (req, res) => {
  let product_id = req.params.product_id;
  try {
    let product = await Product.findById(product_id);
    res.status(200).json({ product: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: error.message });
  }
  // res.json({ msg: "Get a single product", id: product_id });
});
/* 
    @usage: Create a Product
    @url: http://127.0.0.1:5000/api/products
    @fields: name, image, price, quantity, info
    @method: POST
    @access: public
*/
router.post(
  "/products",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("image").notEmpty().withMessage("Image is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("quantity").notEmpty().withMessage("Quantity is required"),
    body("info").notEmpty().withMessage("Info is required"),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let product = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        quantity: req.body.quantity,
        info: req.body.info,
      };
      product = new Product(product);
      await product.save();
      res.status(200).json({
        msg: "Create a Product",
        product: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: errors.array() });
    }
  }
);
/* 
    @usage: Update a Product
    @url: http://127.0.0.1:5000/api/products/:product_id
    @fields: name, image, price, quantity, info
    @method: PUT
    @access: public
*/
router.put("/products/:product_id", async (req, res) => {
  let product_id = req.params.product_id;
  try{
    let product = await Product.findById(product_id);
    if(!product){
      return res.status(500).json({errors: "No Product Found"});
    }
    let updatedProduct = {
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      quantity: req.body.quantity,
      info: req.body.info
    }
    product = await Product.findByIdAndUpdate(product_id, {
      $set: updatedProduct
    }, {new: true})
    res.status(200).json({
      msg: "Product is updated",
      product: product
    })
  } catch(error){
    console.error(error);
    res.status(500).json({errors: error.message})
  }
});
/* 
    @usage: Delete a Product
    @url: http://127.0.0.1:5000/api/products/:product_id
    @fields: no-fields
    @method: DELETE
    @access: public
*/
router.delete("/products/:product_id", async (req, res) => {
  let product_id = req.params.product_id;
  let product = await Product.findById(product_id);
  if(!product){
    return res.status(500).json({errors: "No Product Found"});
  }
  product = await Product.findByIdAndDelete(product_id);
  res.status(200).json({ msg: "Product is deleted" });
});

module.exports = router;
