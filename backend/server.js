const express = require('express');
const cors = require('cors');
const db = require('./db'); // Initialize DB schema
require('./seed'); // Seed if empty

const app = express();
const PORT = process.env.PORT || 5000;

// Allow all origins — Railway backend is public, Vercel frontend URL is dynamic
app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// Categories endpoint
app.get('/api/categories', (req, res) => {
    const categories = db.prepare('SELECT * FROM categories ORDER BY id').all();
    res.json(categories);
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Flipkart Clone API running' }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Flipkart Clone API running at http://localhost:${PORT}`);
});
