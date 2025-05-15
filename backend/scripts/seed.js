const mongoose = require('mongoose');
const Product = require('../models/Product');

const MONGO_URI = 'mongodb+srv://abhishiktmanda:tPqNqJMfOoLImKKy@cluster0.kn6ub41.mongodb.net/';

async function seed(){
    try {
        await mongoose.connect(MONGO_URI, {
            dbName :'ecommerce'
        });
        console.log("Connected to MongoDB.");

        const freshProducts = [
            {
                name: "Amazon Brand - Symbol",
                description: "Men's Solid Cotton Formal Shirt | Plain | Full Sleeve ",
                price: 539,
                image: "https://a.media-amazon.com/images/I/71y0jvWeG3L._SY879_.jpg"
            },
            {
                name: "The Souled Store Solids",
                description: "Rich Cream Men and Boys Long Sleeves Collared Neck Button",
                price: 1299,
                image: "https://a.media-amazon.com/images/I/61yy0KqgO-L._SY741_.jpg"
            },
            {
                name: "Urbano Fashion",
                description: "Men's Cotton Full Sleeve Regular Fit",
                price: 854,
                image: "https://a.media-amazon.com/images/I/61538-iUhPL._SX679_.jpg"
            }
        ];
        await Product.insertMany(freshProducts);
        console.log("Fresh Products added successfully.");
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB.");
    } catch(err){
        console.error("Error seeding data.", err);
        await mongoose.disconnect();
    }
}
seed();
