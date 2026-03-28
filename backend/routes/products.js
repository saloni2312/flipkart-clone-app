const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /api/categories
router.get('/categories', (req, res) => {
    const categories = db.prepare('SELECT * FROM categories ORDER BY id').all();
    res.json(categories);
});

// GET /api/products?search=&category=&page=&limit=
router.get('/', (req, res) => {
    const { search = '', category = '', page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = `
    SELECT p.*, c.name as category_name, c.icon as category_icon
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;
    const params = [];

    if (search) {
        query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
        params.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
        query += ` AND p.category_id = ?`;
        params.push(parseInt(category));
    }

    const countQuery = query.replace('SELECT p.*, c.name as category_name, c.icon as category_icon', 'SELECT COUNT(*) as total');
    const total = db.prepare(countQuery).get(...params).total;

    query += ` ORDER BY p.id LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    const products = db.prepare(query).all(...params).map(p => ({
        ...p,
        images: JSON.parse(p.images),
        specs: JSON.parse(p.specs),
    }));

    res.json({ products, total, page: parseInt(page), limit: parseInt(limit) });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
    const product = db.prepare(`
    SELECT p.*, c.name as category_name, c.icon as category_icon
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `).get(req.params.id);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json({
        ...product,
        images: JSON.parse(product.images),
        specs: JSON.parse(product.specs),
    });
});

module.exports = router;
