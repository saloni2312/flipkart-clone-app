'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser, logout } from '@/lib/api';
import { getCartCount } from '@/lib/cartStore';
import LoginModal from './LoginModal';

export default function Navbar() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const loadData = useCallback(() => {
        setCartCount(getCartCount());
        setUser(getCurrentUser());
    }, []);

    useEffect(() => {
        loadData();
        window.addEventListener('cart-updated', loadData);
        window.addEventListener('user-updated', loadData);
        return () => {
            window.removeEventListener('cart-updated', loadData);
            window.removeEventListener('user-updated', loadData);
        };
    }, [loadData]);

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <header>
            <div className="header-top">
                <div className="pill-container">
                    <button className="pill pill-fk">
                        <span>🛒</span> Flipkart
                    </button>
                    <button className="pill pill-travel">
                        <span>✈️</span> Travel
                    </button>
                </div>
                <div className="location-selector">
                    📍 Location not set <span style={{ color: '#2874f0', fontWeight: '600', cursor: 'pointer', marginLeft: '4px' }}>Select delivery location &gt;</span>
                </div>
            </div>

            <nav className="navbar">
                <div className="navbar-inner">
                    <Link href="/" className="navbar-logo-new">
                        <img
                            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-444a75.svg"
                            alt="Flipkart"
                            style={{ height: '40px' }}
                        />
                    </Link>

                    <form className="navbar-search" action="/">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search for Products, Brands and More"
                            defaultValue={search}
                        />
                    </form>

                    <div className="navbar-actions">
                        {user ? (
                            <div className="nav-item user-dropdown-container" style={{ position: 'relative' }}>
                                <span style={{ background: '#2874f0', color: 'white', padding: '6px 16px', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}>
                                    {user.name.split(' ')[0]} ⌵
                                </span>
                                <div className="user-dropdown">
                                    <Link href="/orders">Orders</Link>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        ) : (
                            <div className="nav-item">
                                <span
                                    onClick={() => setIsLoginModalOpen(true)}
                                    style={{ background: '#2874f0', color: 'white', padding: '6px 16px', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Login
                                </span>
                            </div>
                        )}

                        <Link href="/cart" className="nav-item" style={{ position: 'relative' }}>
                            <span>🛒</span> Cart
                            {cartCount > 0 && (
                                <span style={{ position: 'absolute', top: '0', right: '-4px', background: '#ff6161', color: 'white', fontSize: '10px', padding: '0 4px', borderRadius: '10px', fontWeight: 'bold' }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <div className="nav-item">
                            <span>┇</span> More ⌵
                        </div>
                    </div>
                </div>
            </nav>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </header>
    );
}
