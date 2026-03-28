'use client';
import Link from 'next/link';
import { formatPrice } from '@/lib/api';
import { addItemToCart } from '@/lib/cartStore';

export default function ProductCard({ product }) {
    const firstImage = Array.isArray(product.images) ? product.images[0] : JSON.parse(product.images || '[]')[0];

    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addItemToCart(product);
        // Show a brief visual feedback
        const btn = e.currentTarget;
        btn.textContent = '✅ Added!';
        btn.style.background = '#388e3c';
        setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.style.background = '';
        }, 1200);
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
