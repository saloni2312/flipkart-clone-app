'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchProduct, addToCart, formatPrice } from '@/lib/api';

function Toast({ message, onHide }) {
    useEffect(() => { const t = setTimeout(onHide, 2500); return () => clearTimeout(t); }, [onHide]);
    return <div className="toast">{message}</div>;
}

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [adding, setAdding] = useState(false);
    const [toast, setToast] = useState('');

    useEffect(() => {
        fetchProduct(id).then(p => { setProduct(p); setLoading(false); }).catch(() => setLoading(false));
    }, [id]);

    const handleAddToCart = async () => {
        setAdding(true);
        try {
            await addToCart(product.id);
            setToast('✅ Added to cart!');
        } catch (e) {
            setToast('❌ ' + e.message);
        } finally {
            setAdding(false);
        }
    };

    const handleBuyNow = async () => {
        setAdding(true);
        try {
            await addToCart(product.id);
            router.push('/cart');
        } catch (e) {
            setToast('❌ ' + e.message);
            setAdding(false);
        }
    };

    if (loading) return (
        <div className="page-container">
            <div className="product-detail" style={{ marginTop: 16 }}>
                <div className="skeleton" style={{ height: '380px', borderRadius: '4px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="skeleton" style={{ height: '24px', width: '70%' }} />
                    <div className="skeleton" style={{ height: '16px', width: '40%' }} />
                    <div className="skeleton" style={{ height: '36px', width: '30%' }} />
                </div>
            </div>
        </div>
    );

    if (!product) return (
        <div className="page-container">
            <div className="empty-state" style={{ marginTop: 40 }}>
                <div className="empty-state-icon">😕</div>
                <h3>Product not found</h3>
                <Link href="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: 12 }}>Go Home</Link>
            </div>
        </div>
    );

    const images = Array.isArray(product.images) ? product.images : JSON.parse(product.images || '[]');
    const specs = typeof product.specs === 'object' ? product.specs : JSON.parse(product.specs || '{}');

    return (
        <div className="page-container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link href="/">Home</Link> ›
                <Link href={`/?category=${product.category_id}`}>{product.category_name}</Link> ›
                <span style={{ color: '#212121' }}>{product.name.slice(0, 40)}...</span>
            </div>

            <div className="product-detail">
                {/* LEFT: Image carousel */}
                <div className="product-detail-left">
                    <div className="carousel">
                        <img
                            src={images[activeImage] || images[0]}
                            alt={product.name}
                            className="carousel-main"
                            onError={e => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
                        />
                        {images.length > 1 && (
                            <div className="carousel-thumbs">
                                {images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`View ${i + 1}`}
                                        className={`carousel-thumb ${activeImage === i ? 'active' : ''}`}
                                        onClick={() => setActiveImage(i)}
                                        onError={e => { e.target.src = 'https://via.placeholder.com/56x56'; }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="product-actions" style={{ marginTop: 24 }}>
                        <button
                            className="btn btn-add-cart"
                            onClick={handleAddToCart}
                            disabled={adding || product.stock === 0}
                        >
                            🛒 {adding ? 'Adding...' : 'Add to Cart'}
                        </button>
                        <button
                            className="btn btn-buy-now"
                            onClick={handleBuyNow}
                            disabled={adding || product.stock === 0}
                        >
                            ⚡ Buy Now
                        </button>
                    </div>
                </div>

                {/* RIGHT: Product info */}
                <div className="product-detail-right">
                    <div className="product-detail-info">
                        <h1 className="product-name">{product.name}</h1>

                        <div className="product-rating-row">
                            <span className="rating-badge">{product.rating} ★</span>
                            <span className="rating-count">{product.review_count.toLocaleString('en-IN')} ratings &amp; reviews</span>
                        </div>

                        <div className="product-price-row">
                            <p className="product-price-main">{formatPrice(product.price)}</p>
                            <div className="product-price-meta">
                                {product.original_price > product.price && (
                                    <>
                                        <span className="price-original">{formatPrice(product.original_price)}</span>
                                        <span className="price-discount">{product.discount_percent}% off</span>
                                    </>
                                )}
                            </div>
                            <p style={{ fontSize: 12, color: '#878787', marginTop: 4 }}>+ ₹0 Delivery Charge</p>
                        </div>

                        <p className={product.stock > 0 ? 'stock-in' : 'stock-out'}>
                            {product.stock > 0 ? `✓ In Stock (${product.stock} left)` : '✗ Out of Stock'}
                        </p>

                        <div style={{ marginTop: 20 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Description</h3>
                            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#4d4d4d' }}>{product.description}</p>
                        </div>
                    </div>

                    {/* Specifications */}
                    {Object.keys(specs).length > 0 && (
                        <div className="specs-table">
                            <h3>Specifications</h3>
                            <table>
                                <tbody>
                                    {Object.entries(specs).map(([key, val]) => (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{val}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {toast && <Toast message={toast} onHide={() => setToast('')} />}
        </div>
    );
}
