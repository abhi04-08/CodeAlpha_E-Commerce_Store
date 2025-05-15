const API_BASE = 'http://localhost:5000';
const USER_ID = 'demoUser123';

async function loadProducts() {
    const res = await fetch(`${API_BASE}/api/products`);
    const products = await res.json();
    console.log('Products:', products);
    const list = document.getElementById('product-lists');
    list.innerHTML = '';

    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
        <img src = "${product.image}" width = "150px"><br>
        <strong> ${product.name}</strong><br>
        ₹${product.price}<br>
        <button onclick = "addToCart('${product._id}')">Add to Cart </button>
        `;
        list.appendChild(div);
    });
}

async function addToCart(productId) {
    await fetch(`${API_BASE}/api/cart/add` , {
        method : 'POST',
        headers : {'Content-type' : 'application/json'} , 
        body : JSON.stringify({ userId: USER_ID, productId, quantity: 1})
    });
    alert("Added to Cart");
    loadCart();
}

async function loadCart() {
    const res = await fetch(`${API_BASE}/api/cart/${USER_ID}`);
    const cart = await res.json();
    console.log('Cart:', cart);
    const div = document.getElementById('cart-items');
    div.innerHTML = '';

    if(cart.items.length == 0){
        div.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    cart.items.forEach(item => {
        if(item.productId){
            div.innerHTML += `<p>${item.productId.name} - ₹${item.productId.price} x ${item.quantity}</p>`;
        }else{
            div.innerHTML += `<p>Product not found</p>`;
        }
    });
}

loadProducts();
loadCart();