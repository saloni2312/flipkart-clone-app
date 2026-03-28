'use client';
import Link from 'next/link';
import { formatPrice, addToCart } from '@/lib/api';

export default function ProductCard({ product }) {
    const firstImage = Array.isArray(product.images) ? product.images[0] : JSON.parse(product.images || '[]')[0];

    const handleQuickAdd = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await addToCart(product.id);
            // We rely on the 'cart-updated' event which is already bubbles/listened by Navbar
            alert(`✅ ${product.name} added to cart!`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="product-card-container">
            <Link href={`/product/${product.id}`} className="product-card">
                {product.discount_percent > 0 && (
                    <span className="discount-badge">{product.discount_percent}% off</span>
                )}
                <img
                    src={firstImage}
                    alt={product.name}
                    className="product-card-img"
                    onError={e => { e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'; }}
                />
                <p className="product-card-name">{product.name}</p>
                <div className="product-card-rating">
                    <span className="rating-badge">
                        {product.rating} ★
                    </span>
                    <span className="rating-count">({product.review_count.toLocaleString('en-IN')})</span>
                    <span className="fk-assured">
                        Assured<span>✔</span>
                    </span>
                </div>
                <div className="product-card-price">
                    <span className="price-current">{formatPrice(product.price)}</span>
                    {product.original_price > product.price && (
                        <>
                            <span className="price-original">{formatPrice(product.original_price)}</span>
                            <span className="price-discount">{product.discount_percent}% off</span>
                        </>
                    )}
                </div>
            </Link>
            <button className="quick-add-btn" onClick={handleQuickAdd}>
                Add to Cart
            </button>
        </div>
    );
}
