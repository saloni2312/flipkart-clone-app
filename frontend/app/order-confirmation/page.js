'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { fetchOrder, formatPrice } from '@/lib/api';

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const orderNumber = searchParams.get('orderNumber');
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (orderId) fetchOrder(orderId).then(setOrder).catch(console.error);
    }, [orderId]);

    const estimatedDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <div className="page-container">
            <div className="order-confirm-card">
                <div className="order-confirm-icon">✅</div>
                <h1 style={{ fontSize: 24, fontWeight: 600, color: '#388e3c', marginBottom: 4 }}>Order Placed Successfully!</h1>
                <p style={{ color: '#878787', fontSize: 14 }}>Thank you for shopping with Flipkart</p>

                <div className="order-confirm-id">
                    Order ID: <strong>{orderNumber}</strong>
                </div>

                <div style={{ background: '#f1f8e9', borderRadius: 8, padding: '12px 20px', marginTop: 20, display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                    <span style={{ fontSize: 20 }}>📦</span>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: 12, color: '#878787' }}>Estimated Delivery</p>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#2e7d32' }}>{estimatedDate}</p>
                    </div>
                </div>

                {order && (
                    <>
                        <div className="order-confirm-items">
                            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Order Items</h3>
                            {order.items.map(item => (
                                <div key={item.id} className="order-confirm-item">
                                    <img
                                        src={item.product_image}
                                        alt={item.product_name}
                                        onError={e => { e.target.src = 'https://via.placeholder.com/56'; }}
                                    />
                                    <div style={{ flex: 1, textAlign: 'left' }}>
                                        <p style={{ fontSize: 14, fontWeight: 500 }}>{item.product_name}</p>
                                        <p style={{ fontSize: 13, color: '#878787' }}>Qty: {item.quantity} × {formatPrice(item.price_at_purchase)}</p>
                                    </div>
                                    <p style={{ fontWeight: 600 }}>{formatPrice(item.price_at_purchase * item.quantity)}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: 20, padding: '16px', background: '#f9f9f9', borderRadius: 8, textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700 }}>
                                <span>Total Paid</span>
                                <span style={{ color: '#2874f0' }}>{formatPrice(order.total)}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 20, padding: '16px', background: '#fff3e0', borderRadius: 8, textAlign: 'left' }}>
                            <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>📍 Delivering to:</p>
                            <p style={{ fontSize: 13, color: '#4d4d4d', lineHeight: 1.6 }}>
                                {order.shipping_address.name}<br />
                                {order.shipping_address.address}<br />
                                {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}<br />
                                📞 {order.shipping_address.phone}
                            </p>
                        </div>
                    </>
                )}

                <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                    <Link href="/" className="btn btn-outline" style={{ flex: 1, textAlign: 'center', display: 'block' }}>
                        Continue Shopping
                    </Link>
                    <Link href="/orders" className="btn btn-primary" style={{ flex: 1, textAlign: 'center', display: 'block' }}>
                        View All Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>}>
            <ConfirmationContent />
        </Suspense>
    );
}
