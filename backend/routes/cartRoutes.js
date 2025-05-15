const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/:userId', async (req, res) => {
    const cart = await Cart.findOne({userId: req.params.userId}).populate('items.productId');
    res.json(cart || {userId: req.params.userId, items: []});
});

router.post('/add', async (req, res) =>{
    const {userId, productId, quantity} = req.body;
    let cart = await Cart.findOne({ userId});
    if (!cart)
        cart = new Cart ({userId , items:[]});
    const itemIndex = cart.items.findIndex(item => item.productId.toString() == productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    }
    else {
        cart.items.push({productId, quantity});
    }

    await cart.save();
    const updatedCart = await Cart.findOne({userId})
        .populate('items.productId');
    res.json(updatedCart);
});

module.exports = router;