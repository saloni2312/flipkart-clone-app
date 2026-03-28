const db = require('./db');

const categories = [
    { id: 1, name: 'Mobiles', icon: '📱' },
    { id: 2, name: 'Fashion', icon: '👗' },
    { id: 3, name: 'Electronics', icon: '💻' },
    { id: 4, name: 'Home', icon: '🏠' },
    { id: 5, name: 'Appliances', icon: '📺' },
    { id: 6, name: 'Beauty', icon: '💄' },
    { id: 7, name: 'Toys', icon: '🧸' },
];

const products = [
    // --- Mobiles (Category 1) ---
    { category_id: 1, name: 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 256 GB)', price: 109999, original_price: 134999, rating: 4.5, review_count: 12453, description: 'Flagship AI Features', stock: 50, images: JSON.stringify(['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'Apple iPhone 15 Pro (Natural Titanium, 128 GB)', price: 124999, original_price: 134900, rating: 4.6, review_count: 5231, description: 'Forged in Titanium', stock: 30, images: JSON.stringify(['https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'Google Pixel 8 (Hazel, 128 GB)', price: 59999, original_price: 75999, rating: 4.4, review_count: 8234, description: 'Best Camera AI', stock: 30, images: JSON.stringify(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'OnePlus 12 (Silky Black, 512 GB)', price: 64999, original_price: 69999, rating: 4.5, review_count: 8900, description: 'Smooth Beyond Belief', stock: 40, images: JSON.stringify(['https://images.unsplash.com/photo-1601784551446-20c9e07cdbab?w=600']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'Nothing Phone (2a) (Milk, 128 GB)', price: 23999, original_price: 25999, rating: 4.4, review_count: 15432, description: 'Unique Glyph UI', stock: 100, images: JSON.stringify(['https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=600']), specs: JSON.stringify({}) },

    // --- Fashion (Category 2) ---
    { category_id: 2, name: 'Men Solly Multi Check Pure Cotton Shirt', price: 999, original_price: 2499, rating: 4.1, review_count: 5678, description: 'Formal Elegance', stock: 120, images: JSON.stringify(['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Women Printed Rayon Anarkali Kurta (Yellow)', price: 599, original_price: 1999, rating: 4.3, review_count: 12450, description: 'Ethnic Charm', stock: 150, images: JSON.stringify(['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Levi\'s Men\'s Skinny Fit Jeans (Blue)', price: 1599, original_price: 3299, rating: 4.2, review_count: 8932, description: 'Classic Denim', stock: 90, images: JSON.stringify(['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Nike Revolution 6 Running Shoes', price: 2495, original_price: 3695, rating: 4.4, review_count: 15678, description: 'Everyday Versatility', stock: 55, images: JSON.stringify(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Puma Men\'s Graphic T-shirt', price: 799, original_price: 1499, rating: 4.1, review_count: 3120, description: 'Sporty Style', stock: 200, images: JSON.stringify(['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'U.S. Polo Assn. Men\'s Polo T-shirt', price: 1299, original_price: 2199, rating: 4.3, review_count: 8900, description: 'Timeless Polo', stock: 75, images: JSON.stringify(['https://images.unsplash.com/photo-1586363104862-3a5e2ca60cd3?w=600']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'W Women\'s Printed Straight Kurta', price: 899, original_price: 1899, rating: 4.2, review_count: 5672, description: 'Modern Ethnic', stock: 90, images: JSON.stringify(['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Allen Solly Men\'s Formal Blazer', price: 3499, original_price: 5999, rating: 4.4, review_count: 1245, description: 'Sharp Profile', stock: 25, images: JSON.stringify(['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Vero Moda Women\'s High Rise Trousers', price: 1499, original_price: 2999, rating: 4.3, review_count: 3120, description: 'Sleek Fit', stock: 60, images: JSON.stringify(['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600']), specs: JSON.stringify({}) },

    // --- Electronics (Category 3) ---
    { category_id: 3, name: 'MacBook Air M2 (8GB RAM, 256GB SSD, Silver)', price: 89990, original_price: 114900, rating: 4.8, review_count: 5231, description: 'Power of M2', stock: 25, images: JSON.stringify(['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Sony WH-1000XM5 Wireless Headphones', price: 24990, original_price: 34990, rating: 4.6, review_count: 3123, description: 'Pure Sound NC', stock: 40, images: JSON.stringify(['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Apple iPad Air (5th Gen) WiFi 64GB', price: 54999, original_price: 59900, rating: 4.7, review_count: 8234, description: 'Light. Bright. Powerful.', stock: 35, images: JSON.stringify(['https://images.unsplash.com/photo-1544244015-0cd4b3ffc6b0?w=600']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Logitech G502 HERO Gaming Mouse', price: 3999, original_price: 5495, rating: 4.7, review_count: 15678, description: 'High Performance Gaming', stock: 100, images: JSON.stringify(['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Dell UltraSharp 27 4K USB-C Hub Monitor', price: 42999, original_price: 55000, rating: 4.5, review_count: 2310, description: 'Refined Visuals', stock: 20, images: JSON.stringify(['https://images.unsplash.com/photo-1547119957-630f9c475d3d?w=600']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Bose Companion 2 Series III Speakers', price: 11990, original_price: 14990, rating: 4.6, review_count: 8900, description: 'Rich Stereophonic Sound', stock: 45, images: JSON.stringify(['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600']), specs: JSON.stringify({}) },

    // --- Home (Category 4) ---
    { category_id: 4, name: 'Sleepyhead Flip - Dual Sided Mattress', price: 6999, original_price: 11999, rating: 4.3, review_count: 4231, description: 'Hard & Soft Foam', stock: 45, images: JSON.stringify(['https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=600']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Prestige IRIS Plus Mixer Grinder', price: 3499, original_price: 5499, rating: 4.4, review_count: 18234, description: 'Powerful Grinding', stock: 65, images: JSON.stringify(['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Milton Thermosteel Flip Lid Flask', price: 899, original_price: 1299, rating: 4.5, review_count: 32100, description: 'Hot & Cold 24h', stock: 200, images: JSON.stringify(['https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=600']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Kent Ultra Storage Water Purifier', price: 7999, original_price: 9500, rating: 4.3, review_count: 12450, description: 'UV Power', stock: 50, images: JSON.stringify(['https://images.unsplash.com/photo-1585832770481-e25fa1265881?w=600']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Solimo Solid Wood Queen Bed', price: 18999, original_price: 25999, rating: 4.2, review_count: 5678, description: 'Sturdy & Elegant', stock: 15, images: JSON.stringify(['https://images.unsplash.com/photo-1505693413171-293669746a57?w=600']), specs: JSON.stringify({}) },

    // --- Appliances (Category 5) ---
    { category_id: 5, name: 'Samsung 7 kg Front Load Washing Machine', price: 29990, original_price: 36900, rating: 4.5, review_count: 12450, description: 'AI Control', stock: 35, images: JSON.stringify(['https://images.unsplash.com/photo-1582733775066-1c2966524329?w=600']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'LG 242 L Double Door Refrigerator', price: 25990, original_price: 33999, rating: 4.3, review_count: 31200, description: 'Door Cooling+', stock: 20, images: JSON.stringify(['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'Sony Bravia 55 inch 4K Ultra HD TV', price: 57990, original_price: 99900, rating: 4.7, review_count: 15432, description: 'Google TV', stock: 15, images: JSON.stringify(['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'Panasonic 1.5 Ton 5 Star Inverter AC', price: 36990, original_price: 54990, rating: 4.4, review_count: 8234, description: 'Smart & Fast', stock: 40, images: JSON.stringify(['https://images.unsplash.com/photo-1591154665851-979b76856b3e?w=600']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'Havells Instanio 3-Litre Instant Geyser', price: 3299, original_price: 5299, rating: 4.2, review_count: 23100, description: 'Ready in Seconds', stock: 80, images: JSON.stringify(['https://images.unsplash.com/photo-1585832770481-e25fa1265881?w=600']), specs: JSON.stringify({}) },

    // --- Beauty (Category 6) ---
    { category_id: 6, name: 'Maybelline New York Colossal Kajal', price: 179, original_price: 299, rating: 4.5, review_count: 124500, description: 'Smudge-proof', stock: 500, images: JSON.stringify(['https://images.unsplash.com/photo-1631214500115-598fc2cb882e?w=600']), specs: JSON.stringify({}) },
    { category_id: 6, name: 'Nivea Soft Light Moisturiser 200ml', price: 299, original_price: 499, rating: 4.6, review_count: 56789, description: 'Light Care', stock: 300, images: JSON.stringify(['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600']), specs: JSON.stringify({}) },
    { category_id: 6, name: 'Philips HP8100/46 Hair Dryer', price: 849, original_price: 1295, rating: 4.3, review_count: 15432, description: 'Quick Drying', stock: 150, images: JSON.stringify(['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600']), specs: JSON.stringify({}) },
    { category_id: 6, name: 'Lakme Absolute Skin Gloss Gel', price: 649, original_price: 899, rating: 4.2, review_count: 8900, description: 'Glowing Finish', stock: 120, images: JSON.stringify(['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600']), specs: JSON.stringify({}) },
    { category_id: 6, name: 'Biotique Bio Kelp Protein Shampoo', price: 249, original_price: 399, rating: 4.4, review_count: 23100, description: 'Pure Herbs', stock: 200, images: JSON.stringify(['https://images.unsplash.com/photo-1535585209827-a15dcdbc4c2d?w=600']), specs: JSON.stringify({}) },

    // --- Toys (Category 7) ---
    { category_id: 7, name: 'Millennium Falcon LEGO Set', price: 14999, original_price: 18999, rating: 4.9, review_count: 1245, description: 'Star Wars Build', stock: 10, images: JSON.stringify(['https://images.unsplash.com/photo-1585366119957-e556da2347bd?w=600']), specs: JSON.stringify({}) },
    { category_id: 7, name: 'Hot Wheels 10-Car Gift Pack', price: 1099, original_price: 1499, rating: 4.6, review_count: 8932, description: 'Die-cast Collection', stock: 100, images: JSON.stringify(['https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600']), specs: JSON.stringify({}) },
    { category_id: 7, name: 'Rubiks Cube 3x3 Classic', price: 499, original_price: 799, rating: 4.7, review_count: 56789, description: 'Smart Play', stock: 300, images: JSON.stringify(['https://images.unsplash.com/photo-1591994843349-2e84113fd054?w=600']), specs: JSON.stringify({}) },
    { category_id: 7, name: 'Barbie Dreamhouse Playset', price: 4999, original_price: 6999, rating: 4.8, review_count: 3120, description: '360-Degree Play', stock: 15, images: JSON.stringify(['https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=600']), specs: JSON.stringify({}) },
    { category_id: 7, name: 'Fisher-Price Rock-a-Stack', price: 349, original_price: 499, rating: 4.7, review_count: 5678, description: 'Classic Infant Toy', stock: 200, images: JSON.stringify(['https://images.unsplash.com/photo-1532330393533-443990a51d10?w=600']), specs: JSON.stringify({}) },

    // --- More Fashion ---
    { category_id: 2, name: 'Ray-Ban Aviator Sunglasses', price: 8499, original_price: 10499, rating: 4.6, review_count: 1245, description: 'Iconic Style', stock: 30, images: JSON.stringify(['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Titan Karishma Men\'s Watch', price: 1899, original_price: 2499, rating: 4.4, review_count: 8932, description: 'Formal Elegance', stock: 50, images: JSON.stringify(['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Fastrack Unisex Square Sunglasses', price: 699, original_price: 1299, rating: 4.1, review_count: 15432, description: 'Cool & Affordable', stock: 120, images: JSON.stringify(['https://images.unsplash.com/photo-1511499767323-91bc2224426d?w=600']), specs: JSON.stringify({}) },

    // --- More Beauty ---
    { category_id: 6, name: 'MAC Prep + Prime Fix+', price: 2150, original_price: 2500, rating: 4.7, review_count: 12450, description: 'Hydrating Mist', stock: 45, images: JSON.stringify(['https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=600']), specs: JSON.stringify({}) },
    { category_id: 6, name: 'The Body Shop Tea Tree Oil', price: 695, original_price: 845, rating: 4.5, review_count: 8923, description: 'Target Blemishes', stock: 60, images: JSON.stringify(['https://images.unsplash.com/photo-1556228578-180ba3d0016e?w=600']), specs: JSON.stringify({}) },

    // --- More Home ---
    { category_id: 4, name: 'Eveready 9W LED Bulbs (Pack of 10)', price: 899, original_price: 1499, rating: 4.4, review_count: 23100, description: 'Bright & Efficient', stock: 500, images: JSON.stringify(['https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Cello H2O Stainless Steel Bottle', price: 449, original_price: 699, rating: 4.3, review_count: 12432, description: 'Durable & Sleek', stock: 150, images: JSON.stringify(['https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=600']), specs: JSON.stringify({}) },

    // --- More Electronics ---
    { category_id: 3, name: 'Canon EOS R6 Mark II Mirrorless Camera', price: 219990, original_price: 243995, rating: 4.8, review_count: 320, description: 'Master the Art', stock: 8, images: JSON.stringify(['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'HP Pavilion 15 (16GB RAM, 512GB SSD)', price: 62990, original_price: 75000, rating: 4.3, review_count: 5678, description: 'Work & Play', stock: 40, images: JSON.stringify(['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600']), specs: JSON.stringify({}) },

    // --- More Appliances ---
    { category_id: 5, name: 'Dyson V11 Absolute Cord-Free Vacuum', price: 49900, original_price: 55900, rating: 4.7, review_count: 1245, description: 'Deep Clean Everywhere', stock: 15, images: JSON.stringify(['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'Philips 4.1L Digital Air Fryer', price: 8499, original_price: 11995, rating: 4.5, review_count: 8932, description: 'Healthy Frying', stock: 65, images: JSON.stringify(['https://images.unsplash.com/photo-1585832770481-e25fa1265881?w=600']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'Bajaj New Shakti Neo 15L Water Heater', price: 5999, original_price: 9550, rating: 4.3, review_count: 15432, description: 'Hot Water Instantly', stock: 50, images: JSON.stringify(['https://images.unsplash.com/photo-1585832770481-e25fa1265881?w=600']), specs: JSON.stringify({}) },

    // --- More Home ---
    { category_id: 4, name: 'Urban Ladder Solid Wood Coffee Table', price: 4499, original_price: 7999, rating: 4.4, review_count: 3120, description: 'Chic Living', stock: 20, images: JSON.stringify(['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Prestige 3.0L Induction Cooktop', price: 2199, original_price: 3495, rating: 4.2, review_count: 23100, description: 'Safe & Smart Cooking', stock: 100, images: JSON.stringify(['https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600']), specs: JSON.stringify({}) },
];

// Re-run the insertions
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
