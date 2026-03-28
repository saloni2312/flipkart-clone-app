const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /api/cart
router.get('/', (req, res) => {
    const items = db.prepare(`
    SELECT c.id, c.quantity, c.added_at,
           p.id as product_id, p.name, p.price, p.original_price, p.discount_percent,
           p.rating, p.review_count, p.stock, p.images
    FROM cart c
    JOIN products p ON c.product_id = p.id
    ORDER BY c.added_at DESC
  `).all().map(item => ({
        ...item,
        images: JSON.parse(item.images),
    }));

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const originalTotal = items.reduce((sum, i) => sum + i.original_price * i.quantity, 0);
    const discount = originalTotal - subtotal;
    const delivery = subtotal > 500 ? 0 : 40;
    const total = subtotal + delivery;

    res.json({ items, subtotal, discount, delivery, total });
});

// POST /api/cart
router.post('/', (req, res) => {
    console.log('🛒 POST /api/cart - Body:', req.body);
    let { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId required' });

    productId = parseInt(productId);
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const existing = db.prepare('SELECT * FROM cart WHERE product_id = ?').get(productId);
    if (existing) {
        db.prepare('UPDATE cart SET quantity = quantity + ? WHERE product_id = ?').run(quantity, productId);
    } else {
        db.prepare('INSERT INTO cart (product_id, quantity) VALUES (?, ?)').run(productId, quantity);
    }

    const item = db.prepare('SELECT * FROM cart WHERE product_id = ?').get(productId);
    res.json({ success: true, item });
});

// PUT /api/cart/:id
router.put('/:id', (req, res) => {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) return res.status(400).json({ error: 'Valid quantity required' });

    const item = db.prepare('SELECT * FROM cart WHERE id = ?').get(req.params.id);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });

    db.prepare('UPDATE cart SET quantity = ? WHERE id = ?').run(quantity, req.params.id);
    res.json({ success: true });
});

// DELETE /api/cart/:id
router.delete('/:id', (req, res) => {
    const item = db.prepare('SELECT * FROM cart WHERE id = ?').get(req.params.id);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });

    db.prepare('DELETE FROM cart WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// DELETE /api/cart (clear all)
router.delete('/', (req, res) => {
    db.prepare('DELETE FROM cart').run();
    res.json({ success: true });
});

module.exports = router;
