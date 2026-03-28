'use client';
import { useState } from 'react';
import { login, register } from '@/lib/api';

export default function LoginModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await register(formData.name, formData.email, formData.password);
            }
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="login-modal" onClick={e => e.stopPropagation()}>
                <div className="login-modal-left">
                    <h2>{isLogin ? 'Login' : 'Signup'}</h2>
                    <p>{isLogin ? 'Get access to your Orders, Wishlist and Recommendations' : 'We recommend you to sign up to get started!'}</p>
                    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/login_img_c4a81e.png" alt="login-illustration" />
                </div>
                <div className="login-modal-right">
                    <button className="modal-close" onClick={onClose}>✕</button>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Enter Email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Enter Password"
                                required
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {error && <p className="login-error">{error}</p>}

                        <p className="login-terms">
                            By continuing, you agree to Flipkart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                        </p>

                        <button type="submit" className="btn btn-login-submit" disabled={loading}>
                            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Signup')}
                        </button>

                        <button
                            type="button"
                            className="btn-toggle-auth"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'New to Flipkart? Create an account' : 'Existing User? Log in'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
