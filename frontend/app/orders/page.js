'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchOrders, formatPrice } from '@/lib/api';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders().then(setOrders).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="page-container" style={{ paddingTop: 24 }}>
            <div className="skeleton" style={{ height: 200, borderRadius: 4 }} />
        </div>
    );

    return (
        <div className="page-container" style={{ paddingTop: 16, paddingBottom: 32 }}>
            <div className="page-header">
                <h1>My Orders</h1>
                <Link href="/" className="btn btn-outline" style={{ width: 'auto', padding: '8px 20px', fontSize: 14 }}>
                    + Shop More
                </Link>
            </div>

            {orders.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <h3>No orders yet</h3>
                    <p>When you place orders, they'll appear here.</p>
                    <Link href="/" className="btn btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '12px 32px' }}>
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map(order => {
                        const address = typeof order.shipping_address === 'string'
                            ? JSON.parse(order.shipping_address) : order.shipping_address;

                        return (
                            <div key={order.id} className="order-card">
                                <div className="order-card-header">
                                    <div>
                                        <p style={{ fontSize: 13, color: '#878787' }}>Order ID</p>
                                        <p style={{ fontWeight: 600, fontSize: 14 }}>{order.order_number}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 13, color: '#878787' }}>Order Date</p>
                                        <p style={{ fontWeight: 500, fontSize: 14 }}>
                                            {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 13, color: '#878787' }}>Total</p>
                                        <p style={{ fontWeight: 600, fontSize: 14 }}>{formatPrice(order.total)}</p>
                                    </div>
                                    <span className="order-status-badge">{order.status}</span>
                                </div>

                                {order.items.map(item => (
                                    <div key={item.id} className="order-item-row">
                                        <img
                                            src={item.product_image}
                                            alt={item.product_name}
                                            onError={e => { e.target.src = 'https://via.placeholder.com/56'; }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: 14, fontWeight: 500 }}>{item.product_name}</p>
                                            <p style={{ fontSize: 13, color: '#878787' }}>Qty: {item.quantity} × {formatPrice(item.price_at_purchase)}</p>
                                        </div>
                                        <p style={{ fontWeight: 600, fontSize: 14 }}>{formatPrice(item.price_at_purchase * item.quantity)}</p>
                                    </div>
                                ))}

                                <div style={{ padding: '12px 20px', background: '#fff9f0', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, alignItems: 'center' }}>
                                    <span style={{ fontSize: 16 }}>📍</span>
                                    <p style={{ fontSize: 13, color: '#4d4d4d' }}>
                                        Delivered to: <strong>{address?.name}</strong>, {address?.city}, {address?.state} - {address?.pincode}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
