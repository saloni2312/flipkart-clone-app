'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchCart } from '@/lib/api';

export default function Navbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [cartCount, setCartCount] = useState(0);

    const loadCartCount = useCallback(async () => {
        try {
            const data = await fetchCart();
            setCartCount(data.items.reduce((s, i) => s + i.quantity, 0));
        } catch { setCartCount(0); }
    }, []);

    useEffect(() => {
        loadCartCount();
        const interval = setInterval(loadCartCount, 3000);
        return () => clearInterval(interval);
    }, [loadCartCount]);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        router.push(`/?${params.toString()}`);
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link href="/" className="navbar-logo">
                    <span>Flipkart</span>
                    <span className="tagline">Explore <span style={{ fontStyle: 'normal' }}>Plus</span> ✦</span>
                </Link>

                <form className="navbar-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button type="submit" className="navbar-search-btn">
                        🔍
                    </button>
                </form>

                <div className="navbar-actions">
                    <Link href="/orders" className="navbar-btn">
                        📦 Orders
                    </Link>
                    <Link href="/cart" className="navbar-btn">
                        <div className="cart-badge">
                            🛒
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </div>
                        Cart
                    </Link>
                </div>
            </div>
        </nav>
    );
}
