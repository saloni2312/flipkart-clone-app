'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCart } from '@/lib/api';

export default function Navbar() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';
    const [cartCount, setCartCount] = useState(0);

    const loadCartCount = async () => {
        try {
            const cart = await getCart();
            setCartCount(cart.length);
        } catch (error) {
            console.error('Error loading cart count:', error);
        }
    };

    useEffect(() => {
        loadCartCount();
        const interval = setInterval(loadCartCount, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header>
            {/* Top Bar with Pills */}
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

            {/* Main Navbar */}
            <nav className="navbar">
                <div className="navbar-inner">
                    {/* Logo */}
                    <Link href="/" className="navbar-logo-new">
                        <img
                            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-444a75.svg"
                            alt="Flipkart"
                            style={{ height: '40px' }}
                        />
                    </Link>

                    {/* Search */}
                    <form className="navbar-search" action="/">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search for Products, Brands and More"
                            defaultValue={search}
                        />
                    </form>

                    {/* Actions */}
                    <div className="navbar-actions">
                        <div className="nav-item">
                            <span style={{ background: '#2874f0', color: 'white', padding: '6px 16px', borderRadius: '4px', fontWeight: '600' }}>Login ⌵</span>
                        </div>
                        <Link href="/cart" className="nav-item" style={{ position: 'relative' }}>
                            <span>🛒</span> Cart
                            {cartCount > 0 && (
                                <span style={{ position: 'absolute', top: '0', right: '-4px', background: '#ff6161', color: 'white', fontSize: '10px', padding: '0 4px', borderRadius: '10px' }}>
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
        </header>
    );
}
