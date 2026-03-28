'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchCart, placeOrder, formatPrice } from '@/lib/api';

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal',
];

const EMPTY_FORM = { name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '' };

export default function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [placing, setPlacing] = useState(false);
    const [orderError, setOrderError] = useState('');

    useEffect(() => { fetchCart().then(setCart).catch(console.error); }, []);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter valid 10-digit Indian mobile number';
        if (!form.address.trim()) e.address = 'Address is required';
        if (!form.city.trim()) e.city = 'City is required';
        if (!form.state) e.state = 'State is required';
        if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter valid 6-digit pincode';
        return e;
    };

    const handleChange = (field, value) => {
        setForm(f => ({ ...f, [field]: value }));
        if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n; });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setPlacing(true);
        setOrderError('');
        try {
            const result = await placeOrder(form);
            router.push(`/order-confirmation?orderId=${result.orderId}&orderNumber=${result.orderNumber}`);
        } catch (err) {
            setOrderError(err.message);
            setPlacing(false);
        }
    };

    if (!cart) return <div className="page-container" style={{ padding: '40px 0', textAlign: 'center' }}>Loading...</div>;

    if (cart.items.length === 0) return (
        <div className="page-container" style={{ paddingTop: 24 }}>
            <div className="empty-state">
                <div className="empty-state-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <Link href="/" className="btn btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '12px 32px' }}>Shop Now</Link>
            </div>
        </div>
    );

    return (
        <div className="page-container" style={{ paddingTop: 16, paddingBottom: 32 }}>
            <div className="breadcrumb">
                <Link href="/">Home</Link> › <Link href="/cart">Cart</Link> › <span style={{ color: '#212121' }}>Checkout</span>
            </div>

            <div className="checkout-layout">
                {/* Address Form */}
                <form className="checkout-form-card" onSubmit={handleSubmit} noValidate>
                    <h2>📍 Delivery Address</h2>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={form.name}
                                className={errors.name ? 'error' : ''}
                                onChange={e => handleChange('name', e.target.value)}
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Mobile Number *</label>
                            <input
                                type="tel"
                                placeholder="10-digit mobile number"
                                value={form.phone}
                                className={errors.phone ? 'error' : ''}
                                onChange={e => handleChange('phone', e.target.value)}
                                maxLength={10}
                            />
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email (optional)</label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={e => handleChange('email', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Pincode *</label>
                            <input
                                type="text"
                                placeholder="6-digit pincode"
                                value={form.pincode}
                                className={errors.pincode ? 'error' : ''}
                                onChange={e => handleChange('pincode', e.target.value)}
                                maxLength={6}
                            />
                            {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                        </div>

                        <div className="form-group full">
                            <label>Address (House No, Building, Street, Area) *</label>
                            <input
                                type="text"
                                placeholder="Enter your full address"
                                value={form.address}
                                className={errors.address ? 'error' : ''}
                                onChange={e => handleChange('address', e.target.value)}
                            />
                            {errors.address && <span className="error-text">{errors.address}</span>}
                        </div>

                        <div className="form-group">
                            <label>City / Town *</label>
                            <input
                                type="text"
                                placeholder="City"
                                value={form.city}
                                className={errors.city ? 'error' : ''}
                                onChange={e => handleChange('city', e.target.value)}
                            />
                            {errors.city && <span className="error-text">{errors.city}</span>}
                        </div>

                        <div className="form-group">
                            <label>State *</label>
                            <select
                                value={form.state}
                                className={errors.state ? 'error' : ''}
                                onChange={e => handleChange('state', e.target.value)}
                            >
                                <option value="">Select State</option>
                                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.state && <span className="error-text">{errors.state}</span>}
                        </div>
                    </div>

                    {orderError && (
                        <div style={{ background: '#fff3f3', border: '1px solid #ff6161', borderRadius: 4, padding: '12px 16px', marginTop: 16, color: '#c0392b', fontSize: 14 }}>
                            ❌ {orderError}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="btn btn-buy-now" style={{ width: '100%', fontSize: 16, padding: '14px' }} disabled={placing}>
                            {placing ? '⏳ Placing Order...' : '🛒 Confirm Order'}
                        </button>
                    </div>
                </form>

                {/* Order Summary */}
                <div>
                    <div className="price-summary">
                        <div className="price-summary-header">Order Summary</div>
                        <div className="price-summary-body">
                            {cart.items.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: 10, paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid #f1f3f6' }}>
                                    <img
                                        src={item.images?.[0]}
                                        alt={item.name}
                                        style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 2, border: '1px solid #e0e0e0' }}
                                        onError={e => { e.target.src = 'https://via.placeholder.com/48'; }}
                                    />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: 13, lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.name}</p>
                                        <p style={{ fontSize: 12, color: '#878787', marginTop: 2 }}>Qty: {item.quantity}</p>
                                        <p style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="price-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(cart.subtotal + cart.discount)}</span>
                            </div>
                            {cart.discount > 0 && (
                                <div className="price-row savings">
                                    <span>Discount</span>
                                    <span>− {formatPrice(cart.discount)}</span>
                                </div>
                            )}
                            <div className="price-row">
                                <span>Delivery</span>
                                <span style={{ color: '#388e3c' }}>{cart.delivery === 0 ? 'FREE' : formatPrice(cart.delivery)}</span>
                            </div>
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
