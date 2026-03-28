const db = require('./db');

const categories = [
    { id: 1, name: 'Mobiles', icon: '📱' },
    { id: 2, name: 'Fashion', icon: '👗' },
    { id: 3, name: 'Electronics', icon: '💻' },
    { id: 4, name: 'Home', icon: '🏠' },
    { id: 5, name: 'Appliances', icon: '📺' },
    { id: 6, name: 'Beauty', icon: '💄' },
    { id: 7, name: 'Toys', icon: '🧸' },
    { id: 8, name: 'Furniture', icon: '🪑' },
    { id: 9, name: 'Sports & Gym', icon: '🏋️' },
    { id: 10, name: 'Books', icon: '📚' },
    { id: 11, name: 'Household', icon: '🧽' },
    { id: 12, name: 'Auto Acc', icon: '🚗' },
];

const products = [
    // --- Mobiles (Category 1) ---
    {
        category_id: 1, name: 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 12GB RAM, 256GB Storage)', price: 109999, original_price: 134999,
        rating: 4.5, review_count: 12453,
        description: 'Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 17.25 cm (6.8") flat display.',
        stock: 50,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']),
        specs: JSON.stringify({ 'Display': '6.8" Dynamic AMOLED', 'Processor': 'Snapdragon 8 Gen 3', 'Battery': '5000 mAh' })
    },
    {
        category_id: 1, name: 'Apple iPhone 15 Pro (Natural Titanium, 128 GB)', price: 124999, original_price: 134900,
        rating: 4.6, review_count: 5231,
        description: 'iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button.',
        stock: 30,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81Sig6biNGL._SX679_.jpg']),
        specs: JSON.stringify({ 'Display': '6.1" Super Retina', 'Chip': 'A17 Pro', 'Camera': '48MP Main' })
    },
    {
        category_id: 1, name: 'OnePlus 12 (Flowy Emerald, 16GB RAM, 512GB Storage)', price: 69999, original_price: 74999,
        rating: 4.5, review_count: 2341,
        description: 'The redefined flagship. OnePlus 12 combines hardware-level elite performance with a masterpiece 4th Gen Hasselblad Camera.',
        stock: 45,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/717QX7shLpL._SX679_.jpg']),
        specs: JSON.stringify({ 'Display': '6.82" QHD+', 'Processor': 'SD 8 Gen 3', 'RAM': '16GB' })
    },
    {
        category_id: 1, name: 'Nothing Phone (2a) 5G (White, 8GB RAM, 128GB Storage)', price: 23999, original_price: 25999,
        rating: 4.4, review_count: 15432,
        description: 'Fresh design. Same innovation. Nothing Phone (2a) brings the legendary Glyph Interface to a broader audience.',
        stock: 100,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81m6mFkP-8L._SX679_.jpg']),
        specs: JSON.stringify({ 'Display': '6.7" AMOLED', 'Processor': 'Dimensity 7200 Pro', 'Battery': '5000 mAh' })
    },

    // --- Fashion (Category 2) ---
    {
        category_id: 2, name: 'Van Heusen Men\'s Solid Regular Fit Polo Shirt', price: 999, original_price: 1499,
        rating: 4.1, review_count: 8762,
        description: 'Add a touch of sophistication to your casual ensemble with this polo shirt from Van Heusen.',
        stock: 120,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71NnU6A0GFL._SY879_.jpg']),
        specs: JSON.stringify({ 'Material': 'Cotton Blend', 'Fit': 'Regular', 'Sleeve': 'Short' })
    },
    {
        category_id: 2, name: 'Allen Solly Men\'s Regular Fit Formal Shirt', price: 1249, original_price: 2499,
        rating: 4.2, review_count: 5431,
        description: 'Complete your professional look with this sharp formal shirt from Allen Solly.',
        stock: 80,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/7178uP7VnJL._SY879_.jpg']),
        specs: JSON.stringify({ 'Material': 'Cotton', 'Fit': 'Regular', 'Sleeve': 'Full' })
    },
    {
        category_id: 2, name: 'Levi\'s Women\'s Skinny Fit High-Rise Jeans', price: 1899, original_price: 3499,
        rating: 4.3, review_count: 2310,
        description: 'Classic Levi\'s style designed to flatter every figure.',
        stock: 50,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61Nl0uQvXHL._SY879_.jpg']),
        specs: JSON.stringify({ 'Fit': 'Skinny', 'Waist': 'High-Rise', 'Material': 'Cotton Stretch' })
    },

    // --- Sneakers (Category 9 - Sports & Gym) ---
    {
        category_id: 9, name: 'New Balance Men\'s 574 Sneakers (Tan/White)', price: 7999, original_price: 9999,
        rating: 4.7, review_count: 1245,
        description: 'The most New Balance shoe ever. Classic, versatile, and comfortable.',
        stock: 45,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71S6SjC1DQL._SX695_.jpg']),
        specs: JSON.stringify({ 'Style': 'Classic', 'Sole': 'Rubber', 'Material': 'Suede/Mesh' })
    },
    {
        category_id: 9, name: 'Campus Men\'s North Plus Running Shoes', price: 1299, original_price: 1899,
        rating: 4.2, review_count: 15672,
        description: 'Stay active and stylish with Campus North Plus running shoes.',
        stock: 200,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61mpMH5TCtL._SX679_.jpg']),
        specs: JSON.stringify({ 'Activity': 'Running', 'Breathable': 'Yes' })
    },
    {
        category_id: 9, name: 'Reebok Men\'s Court Peak Sneakers', price: 4499, original_price: 5999,
        rating: 4.5, review_count: 3120,
        description: 'A clean, minimalist look inspired by the tennis courts.',
        stock: 60,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']),
        specs: JSON.stringify({ 'Style': 'Tennis', 'Sole': 'Rubber' })
    },

    // --- Home Decor & Furnishing (Category 4) ---
    {
        category_id: 4, name: 'High Intensity Tactical LED Torch (Pack of 2)', price: 599, original_price: 1299,
        rating: 4.3, review_count: 8932,
        description: 'Ultra bright tactical torch with zoomable focus and water resistance.',
        stock: 150,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']),
        specs: JSON.stringify({ 'Lumens': '1000', 'Waterproof': 'IPX6' })
    },
    {
        category_id: 4, name: 'Ajanta Quartz Wall Clock (Black, Large)', price: 449, original_price: 899,
        rating: 4.4, review_count: 23100,
        description: 'Classic silent wall clock for home and office.',
        stock: 300,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81Sig6biNGL._SX679_.jpg']),
        specs: JSON.stringify({ 'Mechanism': 'Quartz', 'Diameter': '30cm' })
    },
    {
        category_id: 4, name: 'Premium Cotton Double Bed Sheet with 2 Pillow Covers', price: 899, original_price: 1899,
        rating: 4.2, review_count: 12450,
        description: 'Soft and breathable cotton bed cover with vibrant floral prints.',
        stock: 100,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81I6nU9mD6L._SX679_.jpg']),
        specs: JSON.stringify({ 'Material': '100% Cotton', 'Size': '90x100 inch' })
    },
    {
        category_id: 4, name: 'Foldable King Size Mosquito Net (White/Blue)', price: 799, original_price: 1499,
        rating: 4.5, review_count: 5678,
        description: 'Easy to install, self-supporting mosquito net for a peaceful sleep.',
        stock: 120,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/618S4Y6T9yL._SX679_.jpg']),
        specs: JSON.stringify({ 'Size': 'King', 'Material': 'Polyester' })
    },

    // --- Electronics (Category 3) ---
    {
        category_id: 3, name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 24990, original_price: 34990,
        rating: 4.7, review_count: 5123,
        description: 'Industry-leading noise cancellation. New Integrated Processor V1 and HD Noise Cancelling Processor QN1.',
        stock: 40,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61X-H+V5fRL._SX679_.jpg']),
        specs: JSON.stringify({ 'Battery': '30 Hours', 'Charging': 'USB-C' })
    },
    {
        category_id: 3, name: 'DJI Mini 4 Pro Drone with Fly More Combo', price: 95990, original_price: 112000,
        rating: 4.9, review_count: 843,
        description: 'Fly safer and further with the Mini 4 Pro. Featuring 4K/60fps HDR video.',
        stock: 12,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61kG+0XW1XL._SX679_.jpg']),
        specs: JSON.stringify({ 'Weight': '<249g', 'Flight Time': '34-45 mins' })
    },

    // --- Appliances (Category 5) ---
    {
        category_id: 5, name: 'Samsung 7 kg 5 Star Fully-Automatic Washing Machine', price: 29990, original_price: 36900,
        rating: 4.5, review_count: 12450,
        description: 'Hygiene Steam and Digital Inverter technology for powerful wash performance.',
        stock: 35,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']),
        specs: JSON.stringify({ 'Capacity': '7 kg' })
    },
    {
        category_id: 5, name: 'LG 242 L 3 Star Frost-Free Refrigerator', price: 25990, original_price: 33999,
        rating: 4.3, review_count: 8932,
        description: 'Door Cooling+ and Smart Diagnosis for more convenience.',
        stock: 20,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']),
        specs: JSON.stringify({ 'Capacity': '242 L' })
    },

    // --- Furniture (Category 8) ---
    {
        category_id: 8, name: 'Solid Wood Queen Size Bed (Walnut Finish)', price: 18999, original_price: 26999,
        rating: 4.4, review_count: 124,
        description: 'Sturdy and elegant solid wood bed for a premium bedroom look.',
        stock: 15,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71T6z7v4YpL._SX679_.jpg']),
        specs: JSON.stringify({ 'Material': 'Sheesham Wood', 'Finish': 'Walnut' })
    },
    {
        category_id: 8, name: 'Ergonomic High Back Office Chair', price: 5499, original_price: 8999,
        rating: 4.3, review_count: 3120,
        description: 'Breathable mesh back and adjustable lumbar support for long working hours.',
        stock: 50,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/51H+uFqN9oL._SX679_.jpg']),
        specs: JSON.stringify({ 'Material': 'Mesh', 'Base': 'Nylon' })
    },

    // --- Toys (Category 7) ---
    {
        category_id: 7, name: 'LEGO Star Wars Millennium Falcon Model Kit', price: 14999, original_price: 18999,
        rating: 4.9, review_count: 1245,
        description: 'Inspire youngsters and adults with this Millennium Falcon model.',
        stock: 10,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81L6z7v4YpL._SX679_.jpg']),
        specs: JSON.stringify({ 'Pieces': '1351', 'Age': '9+' })
    },
    {
        category_id: 7, name: 'Hot Wheels 10-Car Gift Pack', price: 1099, original_price: 1499,
        rating: 4.6, review_count: 8932,
        description: 'Cool 1:64 scale die-cast vehicles for car lovers.',
        stock: 200,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']),
        specs: JSON.stringify({ 'Cars': '10' })
    },

    // --- Books (Category 10) ---
    {
        category_id: 10, name: 'Atomic Habits by James Clear', price: 499, original_price: 799,
        rating: 4.8, review_count: 15678,
        description: 'An easy & proven way to build good habits & break bad ones.',
        stock: 500,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81Sig6biNGL._SX679_.jpg']),
        specs: JSON.stringify({ 'Author': 'James Clear', 'Format': 'Paperback' })
    },
    {
        category_id: 10, name: 'The Psychology of Money by Morgan Housel', price: 299, original_price: 499,
        rating: 4.7, review_count: 12450,
        description: 'Timeless lessons on wealth, greed, and happiness.',
        stock: 400,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81L6z7v4YpL._SX679_.jpg']),
        specs: JSON.stringify({ 'Author': 'Morgan Housel', 'Format': 'Paperback' })
    },

    // --- Household (Category 11) ---
    {
        category_id: 11, name: 'Philips 800 Series Air Purifier with HEPA Filter', price: 7999, original_price: 10995,
        rating: 4.4, review_count: 12432,
        description: 'Removes 99.9% of viruses and aerosols from the air.',
        stock: 80,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/618S4Y6T9yL._SX679_.jpg']),
        specs: JSON.stringify({ 'Filter': 'HEPA' })
    },
    {
        category_id: 11, name: 'Prestige IRIS Plus 750 Watt Mixer Grinder', price: 3499, original_price: 5499,
        rating: 4.4, review_count: 18234,
        description: 'Powerful grinding for all your kitchen needs.',
        stock: 100,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/7178uP7VnJL._SY879_.jpg']),
        specs: JSON.stringify({ 'Wattage': '750W' })
    },

    // --- Beauty (Category 6) ---
    {
        category_id: 6, name: 'Nivea Soft Light Moisturizer (200ml)', price: 299, original_price: 499,
        rating: 4.6, review_count: 56789,
        description: 'Light, non-greasy formula for soft and supple skin.',
        stock: 300,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61WfQfNfS9L._SX679_.jpg']),
        specs: JSON.stringify({ 'Skin Type': 'All' })
    },
    {
        category_id: 6, name: 'Mamaearth Onion Hair Fall Shampoo', price: 349, original_price: 499,
        rating: 4.3, review_count: 156789,
        description: 'Reduces hair fall and promotes growth.',
        stock: 500,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61WfQfNfS9L._SX679_.jpg']),
        specs: JSON.stringify({ 'Ingredients': 'Onion, Plant Keratin' })
    },

    // --- Auto Accessories (Category 12) ---
    {
        category_id: 12, name: 'High Pressure Portable Tyre Inflator', price: 2499, original_price: 3999,
        rating: 4.5, review_count: 1245,
        description: 'Quickly inflate your car and bike tyres on the go.',
        stock: 60,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']),
        specs: JSON.stringify({ 'Type': 'Electric', 'Pressure': '150 PSI' })
    },
];

db.transaction(() => {
    db.prepare('DELETE FROM order_items').run();
    db.prepare('DELETE FROM orders').run();
    db.prepare('DELETE FROM cart').run();
    db.prepare('DELETE FROM products').run();
    db.prepare('DELETE FROM categories').run();

    const insertCategory = db.prepare('INSERT INTO categories (id, name, icon) VALUES (?, ?, ?)');
    const insertProduct = db.prepare(`
        INSERT INTO products (category_id, name, description, price, original_price, discount_percent, rating, review_count, stock, images, specs)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const cat of categories) {
        insertCategory.run(cat.id, cat.name, cat.icon);
    }
    for (const p of products) {
        const discount = Math.round(((p.original_price - p.price) / p.original_price) * 100);
        insertProduct.run(p.category_id, p.name, p.description, p.price, p.original_price, discount, p.rating, p.review_count, p.stock, p.images, p.specs);
    }
})();

console.log(`✅ Seeded ${categories.length} categories and ${products.length} products.`);
