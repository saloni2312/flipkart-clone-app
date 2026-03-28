'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/api';
import { getCartSummary, clearCart } from '@/lib/cartStore';

export default function PaymentPage() {
    const router = useRouter();
    const [cart, setCart] = useState(null);
    const [address, setAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [upiId, setUpiId] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [cardName, setCardName] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const summary = getCartSummary();
        setCart(summary);
        try {
            const addr = JSON.parse(sessionStorage.getItem('checkout_address') || 'null');
            setAddress(addr);
            if (!addr) router.push('/checkout');
        } catch {
            router.push('/checkout');
        }
    }, [router]);

    const handlePay = () => {
        setProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            const orderNumber = 'FK' + Date.now() + Math.floor(Math.random() * 9000 + 1000);
            clearCart();
            sessionStorage.setItem('last_order', JSON.stringify({
                orderNumber,
                items: cart.items,
                total: cart.total,
                discount: cart.discount,
                address,
                paymentMethod,
                date: new Date().toISOString(),
            }));
            router.push(`/order-confirmation?orderNumber=${orderNumber}`);
        }, 2000);
    };

    if (!cart || !address) return <div className="page-container" style={{ padding: '40px 0', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="page-container" style={{ paddingTop: 16, paddingBottom: 32 }}>
            {/* Flipkart-style stepper */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 24, background: '#2874f0', padding: '16px 0', borderRadius: 4 }}>
                {['CART', 'ADDRESS', 'PAYMENT', 'CONFIRM'].map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: i <= 2 ? '#fff' : 'rgba(255,255,255,0.3)', color: i <= 2 ? '#2874f0' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                                {i < 2 ? '✓' : i + 1}
                            </div>
                            <span style={{ fontSize: 11, color: '#fff', fontWeight: i === 2 ? 700 : 400 }}>{step}</span>
                        </div>
                        {i < 3 && <div style={{ width: 60, height: 2, background: i < 2 ? '#fff' : 'rgba(255,255,255,0.3)', margin: '0 8px' }} />}
                    </div>
                ))}
            </div>

            <div className="checkout-layout">
                {/* Payment Methods */}
                <div className="checkout-form-card">
                    <h2>💳 Payment Options</h2>

                    {/* Delivery Address Summary */}
                    <div style={{ background: '#f1f3f6', borderRadius: 4, padding: '12px 16px', marginBottom: 20, fontSize: 13 }}>
                        <strong>Delivering to:</strong> {address.name}, {address.address}, {address.city}, {address.state} - {address.pincode}
                        <br /><span style={{ color: '#878787' }}>📞 {address.phone}</span>
                    </div>

                    {/* Payment Method Tabs */}
                    <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #e0e0e0', marginBottom: 24 }}>
                        {[
                            { key: 'upi', label: '📱 UPI' },
                            { key: 'card', label: '💳 Credit/Debit Card' },
                            { key: 'netbanking', label: '🏦 Net Banking' },
                            { key: 'cod', label: '💵 Cash on Delivery' },
                        ].map(m => (
                            <button
                                key={m.key}
                                onClick={() => setPaymentMethod(m.key)}
                                style={{
                                    padding: '12px 20px',
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    fontWeight: paymentMethod === m.key ? 700 : 400,
                                    color: paymentMethod === m.key ? '#2874f0' : '#878787',
                                    borderBottom: paymentMethod === m.key ? '3px solid #2874f0' : '3px solid transparent',
                                    fontSize: 13,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>

                    {/* UPI */}
                    {paymentMethod === 'upi' && (
                        <div>
                            <p style={{ fontSize: 14, color: '#212121', marginBottom: 12 }}>Pay using UPI ID</p>
                            <div className="form-group">
                                <label>Enter UPI ID</label>
                                <input
                                    type="text"
                                    placeholder="example@upi"
                                    value={upiId}
                                    onChange={e => setUpiId(e.target.value)}
                                    style={{ maxWidth: 340 }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                                {['Google Pay', 'PhonePe', 'Paytm'].map(app => (
                                    <div key={app} style={{ padding: '10px 20px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
                                        {app}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Card */}
                    {paymentMethod === 'card' && (
                        <div>
                            <div className="form-grid">
                                <div className="form-group full">
                                    <label>Card Number</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(e.target.value)} maxLength={19} />
                                </div>
                                <div className="form-group">
                                    <label>Name on Card</label>
                                    <input type="text" placeholder="Cardholder Name" value={cardName} onChange={e => setCardName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Expiry (MM/YY)</label>
                                    <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} maxLength={5} />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input type="password" placeholder="•••" value={cardCvv} onChange={e => setCardCvv(e.target.value)} maxLength={4} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Net Banking */}
                    {paymentMethod === 'netbanking' && (
                        <div>
                            <p style={{ fontSize: 14, color: '#212121', marginBottom: 12 }}>Popular Banks</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                                {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Yes Bank'].map(bank => (
                                    <label key={bank} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', border: '1px solid #e0e0e0', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>
                                        <input type="radio" name="bank" value={bank} />
                                        {bank}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* COD */}
                    {paymentMethod === 'cod' && (
                        <div style={{ padding: '16px', background: '#fff8e1', borderRadius: 4, border: '1px solid #ffe082' }}>
                            <p style={{ fontSize: 14, fontWeight: 500 }}>💵 Cash on Delivery</p>
                            <p style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Pay when your order is delivered. An additional fee of ₹10 may apply.</p>
                        </div>
                    )}

                    {/* Pay Button */}
                    <div className="form-actions" style={{ marginTop: 24 }}>
                        <button
                            className="btn btn-buy-now"
                            style={{ width: '100%', fontSize: 16, padding: '16px' }}
                            onClick={handlePay}
                            disabled={processing}
                        >
                            {processing ? '⏳ Processing Payment...' : `💰 Pay ${formatPrice(cart.total)}`}
                        </button>
                    </div>

                    <p style={{ textAlign: 'center', fontSize: 11, color: '#878787', marginTop: 12 }}>
                        🔒 Your payment is 100% secure. Powered by Flipkart Payments.
                    </p>
                </div>

                {/* Order Summary Sidebar */}
                <div>
                    <div className="price-summary">
                        <div className="price-summary-header">Order Summary</div>
                        <div className="price-summary-body">
                            {cart.items.map(item => (
                                <div key={item.productId} style={{ display: 'flex', gap: 10, paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid #f1f3f6' }}>
                                    <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 2, border: '1px solid #e0e0e0' }} onError={e => { e.target.src = 'https://via.placeholder.com/48'; }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: 13, lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.name}</p>
                                        <p style={{ fontSize: 12, color: '#878787', marginTop: 2 }}>Qty: {item.quantity}</p>
                                        <p style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="price-row total">
                                <span>Total</span>
                                <span>{formatPrice(cart.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
