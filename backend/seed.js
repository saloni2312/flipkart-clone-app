const db = require('./db');

const categories = [
    { id: 1, name: 'Mobiles', icon: '📱' },
    { id: 2, name: 'Fashion', icon: '👗' },
    { id: 3, name: 'Electronics', icon: '💻' },
    { id: 4, name: 'Home & Kitchen', icon: '🏠' },
    { id: 5, name: 'Books', icon: '📚' },
    { id: 6, name: 'Beauty', icon: '💄' },
];

const products = [
    // Mobiles (Category 1)
    {
        category_id: 1, name: 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 256 GB)', price: 109999, original_price: 134999,
        rating: 4.5, review_count: 12453,
        description: 'Flagship Samsung smartphone with 200MP camera, Snapdragon 8 Gen 3, and stunning AI features.',
        stock: 50,
        images: JSON.stringify(['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600']),
        specs: JSON.stringify({ 'Display': '6.8" QHD+', 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12 GB' })
    },
    {
        category_id: 1, name: 'Apple iPhone 15 (Blue, 128 GB)', price: 65999, original_price: 79900,
        rating: 4.6, review_count: 45231,
        description: 'Experience the magic of iPhone 15 with Dynamic Island and a 48MP main camera.',
        stock: 100,
        images: JSON.stringify(['https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600']),
        specs: JSON.stringify({ 'Display': '6.1" OLED', 'Chip': 'A16 Bionic', 'Storage': '128 GB' })
    },
    {
        category_id: 1, name: 'Google Pixel 8 (Hazel, 128 GB)', price: 59999, original_price: 75999,
        rating: 4.4, review_count: 8234,
        description: 'Powerful AI and the best camera for everyday photos and videos.',
        stock: 30,
        images: JSON.stringify(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600']),
        specs: JSON.stringify({ 'Display': '6.2" Actua', 'Processor': 'Tensor G3', 'RAM': '8 GB' })
    },
    {
        category_id: 1, name: 'Motorola Edge 50 Pro (Black, 256 GB)', price: 29999, original_price: 35999,
        rating: 4.3, review_count: 15432,
        description: 'World\'s first AI-powered pro-grade camera with 125W TurboPower charging.',
        stock: 60,
        images: JSON.stringify(['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600']),
        specs: JSON.stringify({ 'Display': '6.7" OLED', 'Processor': 'SD 7 Gen 3', 'RAM': '12 GB' })
    },
    {
        category_id: 1, name: 'Realme 12 Pro+ 5G (Submarine Blue, 256 GB)', price: 26999, original_price: 32999,
        rating: 4.2, review_count: 22100,
        description: 'Mastershot periscope camera with a premium watch-inspired luxury design.',
        stock: 80,
        images: JSON.stringify(['https://images.unsplash.com/photo-1592890288564-76628a30a657?w=600']),
        specs: JSON.stringify({ 'Display': '6.7" Curved OLED', 'RAM': '12 GB', 'Storage': '256 GB' })
    },

    // Fashion (Category 2)
    {
        category_id: 2, name: 'Men Solly Multi Check Pure Cotton Shirt', price: 999, original_price: 2499,
        rating: 4.1, review_count: 5678,
        description: 'Formal checks for a professional and sharp appearance at the workplace.',
        stock: 120,
        images: JSON.stringify(['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600']),
        specs: JSON.stringify({ 'Material': '100% Cotton', 'Fit': 'Regular', 'Sleeve': 'Full' })
    },
    {
        category_id: 2, name: 'Women Printed Rayon Anarkali Kurta (Yellow)', price: 599, original_price: 1999,
        rating: 4.3, review_count: 12450,
        description: 'Beautiful ethnic wear for festivals and casual outings with comfortable rayon fabric.',
        stock: 150,
        images: JSON.stringify(['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600']),
        specs: JSON.stringify({ 'Material': 'Rayon', 'Pattern': 'Floral Print', 'Length': 'Calf Length' })
    },
    {
        category_id: 2, name: 'Levi\'s Men\'s Skinny Fit Jeans (Blue)', price: 1599, original_price: 3299,
        rating: 4.2, review_count: 8932,
        description: 'Classic Levi\'s skinny fit for a modern and stylish silhouette.',
        stock: 90,
        images: JSON.stringify(['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600']),
        specs: JSON.stringify({ 'Fit': 'Skinny', 'Material': 'Cotton Blend', 'Stretchable': 'Yes' })
    },
    {
        category_id: 2, name: 'Nike Revolution 6 Running Shoes', price: 2495, original_price: 3695,
        rating: 4.4, review_count: 15678,
        description: 'Lightweight running shoes with cushioned foam for a comfortable ride.',
        stock: 55,
        images: JSON.stringify(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600']),
        specs: JSON.stringify({ 'Activity': 'Running', 'Breathable': 'Yes', 'Sole': 'Rubber' })
    },

    // Electronics (Category 3)
    {
        category_id: 3, name: 'MacBook Air M2 (8GB RAM, 256GB SSD, Silver)', price: 89990, original_price: 114900,
        rating: 4.8, review_count: 5231,
        description: 'Strikingly thin design with extraordinary speed and power of the M2 chip.',
        stock: 25,
        images: JSON.stringify(['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600']),
        specs: JSON.stringify({ 'Processor': 'Apple M2', 'RAM': '8 GB', 'Storage': '256 GB SSD' })
    },
    {
        category_id: 3, name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 24990, original_price: 34990,
        rating: 4.6, review_count: 3123,
        description: 'Industry-leading noise cancellation with auto NC optimizer.',
        stock: 40,
        images: JSON.stringify(['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600']),
        specs: JSON.stringify({ 'Battery': '30 hrs', 'Charging': 'USB-C', 'Microphone': 'Built-in' })
    },
    {
        category_id: 3, name: 'ASUS ROG Zephyrus G14 Gaming Laptop', price: 124990, original_price: 159990,
        rating: 4.7, review_count: 1245,
        description: 'Powerful gaming laptop with Ryzen 9 and RTX 4060 in a compact 14-inch frame.',
        stock: 15,
        images: JSON.stringify(['https://images.unsplash.com/photo-1544244015-0cd4b3ffc6b0?w=600']),
        specs: JSON.stringify({ 'CPU': 'Ryzen 9', 'GPU': 'RTX 4060', 'RAM': '16 GB' })
    },
    {
        category_id: 3, name: 'Samsung 27 inch Full HD LED IPS Panel Monitor', price: 12499, original_price: 21999,
        rating: 4.4, review_count: 8234,
        description: 'Slim design with AMD FreeSync and Game Mode for an improved gaming experience.',
        stock: 35,
        images: JSON.stringify(['https://images.unsplash.com/photo-1547119957-630f9c475d3d?w=600']),
        specs: JSON.stringify({ 'Size': '27 inch', 'Panel': 'IPS', 'Refresh': '75Hz' })
    },

    // Sports & Fitness (Category 5)
    {
        category_id: 5, name: 'Yonex Astrox 88S Play Carbon Fiber Badminton Racket', price: 3499, original_price: 5299,
        rating: 4.4, review_count: 1245,
        description: 'Lead the attack with increased power and control. Perfect for intermediate players.',
        stock: 40,
        images: JSON.stringify(['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600']),
        specs: JSON.stringify({ 'Material': 'Carbon Fiber', 'Balance': 'Head Heavy', 'Weight': '4U (83g)' })
    },
    {
        category_id: 5, name: 'Boldfit Heavy Duty Adjustable Dumbbells Set (10kg)', price: 2999, original_price: 4999,
        rating: 4.3, review_count: 5672,
        description: 'Adjustable weights for a complete home workout. Durable and ergonomic design.',
        stock: 50,
        images: JSON.stringify(['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600']),
        specs: JSON.stringify({ 'Weight': '10kg', 'Material': 'Cast Iron', 'Coating': 'Rubber' })
    },
    {
        category_id: 5, name: 'Decathlon Kiprun KS900 Running Shoes', price: 4499, original_price: 7999,
        rating: 4.5, review_count: 3120,
        description: 'High-performance running shoes with superior cushioning and grip.',
        stock: 30,
        images: JSON.stringify(['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600']),
        specs: JSON.stringify({ 'Type': 'Running', 'Cushioning': 'High', 'Surface': 'Road' })
    },
    {
        category_id: 5, name: 'Nivea Football Size 5 (Yellow/Blue)', price: 649, original_price: 1199,
        rating: 4.2, review_count: 8900,
        description: 'Durable stitched football for all-weather play on grass or turf.',
        stock: 100,
        images: JSON.stringify(['https://images.unsplash.com/photo-1614632537423-1e6c2e7a0aab?w=600']),
        specs: JSON.stringify({ 'Size': '5', 'Material': 'PU', 'Stitching': 'Machine' })
    },

    // Beauty (More)
    {
        category_id: 6, name: 'Maybelline New York Colossal Kajal (Black)', price: 179, original_price: 299,
        rating: 4.5, review_count: 124500,
        description: '24-hour smudge-proof and waterproof kajal for deep black eyes.',
        stock: 500,
        images: JSON.stringify(['https://images.unsplash.com/photo-1631214500115-598fc2cb882e?w=600']),
        specs: JSON.stringify({ 'Color': 'Deep Black', 'Duration': '24 hrs', 'Type': 'Pencil' })
    },
    {
        category_id: 6, name: 'Nivea Soft Light Moisturiser 200ml', price: 299, original_price: 499,
        rating: 4.6, review_count: 56789,
        description: 'Non-greasy, fast-absorbing moisturiser for soft and supple skin.',
        stock: 300,
        images: JSON.stringify(['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600']),
        specs: JSON.stringify({ 'Volume': '200ml', 'Texture': 'Light', 'Skin': 'All' })
    },
    {
        category_id: 6, name: 'Philips HP8100/46 Hair Dryer (Purple)', price: 849, original_price: 1295,
        rating: 4.3, review_count: 15432,
        description: 'Compact and powerful hair dryer with 1000W for quick drying.',
        stock: 150,
        images: JSON.stringify(['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600']),
        specs: JSON.stringify({ 'Power': '1000W', 'Speeds': '2', 'Compact': 'Yes' })
    },

    // Home & Kitchen (Category 4)
    {
        category_id: 4, name: 'Prestige IRIS Plus 750 Watt Mixer Grinder', price: 3499, original_price: 5499,
        rating: 4.4, review_count: 18234,
        description: 'Powerful 750W motor with 3 stainless steel jars and 1 juicer jar.',
        stock: 65,
        images: JSON.stringify(['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600']),
        specs: JSON.stringify({ 'Power': '750W', 'Jars': '4', 'Warranty': '2 Years' })
    },
    {
        category_id: 4, name: 'Sleepyhead Flip - Dual Sided Foam Mattress', price: 6999, original_price: 11999,
        rating: 4.3, review_count: 4231,
        description: 'Dual-sided mattress with hard and soft foams for personalized comfort.',
        stock: 45,
        images: JSON.stringify(['https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=600']),
        specs: JSON.stringify({ 'Type': 'Foam', 'Size': 'Single/Double', 'Duo-Sided': 'Yes' })
    },
    {
        category_id: 4, name: 'Milton Thermosteel Flip Lid Flask 1000ml', price: 899, original_price: 1299,
        rating: 4.5, review_count: 32100,
        description: 'Vacuum insulated flask that keeps drinks hot or cold for 24 hours.',
        stock: 200,
        images: JSON.stringify(['https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=600']),
        specs: JSON.stringify({ 'Capacity': '1000ml', 'Material': 'Steel', 'Duration': '24 hrs' })
    },

    // Books (Category 5)
    {
        category_id: 5, name: 'Atomic Habits by James Clear', price: 449, original_price: 699,
        rating: 4.8, review_count: 89234,
        description: 'Tiny changes, remarkable results. Build good habits and break bad ones.',
        stock: 300,
        images: JSON.stringify(['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600']),
        specs: JSON.stringify({ 'Author': 'James Clear', 'Format': 'Paperback', 'Genre': 'Self-Help' })
    },
    {
        category_id: 5, name: 'Deep Work by Cal Newport', price: 399, original_price: 599,
        rating: 4.6, review_count: 12432,
        description: 'Rules for focused success in a distracted world.',
        stock: 150,
        images: JSON.stringify(['https://images.unsplash.com/photo-1543004218-ee141104975a?w=600']),
        specs: JSON.stringify({ 'Author': 'Cal Newport', 'Format': 'Hardcover', 'Genre': 'Productivity' })
    },

    // Beauty (Category 6)
    {
        category_id: 6, name: 'Lakme Absolute Matte Liquid Lip Color', price: 429, original_price: 649,
        rating: 4.1, review_count: 18432,
        description: 'Transfer-proof matte finish for long-lasting vibrant lips.',
        stock: 200,
        images: JSON.stringify(['https://images.unsplash.com/photo-1583241475880-083f84372725?w=600']),
        specs: JSON.stringify({ 'Finish': 'Matte', 'Duration': '12 hrs', 'Type': 'Liquid' })
    },
    {
        category_id: 6, name: 'Neutrogena Hydro Boost Water Gel', price: 950, original_price: 1250,
        rating: 4.4, review_count: 5678,
        description: 'Hydrating water gel with hyaluronic acid for supple and hydrated skin.',
        stock: 80,
        images: JSON.stringify(['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600']),
        specs: JSON.stringify({ 'Ingredients': 'Hyaluronic Acid', 'Skin Type': 'All', 'Weight': '50g' })
    },
];

const existingCategories = db.prepare('SELECT COUNT(*) as count FROM categories').get();
const existingProducts = db.prepare('SELECT COUNT(*) as count FROM products').get();

if (existingCategories.count === 0 || existingProducts.count < products.length) {
    db.transaction(() => {
        // Clear to ensure fresh start with the expanded list
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
} else {
    console.log('ℹ️  Database already seeded, skipping.');
}
