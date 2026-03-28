'use client';

/**
 * Client-side cart store using localStorage.
 * This makes the cart work reliably without needing a backend server.
 */

const CART_KEY = 'flipkart_cart';

function getCart() {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart-updated'));
}

export function getCartItems() {
    return getCart();
}

export function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function addItemToCart(product) {
    const items = getCart();
    const existing = items.find(i => i.productId === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        items.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            original_price: product.original_price,
            discount_percent: product.discount_percent,
            image: Array.isArray(product.images) ? product.images[0] : (typeof product.images === 'string' ? JSON.parse(product.images)[0] : ''),
            quantity: 1,
            stock: product.stock || 50,
            rating: product.rating,
        });
    }
    saveCart(items);
    return true;
}

export function updateItemQuantity(productId, quantity) {
    const items = getCart();
    const item = items.find(i => i.productId === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(items);
    }
}

export function removeItemFromCart(productId) {
    const items = getCart().filter(i => i.productId !== productId);
    saveCart(items);
}

export function clearCart() {
    saveCart([]);
}

export function getCartSummary() {
    const items = getCart();
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const originalTotal = items.reduce((sum, i) => sum + i.original_price * i.quantity, 0);
    const discount = originalTotal - subtotal;
    const delivery = subtotal > 500 ? 0 : 40;
    const total = subtotal + delivery;
    return { items, subtotal, originalTotal, discount, delivery, total };
}
