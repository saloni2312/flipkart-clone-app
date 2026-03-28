const express = require('express');
const db = require('../db');
const router = express.Router();

// POST /api/orders
router.post('/', (req, res) => {
    const { shippingAddress } = req.body;
    if (!shippingAddress) return res.status(400).json({ error: 'Shipping address required' });

    const cartItems = db.prepare(`
    SELECT c.id as cart_id, c.quantity,
           p.id as product_id, p.name, p.price, p.images, p.stock
    FROM cart c
    JOIN products p ON c.product_id = p.id
  `).all();

    if (cartItems.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    for (const item of cartItems) {
        if (item.stock < item.quantity) {
            return res.status(400).json({ error: `Insufficient stock for ${item.name}` });
        }
    }

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const delivery = subtotal > 500 ? 0 : 40;
    const total = subtotal + delivery;
    const orderNumber = `FK${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const placeOrder = db.transaction(() => {
        const orderResult = db.prepare(`
      INSERT INTO orders (order_number, shipping_address, subtotal, delivery_fee, total)
      VALUES (?, ?, ?, ?, ?)
    `).run(orderNumber, JSON.stringify(shippingAddress), subtotal, delivery, total);

        const orderId = orderResult.lastInsertRowid;

        const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, product_name, product_image, quantity, price_at_purchase)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

        for (const item of cartItems) {
            const images = JSON.parse(item.images);
            insertItem.run(orderId, item.product_id, item.name, images[0], item.quantity, item.price);
            db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.quantity, item.product_id);
        }

        db.prepare('DELETE FROM cart').run();
        return orderId;
    });

    const orderId = placeOrder();
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    res.json({
        success: true,
        orderId,
        orderNumber,
        order: { ...order, shipping_address: JSON.parse(order.shipping_address) }
    });
});

// GET /api/orders
router.get('/', (req, res) => {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all().map(o => ({
        ...o,
        shipping_address: JSON.parse(o.shipping_address),
        items: db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id),
    }));
    res.json(orders);
});

// GET /api/orders/:id
router.get('/:id', (req, res) => {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
    res.json({
        ...order,
        shipping_address: JSON.parse(order.shipping_address),
        items,
    });
});

module.exports = router;
