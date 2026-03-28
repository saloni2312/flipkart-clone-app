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
    { id: 9, name: 'Sports', icon: '🏋️' },
    { id: 10, name: 'Books', icon: '📚' },
    { id: 11, name: 'Household', icon: '🧽' },
    { id: 12, name: 'Auto Acc', icon: '🚗' },
];

const products = [
    // --- Mobiles (Category 1) ---
    { category_id: 1, name: 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 256 GB)', price: 109999, original_price: 134999, rating: 4.5, review_count: 12453, description: 'Flagship AI Features', stock: 50, images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'Apple iPhone 15 Pro (Natural Titanium, 128 GB)', price: 124999, original_price: 134900, rating: 4.6, review_count: 5231, description: 'Forged in Titanium', stock: 30, images: JSON.stringify(['https://m.media-amazon.com/images/I/81Sig6biNGL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'Google Pixel 8 (Hazel, 128 GB)', price: 59999, original_price: 75999, rating: 4.4, review_count: 8234, description: 'Best Camera AI', stock: 30, images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'OnePlus 12 (Flowy Emerald, 512 GB)', price: 69999, original_price: 74999, rating: 4.5, review_count: 2341, description: 'Smooth Beyond Belief', stock: 45, images: JSON.stringify(['https://m.media-amazon.com/images/I/717QX7shLpL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'Nothing Phone (2a) (Milk, 128 GB)', price: 23999, original_price: 25999, rating: 4.4, review_count: 15432, description: 'Unique Glyph UI', stock: 100, images: JSON.stringify(['https://m.media-amazon.com/images/I/81m6mFkP-8L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'Google Pixel 8 Pro (Bay, 128 GB)', price: 99999, original_price: 106999, rating: 4.6, review_count: 1245, description: 'Advanced Pixel Camera', stock: 20, images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'Samsung Galaxy Z Fold5 (Icy Blue, 256 GB)', price: 154999, original_price: 164999, rating: 4.5, review_count: 823, description: 'Foldable Powerhouse', stock: 15, images: JSON.stringify(['https://m.media-amazon.com/images/I/717QX7shLpL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'Asus ROG Phone 8 Pro (256 GB)', price: 94999, original_price: 104990, rating: 4.7, review_count: 523, description: 'Ultimate Gaming Phone', stock: 10, images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 1, name: 'Realme 12 Pro+ 5G (Submarine Blue)', price: 29999, original_price: 34999, rating: 4.3, review_count: 8923, description: 'Periscope Camera Master', stock: 50, images: JSON.stringify(['https://m.media-amazon.com/images/I/81m6mFkP-8L._SX679_.jpg']), specs: JSON.stringify({}) },

    // --- Fashion (Category 2) ---
    { category_id: 2, name: 'Van Heusen Men\'s Solid Polo', price: 999, original_price: 1499, rating: 4.1, review_count: 8762, description: 'Casual Sophistication', stock: 120, images: JSON.stringify(['https://m.media-amazon.com/images/I/71NnU6A0GFL._SY879_.jpg']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Allen Solly Men\'s Formal Shirt', price: 1249, original_price: 2499, rating: 4.2, review_count: 5431, description: 'Professional Look', stock: 80, images: JSON.stringify(['https://m.media-amazon.com/images/I/7178uP7VnJL._SY879_.jpg']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Levi\'s Women\'s Skinny Jeans', price: 1899, original_price: 3499, rating: 4.3, review_count: 2310, description: 'Classic Skinny Fit', stock: 50, images: JSON.stringify(['https://m.media-amazon.com/images/I/61Nl0uQvXHL._SY879_.jpg']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Biba Women\'s Straight Kurta', price: 1299, original_price: 2599, rating: 4.2, review_count: 3120, description: 'Floral Beauty', stock: 100, images: JSON.stringify(['https://m.media-amazon.com/images/I/81M+Z9o2YDL._SY879_.jpg']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Tommy Hilfiger Essential T-Shirt', price: 2199, original_price: 3499, rating: 4.4, review_count: 1245, description: 'Premium Cotton', stock: 60, images: JSON.stringify(['https://m.media-amazon.com/images/I/71NnU6A0GFL._SY879_.jpg']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Nike Revolution 6 Running Shoes', price: 2495, original_price: 3695, rating: 4.4, review_count: 15678, description: 'Plush Running Ride', stock: 55, images: JSON.stringify(['https://m.media-amazon.com/images/I/71S6SjC1DQL._SX695_.jpg']), specs: JSON.stringify({}) },

    // --- Sports & Gym (Category 9) ---
    { category_id: 9, name: 'New Balance Men\'s 574 Sneakers', price: 7999, original_price: 9999, rating: 4.7, review_count: 1245, description: 'Classic Versatility', stock: 45, images: JSON.stringify(['https://m.media-amazon.com/images/I/71S6SjC1DQL._SX695_.jpg']), specs: JSON.stringify({}) },
    { category_id: 9, name: 'Campus Men\'s North Plus Shoes', price: 1299, original_price: 1899, rating: 4.2, review_count: 15672, description: 'Active & Stylish', stock: 200, images: JSON.stringify(['https://m.media-amazon.com/images/I/61mpMH5TCtL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 9, name: 'Reebok Men\'s Court Peak Sneakers', price: 4499, original_price: 5999, rating: 4.5, review_count: 3120, description: 'Minimalist Tennis Look', stock: 60, images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 9, name: 'Adidas Originals Superstar', price: 7999, original_price: 9999, rating: 4.7, review_count: 31200, description: 'Iconic Classic', stock: 35, images: JSON.stringify(['https://m.media-amazon.com/images/I/71S6SjC1DQL._SX695_.jpg']), specs: JSON.stringify({}) },

    // --- Electronics (Category 3) ---
    { category_id: 3, name: 'Apple iPad Air (5th Gen) M1', price: 54999, original_price: 59900, rating: 4.8, review_count: 8234, description: 'Light. Bright. M1.', stock: 35, images: JSON.stringify(['https://m.media-amazon.com/images/I/61XZQXFQeBL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Sony WH-1000XM5 Headphones', price: 24990, original_price: 34990, rating: 4.7, review_count: 5123, description: 'Best-in-class NC', stock: 40, images: JSON.stringify(['https://m.media-amazon.com/images/I/61X-H+V5fRL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'DJI Mini 4 Pro Drone', price: 95990, original_price: 112000, rating: 4.9, review_count: 843, description: 'Pro-level Video', stock: 12, images: JSON.stringify(['https://m.media-amazon.com/images/I/61kG+0XW1XL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Logitech G502 HERO Mouse', price: 4199, original_price: 5495, rating: 4.7, review_count: 12450, description: 'Pro Gaming Hero', stock: 60, images: JSON.stringify(['https://m.media-amazon.com/images/I/61mpMH5TCtL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Bose QuietComfort Ultra', price: 34990, original_price: 39900, rating: 4.7, review_count: 1245, description: 'Immersive Audio NC', stock: 25, images: JSON.stringify(['https://m.media-amazon.com/images/I/61X-H+V5fRL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Nikon Z8 Body Only', price: 329000, original_price: 359000, rating: 4.9, review_count: 124, description: 'Pro 8K Mirrorless', stock: 5, images: JSON.stringify(['https://m.media-amazon.com/images/I/51H+uFqN9oL._SX679_.jpg']), specs: JSON.stringify({}) },

    // --- Home & Furnishing (Category 4) ---
    { category_id: 4, name: 'Tactical LED Torch (2 Pack)', price: 599, original_price: 1299, rating: 4.3, review_count: 8932, description: 'Bright & Zoomable', stock: 150, images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Ajanta Quartz Wall Clock', price: 449, original_price: 899, rating: 4.4, review_count: 23100, description: 'Silent Classic', stock: 300, images: JSON.stringify(['https://m.media-amazon.com/images/I/81Sig6biNGL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Cotton Double Bed Sheet Set', price: 899, original_price: 1899, rating: 4.2, review_count: 12450, description: 'Soft Luxury Cotton', stock: 100, images: JSON.stringify(['https://m.media-amazon.com/images/I/81I6nU9mD6L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'King Size Mosquito Net', price: 799, original_price: 1499, rating: 4.5, review_count: 5678, description: 'Peaceful Sleep Always', stock: 120, images: JSON.stringify(['https://m.media-amazon.com/images/I/618S4Y6T9yL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Wakefit Orthopedic Mattress', price: 10499, original_price: 15999, rating: 4.4, review_count: 23100, description: 'Next Gen Memory Foam', stock: 45, images: JSON.stringify(['https://m.media-amazon.com/images/I/81I6nU9mD6L._SX679_.jpg']), specs: JSON.stringify({}) },

    // --- Appliances (Category 5) ---
    { category_id: 5, name: 'Samsung 7 kg 5 Star Front Load', price: 29990, original_price: 36900, rating: 4.5, review_count: 12450, description: 'Hygiene Steam AI', stock: 35, images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'LG 242 L 3 Star Frost-Free', price: 25990, original_price: 33999, rating: 4.3, review_count: 8932, description: 'Door Cooling+', stock: 20, images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'Philips Digital Air Fryer', price: 8499, original_price: 11995, rating: 4.6, review_count: 5678, description: '90% Less Fat', stock: 100, images: JSON.stringify(['https://m.media-amazon.com/images/I/618S4Y6T9yL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'Dyson V11 Absolute Vacuum', price: 49900, original_price: 55900, rating: 4.7, review_count: 1245, description: 'Twice the Suction', stock: 15, images: JSON.stringify(['https://m.media-amazon.com/images/I/41-95Uv9M8L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'LG 8 kg 5 Star Front Load', price: 34990, original_price: 42990, rating: 4.6, review_count: 12450, description: 'AI Direct Drive', stock: 25, images: JSON.stringify(['https://m.media-amazon.com/images/I/71RVuS3q9pL._SX679_.jpg']), specs: JSON.stringify({}) },

    // --- Furniture (Category 8) ---
    { category_id: 8, name: 'Solid Wood Queen Size Bed', price: 18999, original_price: 26999, rating: 4.4, review_count: 124, description: 'Walnut Finish Beauty', stock: 15, images: JSON.stringify(['https://m.media-amazon.com/images/I/71T6z7v4YpL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 8, name: 'Ergonomic Office Chair', price: 5499, original_price: 8999, rating: 4.3, review_count: 3120, description: 'High Back Support', stock: 50, images: JSON.stringify(['https://m.media-amazon.com/images/I/51H+uFqN9oL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 8, name: 'Urban Ladder Coffee Table', price: 4499, original_price: 7999, rating: 4.4, review_count: 3120, description: 'Sheesham Wood Table', stock: 20, images: JSON.stringify(['https://m.media-amazon.com/images/I/51H+uFqN9oL._SX679_.jpg']), specs: JSON.stringify({}) },

    // --- Toys & Baby (Category 7) ---
    { category_id: 7, name: 'LEGO Star Wars Millennium Falcon', price: 14999, original_price: 18999, rating: 4.9, review_count: 1245, description: 'Classic Star Wars Model', stock: 10, images: JSON.stringify(['https://m.media-amazon.com/images/I/81L6z7v4YpL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 7, name: 'Nerf Elite 2.0 Commander', price: 1299, original_price: 1799, rating: 4.5, review_count: 12450, description: 'Battle-ready Blaster', stock: 100, images: JSON.stringify(['https://m.media-amazon.com/images/I/81M+Z9o2YDL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 7, name: 'Barbie Dreamhouse 2024', price: 6999, original_price: 8999, rating: 4.8, review_count: 5231, description: 'Ultimate Play Home', stock: 15, images: JSON.stringify(['https://m.media-amazon.com/images/I/81L6z7v4YpL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 7, name: 'Catan Board Game Classic', price: 2999, original_price: 3999, rating: 4.8, review_count: 3120, description: 'Legendary Strategy Game', stock: 40, images: JSON.stringify(['https://m.media-amazon.com/images/I/81I6nU9mD6L._SX679_.jpg']), specs: JSON.stringify({}) },

    // --- Books (Category 10) ---
    { category_id: 10, name: 'Atomic Habits', price: 499, original_price: 799, rating: 4.8, review_count: 15678, description: 'Proven Habits Guide', stock: 500, images: JSON.stringify(['https://m.media-amazon.com/images/I/81Sig6biNGL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 10, name: 'Psychology of Money', price: 299, original_price: 499, rating: 4.7, review_count: 12450, description: 'Wealth & Habits', stock: 400, images: JSON.stringify(['https://m.media-amazon.com/images/I/81L6z7v4YpL._SX679_.jpg']), specs: JSON.stringify({}) },

    // --- Household (Category 11) ---
    { category_id: 11, name: 'Air Purifier HEPA Filter', price: 7999, original_price: 10995, rating: 4.4, review_count: 12432, description: 'Virus Protection Home', stock: 80, images: JSON.stringify(['https://m.media-amazon.com/images/I/618S4Y6T9yL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 11, name: 'Prestige IRIS Plus Mixer', price: 3499, original_price: 5499, rating: 4.4, review_count: 18234, description: '750W Kitchen Power', stock: 100, images: JSON.stringify(['https://m.media-amazon.com/images/I/7178uP7VnJL._SY879_.jpg']), specs: JSON.stringify({}) },

    // --- Beauty (Category 6) ---
    { category_id: 6, name: 'Nivea Soft Light 200ml', price: 299, original_price: 499, rating: 4.6, review_count: 56789, description: 'Light Care Skin', stock: 300, images: JSON.stringify(['https://m.media-amazon.com/images/I/61WfQfNfS9L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 6, name: 'Mamaearth Onion Shampoo', price: 349, original_price: 499, rating: 4.3, review_count: 156789, description: 'Hair Growth Care', stock: 500, images: JSON.stringify(['https://m.media-amazon.com/images/I/61WfQfNfS9L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 6, name: 'Philips Purple Hair Dryer', price: 849, original_price: 1295, rating: 4.3, review_count: 15432, description: 'Gentle 1000W Drying', stock: 150, images: JSON.stringify(['https://m.media-amazon.com/images/I/61+S4L-A99L._SX679_.jpg']), specs: JSON.stringify({}) },

    // --- Auto Acc (Category 12) ---
    { category_id: 12, name: 'Portable Tyre Inflator', price: 2499, original_price: 3999, rating: 4.5, review_count: 1245, description: 'On-the-go Inflation', stock: 60, images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']), specs: JSON.stringify({ 'Type': 'Electric', 'Pressure': '150 PSI' }) },

    // --- Massive Addition for ~80 Total ---
    { category_id: 1, name: 'Redmi Note 13 Pro 5G', price: 23999, original_price: 28999, rating: 4.3, review_count: 15672, description: '200MP Camera Master', stock: 120, images: JSON.stringify(['https://m.media-amazon.com/images/I/81m6mFkP-8L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Adidas Men\'s Galaxy 6 Running Shoes', price: 3499, original_price: 5999, rating: 4.4, review_count: 15678, description: 'Classic Comfort Shoes', stock: 55, images: JSON.stringify(['https://m.media-amazon.com/images/I/71S6SjC1DQL._SX695_.jpg']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Apple Watch Series 9 (GPS, 45mm)', price: 39900, original_price: 44900, rating: 4.8, review_count: 5231, description: 'The Smarter Watch', stock: 35, images: JSON.stringify(['https://m.media-amazon.com/images/I/61XZQXFQeBL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Philips 3.0L Induction Cooktop', price: 2199, original_price: 3495, rating: 4.2, review_count: 23100, description: 'Safe & Smart Cooking', stock: 100, images: JSON.stringify(['https://m.media-amazon.com/images/I/7178uP7VnJL._SY879_.jpg']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'Samsung 28L Convection Microwave', price: 12490, original_price: 15550, rating: 4.4, review_count: 8234, description: 'Multi-function Oven', stock: 30, images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 6, name: 'L\'Oréal Paris Revitalift Serum', price: 799, original_price: 1099, rating: 4.5, review_count: 12450, description: 'Intense Hydrating Serum', stock: 150, images: JSON.stringify(['https://m.media-amazon.com/images/I/61WfQfNfS9L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 7, name: 'Nerf Elite 2.0 Commander RD-6', price: 1249, original_price: 1799, rating: 4.5, review_count: 12450, description: 'Action Blaster', stock: 80, images: JSON.stringify(['https://m.media-amazon.com/images/I/81M+Z9o2YDL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 8, name: 'Solimo Solid Wood Queen Bed', price: 18999, original_price: 25999, rating: 4.2, review_count: 5678, description: 'Sturdy & Elegant Wood', stock: 15, images: JSON.stringify(['https://m.media-amazon.com/images/I/71T6z7v4YpL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 9, name: 'Nivia Storm Football (Size 5)', price: 499, original_price: 999, rating: 4.4, review_count: 23100, description: 'Durable Match Ball', stock: 500, images: JSON.stringify(['https://m.media-amazon.com/images/I/61mpMH5TCtL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 10, name: 'The Silent Patient by Alex Michaelides', price: 299, original_price: 499, rating: 4.6, review_count: 8932, description: 'New York Times Bestseller', stock: 120, images: JSON.stringify(['https://m.media-amazon.com/images/I/81L6z7v4YpL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 11, name: 'Milton Thermosteel Flip Lid Flask', price: 899, original_price: 1299, rating: 4.5, review_count: 32100, description: 'Hot & Cold 24h', stock: 200, images: JSON.stringify(['https://m.media-amazon.com/images/I/81I6nU9mD6L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 12, name: 'T-Grip Steering Wheel Cover', price: 599, original_price: 999, rating: 4.3, review_count: 12432, description: 'Premium Leather Grip', stock: 150, images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']), specs: JSON.stringify({}) },

    // --- Second Batch for Variety ---
    { category_id: 1, name: 'Motorola Edge 50 Fusion (Blue)', price: 22999, original_price: 28999, rating: 4.4, review_count: 5672, description: 'Curved Display Beauty', stock: 90, images: JSON.stringify(['https://m.media-amazon.com/images/I/81m6mFkP-8L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 2, name: 'Vero Moda High Rise Trousers', price: 1499, original_price: 2999, rating: 4.3, review_count: 3120, description: 'Sleek Fit Trousers', stock: 60, images: JSON.stringify(['https://m.media-amazon.com/images/I/61Nl0uQvXHL._SY879_.jpg']), specs: JSON.stringify({}) },
    { category_id: 3, name: 'Western Digital 1.5TB HDD', price: 4499, original_price: 5999, rating: 4.5, review_count: 3120, description: 'Portable Backup Drive', stock: 80, images: JSON.stringify(['https://m.media-amazon.com/images/I/61XZQXFQeBL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 4, name: 'Milton Stainless Steel Lunch Box', price: 1299, original_price: 1899, rating: 4.4, review_count: 5678, description: 'Vacuum Insulated Box', stock: 100, images: JSON.stringify(['https://m.media-amazon.com/images/I/7178uP7VnJL._SY879_.jpg']), specs: JSON.stringify({}) },
    { category_id: 5, name: 'Panasonic 1.5 Ton AC', price: 36990, original_price: 54990, rating: 4.4, review_count: 8234, description: 'Smart Inverter AC', stock: 40, images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 6, name: 'Lakmé Absolute Lip Color', price: 429, original_price: 649, rating: 4.1, review_count: 18432, description: 'Matte Luxe Finish', stock: 200, images: JSON.stringify(['https://m.media-amazon.com/images/I/61WfQfNfS9L._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 7, name: 'Barbie Color Reveal Doll', price: 1099, original_price: 1499, rating: 4.6, review_count: 8932, description: 'Surprise Unboxing Toy', stock: 100, images: JSON.stringify(['https://m.media-amazon.com/images/I/81L6z7v4YpL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 8, name: 'Wakefit Shoe Rack', price: 2999, original_price: 4999, rating: 4.2, review_count: 3120, description: 'Compact Wood Storage', stock: 45, images: JSON.stringify(['https://m.media-amazon.com/images/I/51H+uFqN9oL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 9, name: 'Yonex Mavis 350 Shuttlecock', price: 950, original_price: 1250, rating: 4.7, review_count: 5678, description: 'Nylon Shuttlecocks', stock: 300, images: JSON.stringify(['https://m.media-amazon.com/images/I/61mpMH5TCtL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 10, name: 'The Alchemist by Paulo Coelho', price: 199, original_price: 399, rating: 4.8, review_count: 56789, description: 'Global Best Seller', stock: 300, images: JSON.stringify(['https://m.media-amazon.com/images/I/81Sig6biNGL._SX679_.jpg']), specs: JSON.stringify({}) },
    { category_id: 11, name: 'Eveready LED Bulbs (Pack of 10)', price: 799, original_price: 1499, rating: 4.4, review_count: 23100, description: 'Bright Home Lighting', stock: 500, images: JSON.stringify(['https://m.media-amazon.com/images/I/7178uP7VnJL._SY879_.jpg']), specs: JSON.stringify({}) },
    { category_id: 12, name: '70mai Dash Cam Pro Plus+', price: 7499, original_price: 9999, rating: 4.5, review_count: 8923, description: 'Ultra HD Car Safety', stock: 60, images: JSON.stringify(['https://m.media-amazon.com/images/I/61k1r-rYv9L._SX679_.jpg']), specs: JSON.stringify({}) },
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
