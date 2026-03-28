'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/api';
import { getCartSummary, updateItemQuantity, removeItemFromCart } from '@/lib/cartStore';

export default function CartPage() {
    const router = useRouter();
    const [cart, setCart] = useState({ items: [], subtotal: 0, discount: 0, delivery: 0, total: 0 });

    const loadCart = useCallback(() => {
        setCart(getCartSummary());
    }, []);

    useEffect(() => {
        loadCart();
        window.addEventListener('cart-updated', loadCart);
        return () => window.removeEventListener('cart-updated', loadCart);
    }, [loadCart]);

    const updateQty = (productId, delta) => {
        const item = cart.items.find(i => i.productId === productId);
        if (!item) return;
        const newQty = item.quantity + delta;
        if (newQty < 1) return;
        updateItemQuantity(productId, newQty);
    };

    const removeItem = (productId) => {
        removeItemFromCart(productId);
    };

    if (cart.items.length === 0) return (
        <div className="page-container" style={{ paddingTop: 24 }}>
            <div className="empty-state">
                <div className="empty-state-icon">🛒</div>
                <h3>Your cart is empty!</h3>
                <p>Add items to it now.</p>
                <Link href="/" className="btn btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '12px 32px' }}>
                    Shop Now
                </Link>
            </div>
        </div>
    );

    return (
        <div className="page-container" style={{ paddingTop: 16, paddingBottom: 32 }}>
            <div className="page-header">
                <h1>My Cart <span style={{ fontSize: 16, fontWeight: 400, color: '#878787' }}>({cart.items.length} item{cart.items.length !== 1 ? 's' : ''})</span></h1>
            </div>

            <div className="cart-layout">
                {/* Cart Items */}
                <div className="cart-items">
                    <div className="cart-header">
                        <h2>Shopping Cart</h2>
                        <Link href="/" style={{ fontSize: 14, color: '#2874f0', fontWeight: 500 }}>+ Add More Items</Link>
                    </div>

                    {cart.items.map(item => (
                        <div key={item.productId} className="cart-item">
                            <Link href={`/product/${item.productId}`}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="cart-item-img"
                                    onError={e => { e.target.src = 'https://via.placeholder.com/96x96'; }}
                                />
                            </Link>
                            <div className="cart-item-details">
                                <Link href={`/product/${item.productId}`}>
                                    <p className="cart-item-name">{item.name}</p>
                                </Link>
                                <p style={{ fontSize: 12, color: '#878787', marginBottom: 4 }}>Seller: RetailNet</p>
                                <p className="cart-item-price">
                                    {formatPrice(item.price)}
                                    {item.original_price > item.price && (
                                        <>
                                            <span className="price-original" style={{ fontSize: 14, marginLeft: 8 }}>{formatPrice(item.original_price)}</span>
                                            <span className="price-discount" style={{ fontSize: 12, marginLeft: 8 }}>{item.discount_percent}% off</span>
                                        </>
                                    )}
                                </p>
                                <div className="cart-item-actions">
                                    <div className="qty-control">
                                        <button className="qty-btn" onClick={() => updateQty(item.productId, -1)} disabled={item.quantity <= 1}>−</button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button className="qty-btn" onClick={() => updateQty(item.productId, 1)}>+</button>
                                    </div>
                                    <button className="btn btn-danger" onClick={() => removeItem(item.productId)}>
                                        REMOVE
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e0e0e0' }}>
                        <button className="btn btn-primary" style={{ width: 'auto', padding: '14px 48px', fontSize: 16 }} onClick={() => router.push('/checkout')}>
                            Place Order →
                        </button>
                    </div>
                </div>

                {/* Price Summary */}
                <div className="price-summary">
                    <div className="price-summary-header">Price Details</div>
                    <div className="price-summary-body">
                        <div className="price-row">
                            <span>Price ({cart.items.length} item{cart.items.length !== 1 ? 's' : ''})</span>
                            <span>{formatPrice(cart.subtotal + cart.discount)}</span>
                        </div>
                        {cart.discount > 0 && (
                            <div className="price-row savings">
                                <span>Discount</span>
                                <span>− {formatPrice(cart.discount)}</span>
                            </div>
                        )}
                        <div className="price-row">
                            <span>Delivery Charges</span>
                            <span style={{ color: '#388e3c' }}>{cart.delivery === 0 ? 'FREE' : formatPrice(cart.delivery)}</span>
                        </div>
                        <div className="price-row total">
                            <span>Total Amount</span>
                            <span>{formatPrice(cart.total)}</span>
                        </div>
                        {cart.discount > 0 && (
                            <p style={{ fontSize: 13, color: '#388e3c', fontWeight: 500, marginTop: 12 }}>
                                🎉 You will save {formatPrice(cart.discount)} on this order
                            </p>
                        )}
                    </div>
                    <div className="price-summary-footer">
                        <button className="btn btn-primary" onClick={() => router.push('/checkout')}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
