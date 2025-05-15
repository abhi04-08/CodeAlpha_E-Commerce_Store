const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) =>{
    const products = await Product.find();
    res.json(products);
});

router.post('/', async (req,res) => {
    const {name, price, image} = req.body;
    const product = new Product ({name, price, image});
    await Product.save();
    res.json(product);
});

module.exports = router;