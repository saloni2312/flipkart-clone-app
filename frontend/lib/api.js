const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/products?${query}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export async function fetchProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
}

export async function fetchCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}

export async function fetchCart() {
    const res = await fetch(`${API_BASE}/cart`);
    if (!res.ok) throw new Error('Failed to fetch cart');
    return res.json();
}

export async function addToCart(productId, quantity = 1) {
    const res = await fetch(`${API_BASE}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
    });
    if (!res.ok) throw new Error('Failed to add to cart');
    return res.json();
}

export async function updateCartItem(id, quantity) {
    const res = await fetch(`${API_BASE}/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error('Failed to update cart');
    return res.json();
}

export async function removeCartItem(id) {
    const res = await fetch(`${API_BASE}/cart/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to remove from cart');
    return res.json();
}

export async function placeOrder(shippingAddress) {
    const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shippingAddress }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to place order');
    }
    return res.json();
}

export async function fetchOrders() {
    const res = await fetch(`${API_BASE}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
}

export async function fetchOrder(id) {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    if (!res.ok) throw new Error('Order not found');
    return res.json();
}

export function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
}
