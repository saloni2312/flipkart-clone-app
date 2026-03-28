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
    {
        category_id: 2, name: 'Nike Revolution 6 Next Nature Running Shoes', price: 2495, original_price: 3695,
        rating: 4.4, review_count: 15678,
        description: 'Comfort is key to your running routine. The Nike Revolution 6 offers a plush ride.',
        stock: 55,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71S6SjC1DQL._SX695_.jpg']),
        specs: JSON.stringify({ 'Activity': 'Running', 'Sole': 'Rubber', 'Breathable': 'Yes' })
    },
    {
        category_id: 2, name: 'Biba Women\'s Floral Print Straight Kurta', price: 1299, original_price: 2599,
        rating: 4.2, review_count: 3120,
        description: 'Stay ahead of the trend with this elegant floral print kurta from Biba.',
        stock: 100,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81M+Z9o2YDL._SY879_.jpg']),
        specs: JSON.stringify({ 'Material': 'Cotton', 'Length': 'Calf Length', 'Neck': 'Round' })
    },

    // --- Electronics (Category 3) ---
    {
        category_id: 3, name: 'Apple iPad Air (5th Generation): with M1 chip, 10.9-inch', price: 54999, original_price: 59900,
        rating: 4.8, review_count: 8234,
        description: 'iPad Air. With an immersive 10.9-inch Liquid Retina display and the amazing performance of the M1 chip.',
        stock: 35,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61XZQXFQeBL._SX679_.jpg']),
        specs: JSON.stringify({ 'Display': '10.9" Liquid Retina', 'Chip': 'M1', 'Storage': '64GB' })
    },
    {
        category_id: 3, name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 24990, original_price: 34990,
        rating: 4.7, review_count: 5123,
        description: 'Industry-leading noise cancellation. New Integrated Processor V1 and HD Noise Cancelling Processor QN1.',
        stock: 40,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61X-H+V5fRL._SX679_.jpg']),
        specs: JSON.stringify({ 'Battery': '30 Hours', 'Charging': 'USB-C', 'Microphone': 'Built-in' })
    },
    {
        category_id: 3, name: 'DJI Mini 4 Pro Drone with Fly More Combo', price: 95990, original_price: 112000,
        rating: 4.9, review_count: 843,
        description: 'Fly safer and further with the Mini 4 Pro. Featuring 4K/60fps HDR video and 360-degree obstacle sensing.',
        stock: 12,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61kG+0XW1XL._SX679_.jpg']),
        specs: JSON.stringify({ 'Weight': '<249g', 'Flight Time': '34-45 mins', 'Resolution': '4K HDR' })
    },
    {
        category_id: 3, name: 'Logitech G502 HERO High Performance Wired Gaming Mouse', price: 4199, original_price: 5495,
        rating: 4.7, review_count: 12450,
        description: 'High-performance HERO 25K sensor. 11 programmable buttons and adjustable weights.',
        stock: 60,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61mpMH5TCtL._SX679_.jpg']),
        specs: JSON.stringify({ 'Sensor': 'HERO 25K', 'DPI': '25,600', 'Buttons': '11' })
    },

    // --- Appliances (Category 5) ---
    {
        category_id: 5, name: 'Dyson V11 Absolute Cord-Free Vacuum Cleaner', price: 49900, original_price: 55900,
        rating: 4.7, review_count: 1245,
        description: 'Twice the suction of any other cord-free vacuum. Intelligently optimises suction and run time.',
        stock: 15,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/41-95Uv9M8L._SX679_.jpg']),
        specs: JSON.stringify({ 'Suction': '185 AW', 'Runtime': '60 mins', 'Weight': '2.97 kg' })
    },
    {
        category_id: 5, name: 'Samsung 7 kg 5 Star Fully-Automatic Front Loading Washing Machine', price: 29990, original_price: 36900,
        rating: 4.5, review_count: 12450,
        description: 'Hygiene Steam and Digital Inverter technology for powerful wash performance.',
        stock: 35,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']),
        specs: JSON.stringify({ 'Capacity': '7 kg', 'Energy': '5 Star', 'RPM': '1200' })
    },
    {
        category_id: 5, name: 'LG 242 L 3 Star Smart Inverter Frost-Free Refrigerator', price: 25990, original_price: 33999,
        rating: 4.3, review_count: 8932,
        description: 'Door Cooling+ and Smart Diagnosis for more convenience and faster cooling.',
        stock: 20,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']),
        specs: JSON.stringify({ 'Capacity': '242 L', 'Type': 'Frost Free', 'Inverter': 'Yes' })
    },
    {
        category_id: 5, name: 'Philips 4.1L Digital Air Fryer with Touch Panel', price: 8499, original_price: 11995,
        rating: 4.6, review_count: 5678,
        description: 'Rapid Air technology for healthy frying with up to 90% less fat.',
        stock: 100,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/618S4Y6T9yL._SX679_.jpg']),
        specs: JSON.stringify({ 'Capacity': '4.1L', 'Presets': '7', 'Material': 'Plastic' })
    },

    // --- Home (Category 4) ---
    {
        category_id: 4, name: 'Wakefit Orthopedic Memory Foam 6-inch Queen Mattress', price: 10499, original_price: 15999,
        rating: 4.4, review_count: 23100,
        description: 'Next gen memory foam for targeted pressure relief and spine alignment.',
        stock: 45,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81I6nU9mD6L._SX679_.jpg']),
        specs: JSON.stringify({ 'Size': 'Queen', 'Depth': '6-inch', 'Type': 'Memory Foam' })
    },
    {
        category_id: 4, name: 'Urban Ladder Solid Wood Coffee Table with Storage', price: 5499, original_price: 8999,
        rating: 4.3, review_count: 1245,
        description: 'Handcrafted from premium Sheesham wood with a rich walnut finish.',
        stock: 20,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71T6z7v4YpL._SX679_.jpg']),
        specs: JSON.stringify({ 'Material': 'Sheesham Wood', 'Finish': 'Walnut', 'Style': 'Contemporary' })
    },

    // --- Beauty (Category 6) ---
    {
        category_id: 6, name: 'Nivea Soft Light Moisturizer with Vitamin E & Jojoba Oil', price: 299, original_price: 499,
        rating: 4.6, review_count: 56789,
        description: 'Light, non-greasy formula that absorbs quickly and gives you soft and supple skin.',
        stock: 300,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61WfQfNfS9L._SX679_.jpg']),
        specs: JSON.stringify({ 'Skin Type': 'All', 'Weight': '200ml', 'Key Ingredient': 'Vitamin E' })
    },
    {
        category_id: 6, name: 'Philips HP8100/46 Hair Dryer (Purple)', price: 849, original_price: 1295,
        rating: 4.3, review_count: 15432,
        description: 'Compact design for easy handling. 1000W for gentle drying.',
        stock: 150,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61+S4L-A99L._SX679_.jpg']),
        specs: JSON.stringify({ 'Power': '1000W', 'Speeds': '2', 'Foldable': 'No' })
    },
    {
        category_id: 6, name: 'Forest Essentials Delicate Facial Cleanser (Mashobra Honey)', price: 1550, original_price: 1750,
        rating: 4.5, review_count: 3120,
        description: 'A natural facial cleanser infused with honey and steam-distilled essential oils.',
        stock: 60,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/51H+uFqN9oL._SX679_.jpg']),
        specs: JSON.stringify({ 'Type': 'Natural', 'Volume': '200ml', 'Ayurvedic': 'Yes' })
    },

    // --- Toys (Category 7) ---
    {
        category_id: 7, name: 'LEGO Star Wars Millennium Falcon 75257 Model Kit', price: 14999, original_price: 18999,
        rating: 4.9, review_count: 1245,
        description: 'Inspire youngsters and adults with this 75257 Millennium Falcon model.',
        stock: 10,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81L6z7v4YpL._SX679_.jpg']),
        specs: JSON.stringify({ 'Pieces': '1351', 'Age': '9+', 'Theme': 'Star Wars' })
    },
    {
        category_id: 7, name: 'Nerf Elite 2.0 Commander RD-6 Blaster', price: 1299, original_price: 1799,
        rating: 4.5, review_count: 12450,
        description: 'Customize the blaster for every battle or mission by taking advantage of 3 tactical rails.',
        stock: 100,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81M+Z9o2YDL._SX679_.jpg']),
        specs: JSON.stringify({ 'Type': 'Blaster', 'Darts': '12 included', 'Range': '27m' })
    },
    {
        category_id: 7, name: 'Barbie Dreamhouse 2024 Edition with 75+ Accessories', price: 6999, original_price: 8999,
        rating: 4.8, review_count: 5231,
        description: 'New Barbie Dreamhouse features 10 play areas, customizable lights and sounds.',
        stock: 15,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81L6z7v4YpL._SX679_.jpg']),
        specs: JSON.stringify({ 'Pieces': '75+', 'Age': '3+', 'Theme': 'Barbie' })
    },

    // --- More Mobiles ---
    {
        category_id: 1, name: 'Asus ROG Phone 8 Pro (Phantom Black, 16GB RAM)', price: 94999, original_price: 104990,
        rating: 4.7, review_count: 523,
        description: 'The ultimate gaming phone with Snapdragon 8 Gen 3 and 165Hz AMOLED display.',
        stock: 10,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']),
        specs: JSON.stringify({ 'Refresh Rate': '165Hz', 'Battery': '5500 mAh' })
    },
    {
        category_id: 1, name: 'Realme 12 Pro+ 5G (Submarine Blue, 256 GB)', price: 29999, original_price: 34999,
        rating: 4.3, review_count: 8923,
        description: 'Mastershot Periscope Camera for professional-level photography.',
        stock: 50,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81m6mFkP-8L._SX679_.jpg']),
        specs: JSON.stringify({ 'Camera': '64MP Periscope', 'Display': 'Curved OLED' })
    },

    // --- More Fashion ---
    {
        category_id: 2, name: 'Tommy Hilfiger Men\'s Essential Crew Neck T-Shirt', price: 2199, original_price: 3499,
        rating: 4.4, review_count: 1245,
        description: 'Premium cotton t-shirt for everyday luxury.',
        stock: 60,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71NnU6A0GFL._SY879_.jpg']),
        specs: JSON.stringify({ 'Material': 'Organic Cotton' })
    },
    {
        category_id: 2, name: 'Adidas Originals Men\'s Superstar Sneakers', price: 7999, original_price: 9999,
        rating: 4.7, review_count: 31200,
        description: 'The timeless classic. Adidas Superstar with the iconic shell toe.',
        stock: 35,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/71S6SjC1DQL._SX695_.jpg']),
        specs: JSON.stringify({ 'Sole': 'Rubber', 'Material': 'Leather' })
    },

    // --- More Electronics ---
    {
        category_id: 3, name: 'Bose QuietComfort Ultra Noise Cancelling Headphones', price: 34990, original_price: 39900,
        rating: 4.7, review_count: 1245,
        description: 'World-class noise cancellation. Bose Immersive Audio for a life-like listening experience.',
        stock: 25,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/61X-H+V5fRL._SX679_.jpg']),
        specs: JSON.stringify({ 'Battery': '24 Hours', 'Type': 'Over-ear' })
    },
    {
        category_id: 3, name: 'Nikon Z8 Mirrorless Camera (Body Only)', price: 329000, original_price: 359000,
        rating: 4.9, review_count: 124,
        description: 'Professional high-resolution camera with 8K video capabilities.',
        stock: 5,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/51H+uFqN9oL._SX679_.jpg']),
        specs: JSON.stringify({ 'Sensor': '45.7MP Full Frame', 'Video': '8K/60p' })
    },

    // --- More Home ---
    {
        category_id: 4, name: 'Philips Hue Smart Bridge and Light Strip Kit', price: 8999, original_price: 11995,
        rating: 4.5, review_count: 5678,
        description: 'Transform your home lighting with millions of colors and smart controls.',
        stock: 40,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/81I6nU9mD6L._SX679_.jpg']),
        specs: JSON.stringify({ 'Colors': '16 Million', 'Connectivity': 'Zigbee/Bluetooth' })
    },

    // --- More Appliances ---
    {
        category_id: 5, name: 'Philips 800 Series Air Purifier with HEPA Filter', price: 7999, original_price: 10995,
        rating: 4.4, review_count: 12432,
        description: 'Removes 99.9% of viruses and aerosols from the air.',
        stock: 80,
        images: JSON.stringify(['https://m.media-amazon.com/images/I/618S4Y6T9yL._SX679_.jpg']),
        specs: JSON.stringify({ 'Filter': 'HEPA', 'CADR': '190 m³/h' })
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
