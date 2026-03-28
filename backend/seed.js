const db = require('./db');

const categories = [
    { id: 1, name: 'Electronics', icon: '📱' },
    { id: 2, name: 'Fashion', icon: '👗' },
    { id: 3, name: 'Home & Kitchen', icon: '🏠' },
    { id: 4, name: 'Books', icon: '📚' },
    { id: 5, name: 'Sports & Fitness', icon: '⚽' },
    { id: 6, name: 'Beauty', icon: '💄' },
];

const products = [
    // Electronics
    {
        category_id: 1, name: 'Samsung Galaxy S24 Ultra 5G', price: 109999, original_price: 134999,
        rating: 4.5, review_count: 12453,
        description: 'Flagship Samsung smartphone with 200MP camera, Snapdragon 8 Gen 3, 12GB RAM, 256GB storage, and 5000mAh battery with 45W fast charging.',
        stock: 20,
        images: JSON.stringify(['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600']),
        specs: JSON.stringify({ 'Display': '6.8" QHD+ Dynamic AMOLED 2X, 120Hz', 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12 GB', 'Storage': '256 GB', 'Camera': '200 MP + 50 MP + 12 MP', 'Battery': '5000 mAh, 45W Fast Charge', 'OS': 'Android 14', 'Color': 'Titanium Black' })
    },
    {
        category_id: 1, name: 'Apple iPhone 15 Pro Max', price: 159900, original_price: 174900,
        rating: 4.7, review_count: 8932,
        description: 'Apple\'s most powerful iPhone featuring the A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom, and USB-C connectivity.',
        stock: 15,
        images: JSON.stringify(['https://images.unsplash.com/photo-1695048132868-3abd34f8affe?w=600', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600', 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600']),
        specs: JSON.stringify({ 'Display': '6.7" Super Retina XDR OLED, ProMotion 120Hz', 'Chip': 'A17 Pro', 'Storage': '256 GB', 'Camera': '48 MP + 12 MP + 12 MP, 5x Optical Zoom', 'Battery': '4422 mAh', 'OS': 'iOS 17', 'Material': 'Titanium', 'Color': 'Natural Titanium' })
    },
    {
        category_id: 1, name: 'Sony WH-1000XM5 Wireless Headphones', price: 24990, original_price: 34990,
        rating: 4.6, review_count: 6721,
        description: 'Industry-leading noise cancellation with 30-hour battery, multipoint connection, Speak-to-Chat, and crystal-clear hands-free calling.',
        stock: 40,
        images: JSON.stringify(['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600']),
        specs: JSON.stringify({ 'Type': 'Over-Ear, Wireless', 'Driver': '30mm', 'Frequency': '4 Hz - 40,000 Hz', 'Battery': '30 hours', 'Charging': 'USB-C, 3 min = 3 hours', 'Noise Cancellation': 'Auto NC Optimizer', 'Weight': '250g', 'Color': 'Black' })
    },
    {
        category_id: 1, name: 'Dell XPS 15 Laptop', price: 149990, original_price: 179990,
        rating: 4.4, review_count: 3241,
        description: 'Premium 15.6" OLED laptop with Intel Core i7-13700H, 16GB DDR5, 512GB NVMe SSD, NVIDIA GeForce RTX 4060, and stunning InfinityEdge display.',
        stock: 10,
        images: JSON.stringify(['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600']),
        specs: JSON.stringify({ 'Display': '15.6" OLED 3.5K 60Hz', 'Processor': 'Intel Core i7-13700H', 'RAM': '16 GB DDR5', 'Storage': '512 GB NVMe SSD', 'GPU': 'NVIDIA RTX 4060 8GB', 'OS': 'Windows 11 Home', 'Battery': '86 Whr', 'Weight': '1.86 kg' })
    },
    {
        category_id: 1, name: 'boAt Airdopes 141 TWS Earbuds', price: 799, original_price: 2990,
        rating: 4.1, review_count: 54213,
        description: 'True wireless earbuds with 42 hours total playback, ENx technology for calls, IWS v5.3 connectivity, and IPX4 water resistance.',
        stock: 200,
        images: JSON.stringify(['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600', 'https://images.unsplash.com/photo-1631867675167-90a456a90863?w=600']),
        specs: JSON.stringify({ 'Driver': '8mm Dynamic Driver', 'Playback': '6 hours + 36 hours (case)', 'Connectivity': 'Bluetooth 5.3', 'Water Resistance': 'IPX4', 'Charging': 'Type-C, 1.5 hours', 'Microphone': 'Dual ENx Mics', 'Color': 'Blazing Black' })
    },
    {
        category_id: 1, name: 'Xiaomi Smart TV 5X 55" 4K', price: 39999, original_price: 54999,
        rating: 4.3, review_count: 18731,
        description: '55-inch 4K Dolby Vision & Atmos Smart TV with 30W speakers, 4K HDR10+, Android TV 11, built-in Chromecast, and Google Assistant.',
        stock: 25,
        images: JSON.stringify(['https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600', 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=600', 'https://images.unsplash.com/photo-1601944177325-f8867652837f?w=600']),
        specs: JSON.stringify({ 'Screen Size': '55 inch', 'Resolution': '4K Ultra HD (3840 x 2160)', 'HDR': 'Dolby Vision, HDR10+, HLG', 'OS': 'Android TV 11', 'Audio': '30W Dolby Atmos', 'Ports': '3x HDMI 2.1, 2x USB 2.0', 'Connectivity': 'Wi-Fi 5, Bluetooth 5.0' })
    },
    // Fashion
    {
        category_id: 2, name: 'Levi\'s Men\'s 511 Slim Fit Jeans', price: 1799, original_price: 3499,
        rating: 4.3, review_count: 22341,
        description: 'Classic Levi\'s 511 slim fit jeans. Sits below waist with slim fit through seat and thigh. 100% cotton denim with a clean finish.',
        stock: 80,
        images: JSON.stringify(['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600', 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600']),
        specs: JSON.stringify({ 'Fit': 'Slim Fit', 'Material': '100% Cotton Denim', 'Closure': 'Zip Fly with Button', 'Rise': 'Low Rise', 'Wash': 'Dark Stonewash', 'Sizes Available': '28-36 Waist', 'Origin': 'India' })
    },
    {
        category_id: 2, name: 'Allen Solly Women\'s Formal Blazer', price: 1999, original_price: 4999,
        rating: 4.2, review_count: 5672,
        description: 'Solid formal blazer with front button, notch collar, and flap pockets. Perfect for office wear with slim fit silhouette.',
        stock: 35,
        images: JSON.stringify(['https://images.unsplash.com/photo-1594938298603-c8148c4b5d5a?w=600', 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600']),
        specs: JSON.stringify({ 'Fit': 'Slim Fit', 'Fabric': 'Polyester Blend', 'Closure': '2 Button', 'Lining': 'Half Lined', 'Collar': 'Notch Lapel', 'Pockets': '2 Flap Pockets', 'Sizes': 'XS to XXL' })
    },
    {
        category_id: 2, name: 'Nike Air Max 270 Running Shoes', price: 8495, original_price: 12995,
        rating: 4.5, review_count: 9823,
        description: 'Nike Air Max 270 features a 270-degree Air unit for maximum cushioning. Engineered mesh upper for breathability and comfort all day.',
        stock: 60,
        images: JSON.stringify(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600']),
        specs: JSON.stringify({ 'Upper': 'Engineered Mesh', 'Midsole': 'Foam + Air Max 270 unit', 'Outsole': 'Rubber', 'Closure': 'Lace-Up', 'Sizes': 'UK 6 to UK 12', 'Colors': 'Black/White, Triple White', 'Activity': 'Running/Casual' })
    },
    {
        category_id: 2, name: 'H&M Women\'s Floral Wrap Dress', price: 999, original_price: 2299,
        rating: 4.0, review_count: 3421,
        description: 'Floral wrap-front dress with V-neckline, short flutter sleeves, and a self-tie belt. Made from airy woven fabric, perfect for summer.',
        stock: 55,
        images: JSON.stringify(['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600']),
        specs: JSON.stringify({ 'Neckline': 'V-Neck', 'Sleeve': 'Flutter Sleeve', 'Length': 'Midi', 'Material': '100% Viscose', 'Closure': 'Wrap with Self-Tie Belt', 'Pattern': 'Floral Print', 'Sizes': 'XS to XL' })
    },
    // Home & Kitchen
    {
        category_id: 3, name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker', price: 7999, original_price: 12999,
        rating: 4.6, review_count: 31452,
        description: '7-in-1 multi-cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker & warmer. 6 quart capacity with 13 one-touch programs.',
        stock: 30,
        images: JSON.stringify(['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600', 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600', 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600']),
        specs: JSON.stringify({ 'Capacity': '6 Quart (5.7 Liter)', 'Functions': '7-in-1 Multi-Cooker', 'Programs': '13 One-Touch Smart Programs', 'Safety': '10+ Safety Mechanisms', 'Wattage': '1000W', 'Material': 'Stainless Steel Inner Pot', 'Warranty': '1 Year' })
    },
    {
        category_id: 3, name: 'Philips HL7707 Mixer Grinder 750W', price: 3299, original_price: 5595,
        rating: 4.4, review_count: 18234,
        description: '750W powerful motor with 3 stainless steel jars for grinding, chutney & blending. Safe Lock System and 5-year motor warranty.',
        stock: 45,
        images: JSON.stringify(['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600', 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600']),
        specs: JSON.stringify({ 'Motor': '750 Watts', 'Jars': '3 Jars (1.5L + 1L + 0.3L)', 'Speeds': '3 Speed + Pulse', 'Blade': 'Stainless Steel', 'Safety': 'Safe Lock System', 'Warranty': '2 Years Product, 5 Years Motor', 'Color': 'White' })
    },
    {
        category_id: 3, name: 'IKEA KALLAX Shelf Unit', price: 6999, original_price: 8999,
        rating: 4.5, review_count: 7823,
        description: 'Versatile shelf unit with 4 compartments. Can be used as room divider standing vertically or horizontally. 77x77cm in white finish.',
        stock: 20,
        images: JSON.stringify(['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600']),
        specs: JSON.stringify({ 'Dimensions': '77 x 39 x 77 cm', 'Material': 'Particleboard, Fiberboard', 'Color': 'White', 'Compartments': '4', 'Max Load': '13 kg per shelf', 'Assembly': 'Required', 'Origin': 'Sweden' })
    },
    // Books
    {
        category_id: 4, name: 'Atomic Habits by James Clear', price: 449, original_price: 699,
        rating: 4.8, review_count: 89234,
        description: 'The #1 New York Times bestseller. An easy & proven way to build good habits & break bad ones. Tiny changes, remarkable results.',
        stock: 200,
        images: JSON.stringify(['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600']),
        specs: JSON.stringify({ 'Author': 'James Clear', 'Publisher': 'Avery', 'Language': 'English', 'Pages': '320', 'ISBN': '9780735211292', 'Format': 'Paperback', 'Genre': 'Self-Help, Personal Development' })
    },
    {
        category_id: 4, name: 'The Psychology of Money by Morgan Housel', price: 299, original_price: 599,
        rating: 4.7, review_count: 54231,
        description: 'Timeless lessons on wealth, greed, and happiness. How people think about money in sometimes illogical ways that can be overcome.',
        stock: 180,
        images: JSON.stringify(['https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600', 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600']),
        specs: JSON.stringify({ 'Author': 'Morgan Housel', 'Publisher': 'Harriman House', 'Language': 'English', 'Pages': '256', 'Format': 'Paperback', 'Genre': 'Finance, Self-Help', 'Edition': 'Paperback' })
    },
    {
        category_id: 4, name: 'Rich Dad Poor Dad by Robert Kiyosaki', price: 249, original_price: 499,
        rating: 4.6, review_count: 76543,
        description: 'The #1 personal finance book of all time. What the rich teach their kids about money that the poor and middle class do not.',
        stock: 220,
        images: JSON.stringify(['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600', 'https://images.unsplash.com/photo-1569451122073-c8de1d1f4fb8?w=600', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600']),
        specs: JSON.stringify({ 'Author': 'Robert T. Kiyosaki', 'Publisher': 'Plata Publishing', 'Language': 'English', 'Pages': '336', 'Format': 'Paperback', 'Genre': 'Finance, Personal Development' })
    },
    // Sports & Fitness
    {
        category_id: 5, name: 'Boldfit Heavy Duty Adjustable Dumbbells Set', price: 2499, original_price: 4999,
        rating: 4.3, review_count: 12321,
        description: 'Pair of hex dumbbells with rubber coating. Anti-roll hexagon design. Available in 5kg, 10kg, 15kg pairs. Ideal for home gym.',
        stock: 70,
        images: JSON.stringify(['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600']),
        specs: JSON.stringify({ 'Type': 'Hex Dumbbell Pair', 'Weight': '5 kg x 2 Pieces', 'Material': 'Cast Iron + Rubber Coating', 'Shape': 'Hexagonal (Anti-Roll)', 'Handle': 'Knurled Chrome Steel', 'Use': 'Home/Gym', 'Warranty': '1 Year' })
    },
    {
        category_id: 5, name: 'Yonex Astrox 88S Pro Badminton Racket', price: 8499, original_price: 14000,
        rating: 4.7, review_count: 4231,
        description: 'Top-of-the-line offensive racket with Rotational Generator System. Used by top professionals worldwide. Steep angle smash power.',
        stock: 25,
        images: JSON.stringify(['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600', 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600', 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?w=600']),
        specs: JSON.stringify({ 'Head Shape': 'Isometric', 'Shaft': 'TORAY Ultra PEF', 'Flex': 'Stiff', 'Weight': '83g (4U)', 'Balance': 'Head Heavy', 'String Tension': 'Up to 30 lbs', 'Level': 'Professional' })
    },
    {
        category_id: 5, name: 'Decathlon Kiprun KS900 Running Shoes', price: 4999, original_price: 7999,
        rating: 4.4, review_count: 8734,
        description: 'Road running shoes with high cushioning and energy return foam. Breathable mesh upper and durable rubber outsole for long runs.',
        stock: 55,
        images: JSON.stringify(['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600', 'https://images.unsplash.com/photo-1562183241-b937e9102303?w=600']),
        specs: JSON.stringify({ 'Type': 'Road Running', 'Upper': 'Breathable Mesh', 'Midsole': 'High Cushioning Foam', 'Outsole': 'Durable Rubber', 'Drop': '8mm', 'Sizes': 'UK 6 to UK 12', 'Weight': '285g' })
    },
    // Beauty
    {
        category_id: 6, name: 'Lakme Absolute Matte Melt Liquid Lip Color', price: 449, original_price: 699,
        rating: 4.1, review_count: 23412,
        description: 'Transfer-proof matte lip color that melts into your lips. Long-lasting formula with 12-hour wear. Available in 12 vibrant shades.',
        stock: 100,
        images: JSON.stringify(['https://images.unsplash.com/photo-1583241475880-083f84372725?w=600', 'https://images.unsplash.com/photo-1586495777744-4e6232bf6270?w=600', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600']),
        specs: JSON.stringify({ 'Type': 'Liquid Lipstick', 'Finish': 'Matte', 'Duration': '12 Hours', 'Transfer Proof': 'Yes', 'Volume': '4.2 ml', 'Shades': '12 Available', 'Cruelty Free': 'Yes' })
    },
    {
        category_id: 6, name: 'Mamaearth Vitamin C Face Serum 30ml', price: 399, original_price: 699,
        rating: 4.3, review_count: 34521,
        description: 'Brightening face serum with 10% Vitamin C, Turmeric, and Hyaluronic Acid. Reduces dark spots, evens skin tone, and boosts radiance.',
        stock: 150,
        images: JSON.stringify(['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600']),
        specs: JSON.stringify({ 'Key Ingredient': 'Vitamin C 10%, Turmeric, Hyaluronic Acid', 'Volume': '30 ml', 'Skin Type': 'All Skin Types', 'Concern': 'Brightening, Dark Spots', 'Toxin Free': 'Yes', 'Dermatologically Tested': 'Yes', 'Usage': 'Morning & Night' })
    },
    {
        category_id: 6, name: 'Garnier Fructis Strengthening Shampoo 400ml', price: 279, original_price: 399,
        rating: 4.2, review_count: 15432,
        description: 'Fortifying shampoo with Active Fruit Protein + Vitamin B3. Strengthens hair up to 10x vs. untreated hair. For normal to dry hair.',
        stock: 180,
        images: JSON.stringify(['https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600', 'https://images.unsplash.com/photo-1607006483836-90b95d1a2c0c?w=600']),
        specs: JSON.stringify({ 'Volume': '400 ml', 'Hair Type': 'Normal to Dry', 'Key Ingredient': 'Active Fruit Protein, Vitamin B3', 'Concern': 'Strengthening, Anti-Breakage', 'Paraben Free': 'No', 'Suitable For': 'Men & Women' })
    },
];

const existingCategories = db.prepare('SELECT COUNT(*) as count FROM categories').get();
const existingProducts = db.prepare('SELECT COUNT(*) as count FROM products').get();

if (existingCategories.count === 0 || existingProducts.count === 0) {
    db.transaction(() => {
        // Clear both to ensure IDs stay consistent with the seed data
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
