const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://abhishiktmanda:tPqNqJMfOoLImKKy@cluster0.kn6ub41.mongodb.net/',{
    dbName: 'ecommerce'
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error", err));

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});