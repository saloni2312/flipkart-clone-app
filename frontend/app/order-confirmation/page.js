'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/lib/api';

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('orderNumber');
    const [order, setOrder] = useState(null);

    useEffect(() => {
        try {
            const data = JSON.parse(sessionStorage.getItem('last_order') || 'null');
            setOrder(data);
        } catch {
            setOrder(null);
        }
    }, []);

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    return (
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 40, maxWidth: 720, margin: '0 auto' }}>
            {/* Flipkart-style stepper - all complete */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 32, background: '#2874f0', padding: '16px 0', borderRadius: 4 }}>
                {['CART', 'ADDRESS', 'PAYMENT', 'CONFIRM'].map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fff', color: '#2874f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                                ✓
                            </div>
                            <span style={{ fontSize: 11, color: '#fff', fontWeight: i === 3 ? 700 : 400 }}>{step}</span>
                        </div>
                        {i < 3 && <div style={{ width: 60, height: 2, background: '#fff', margin: '0 8px' }} />}
                    </div>
                ))}
            </div>

            {/* Success Card */}
            <div style={{ background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '40px 32px', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 40 }}>
                    ✅
                </div>
                <h1 style={{ fontSize: 24, fontWeight: 600, color: '#212121', marginBottom: 8 }}>Order Placed Successfully!</h1>
                <p style={{ fontSize: 14, color: '#878787', marginBottom: 20 }}>
                    Your order has been placed and will be delivered by <strong style={{ color: '#388e3c' }}>{deliveryDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                </p>

                <div style={{ background: '#f1f3f6', borderRadius: 4, padding: '16px 24px', marginBottom: 20, textAlign: 'left' }}>
                    <p style={{ fontSize: 12, color: '#878787', marginBottom: 4 }}>ORDER NUMBER</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#2874f0', letterSpacing: 1 }}>{orderNumber || 'N/A'}</p>
                </div>

                {/* Order items */}
                {order && order.items && (
                    <div style={{ textAlign: 'left', marginBottom: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Items Ordered</h3>
                        {order.items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid #f1f3f6' }}>
                                <img src={item.image} alt={item.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 4, border: '1px solid #e0e0e0' }} onError={e => { e.target.src = 'https://via.placeholder.com/56'; }} />
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</p>
                                    <p style={{ fontSize: 12, color: '#878787' }}>Qty: {item.quantity}</p>
                                    <p style={{ fontSize: 14, fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, paddingTop: 12 }}>
                            <span>Total Paid</span>
                            <span style={{ color: '#2874f0' }}>{formatPrice(order.total)}</span>
                        </div>
                    </div>
                )}

                {/* Delivery address */}
                {order && order.address && (
                    <div style={{ textAlign: 'left', background: '#f1f3f6', borderRadius: 4, padding: '12px 16px', marginBottom: 24, fontSize: 13 }}>
                        <strong>📍 Delivering to:</strong> {order.address.name}, {order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}
                    </div>
                )}

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <Link href="/" className="btn btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '14px 32px' }}>
                        Continue Shopping
                    </Link>
                    <Link href="/orders" className="btn" style={{ display: 'inline-block', width: 'auto', padding: '14px 32px', background: '#fff', color: '#2874f0', border: '1px solid #2874f0' }}>
                        View Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<div className="page-container" style={{ padding: '40px 0', textAlign: 'center' }}>Loading...</div>}>
            <OrderConfirmationContent />
        </Suspense>
    );
}
