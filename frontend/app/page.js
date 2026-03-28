'use client';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchProducts, fetchCategories } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

function ProductListingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [prods, cats] = await Promise.all([
                fetchProducts({ search, category, limit: 40 }),
                fetchCategories(),
            ]);
            setProducts(prods.products);
            setTotal(prods.total);
            setCategories(cats);
        } catch (e) {
            console.error('API Error:', e);
            setError(e.message || 'Unknown network error');
            // Try fetching again after a delay (Railway cold start)
            setTimeout(async () => {
                if (products.length === 0) {
                    try {
                        const [prods, cats] = await Promise.all([
                            fetchProducts({ search, category, limit: 40 }),
                            fetchCategories(),
                        ]);
                        setProducts(prods.products);
                        setTotal(prods.total);
                        setCategories(cats);
                        setError(null);
                    } catch (e2) {
                        console.error('Retry also failed:', e2);
                    }
                }
            }, 5000);
        } finally {
            setLoading(false);
        }
    }, [search, category, products.length]);

    useEffect(() => { loadData(); }, [loadData]);

    const setCategory = (catId) => {
        const params = new URLSearchParams(searchParams.toString());
        if (catId) params.set('category', catId);
        else params.delete('category');
        router.push(`/?${params.toString()}`);
    };

    const activeCategory = categories.find(c => c.id === parseInt(category));

    return (
        <div>
            {/* High-Fidelity Category Bar */}
            <div className="category-bar">
                <div className="page-container" style={{ display: 'flex', justifyContent: 'center', gap: '8px', overflowX: 'auto' }}>
                    {categories.map(cat => {
                        const catClean = (cat.name || '').trim().toLowerCase();
                        const iconMap = {
                            'mobiles': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=128&h=128&fit=crop',
                            'fashion': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=128&h=128&fit=crop',
                            'electronics': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=128&h=128&fit=crop',
                            'home': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=128&h=128&fit=crop',
                            'appliances': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=128&h=128&fit=crop',
                            'beauty': 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=128&h=128&fit=crop',
                            'toys': 'https://images.unsplash.com/photo-1558229986-7a7dbece748a?w=128&h=128&fit=crop',
                            'furniture': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=128&h=128&fit=crop',
                            'sports': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=128&h=128&fit=crop',
                            'books': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=128&h=128&fit=crop',
                            'household': 'https://images.unsplash.com/photo-1550966842-8397089097e6?w=128&h=128&fit=crop',
                            'auto acc': 'https://images.unsplash.com/photo-159742324403d-81062f483c74?w=128&h=128&fit=crop'
                        };
                        const iconSrc = iconMap[catClean];

                        return (
                            <button
                                key={cat.id}
                                className={`cat-item ${category === String(cat.id) ? 'active' : ''}`}
                                onClick={() => setCategory(String(cat.id) === category ? '' : cat.id)}
                                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                            >
                                <div className="cat-icon-circle">
                                    {iconSrc ? (
                                        <img src={iconSrc} alt={cat.name} className="cat-icon-img" />
                                    ) : (
                                        <div className="cat-emoji">{cat.icon}</div>
                                    )}
                                </div>
                                <span className="cat-name">{cat.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="page-container" style={{ paddingBottom: '40px' }}>
                {/* 3-Column Banner Grid */}
                {!category && !search && (
                    <div className="home-banner-grid" style={{ marginTop: '16px' }}>
                        <div className="banner-item"><img src="/banner_jewellery.png" alt="Jewellery" /></div>
                        <div className="banner-item"><img src="/banner_polo.png" alt="Polo" /></div>
                        <div className="banner-item"><img src="/banner_trendy.png" alt="Trendy" /></div>
                    </div>
                )}

                {/* Dense Sub-Category Grid */}
                {!category && !search && (
                    <div className="subcat-grid">
                        {[
                            { label: 'Celeb Looks', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop' },
                            { label: 'Shirts, Tshirts', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&h=300&fit=crop' },
                            { label: 'Jeans', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop' },
                            { label: 'Sports Shoes', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop' },
                            { label: 'Watches', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop' },
                            { label: 'Kids Wear', img: 'https://images.unsplash.com/photo-1514090458221-65bb69af63e4?w=300&h=300&fit=crop' },
                            { label: 'Backpacks', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop' },
                            { label: 'Jewellery', img: 'https://images.unsplash.com/photo-1515562141207-7a88bb7ce338?w=300&h=300&fit=crop' },
                            { label: 'Sunglasses', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop' },
                            { label: 'Dresses', img: 'https://images.unsplash.com/photo-1581067723502-46602315712e?w=300&h=300&fit=crop' },
                        ].map((item, idx) => (
                            <div key={idx} className="subcat-tile">
                                <div className="subcat-icon-wrap">
                                    <img src={item.img} alt={item.label} loading="lazy" />
                                </div>
                                <span className="subcat-label">{item.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Shop for Loved Ones */}
                {!category && !search && (
                    <div className="lifestyle-section">
                        <div className="lifestyle-header">
                            <h2>Shop for loved ones</h2>
                        </div>
                        <div className="lifestyle-grid">
                            <div className="lifestyle-card"><img src="/lifestyle_men.png" alt="Men" /></div>
                            <div className="lifestyle-card"><img src="/lifestyle_women.png" alt="Women" /></div>
                            <div className="lifestyle-card"><img src="/lifestyle_spoyl.png" alt="Spoyl" /></div>
                        </div>
                    </div>
                )}

                {/* Error State - API Connection Issue */}
                {error && products.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff3e0', borderRadius: 8, marginTop: 24 }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>⏳</div>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e65100', marginBottom: 8 }}>Backend is waking up...</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>Our server is on a free tier and takes a few seconds to start. Products will appear shortly.</p>

                        <div style={{ margin: '16px auto', padding: '12px', background: '#f5f5f5', borderRadius: 4, maxWidth: 500, textAlign: 'left', fontSize: 11, fontFamily: 'monospace', color: '#666', border: '1px solid #ddd' }}>
                            <p style={{ fontWeight: 700, marginBottom: 4, color: '#333' }}>🔧 Debug Info:</p>
                            <p><strong>Error:</strong> {error}</p>
                            <p><strong>Target API:</strong> {require('@/lib/api').API_BASE}</p>
                            <p style={{ marginTop: 8, color: '#2874f0' }}>Tip: If Target API shows "localhost", Vercel hasn't redeployed your latest changes yet.</p>
                        </div>

                        <button className="btn btn-primary" style={{ width: 'auto', padding: '10px 24px' }} onClick={loadData}>
                            🔄 Retry Now
                        </button>
                    </div>
                )}

                {/* Loading Skeleton */}
                {loading && (
                    <div className="products-grid" style={{ marginTop: 24 }}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} style={{ background: 'white', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div className="skeleton" style={{ width: '100%', aspectRatio: '1' }} />
                                <div className="skeleton" style={{ height: '16px', width: '80%' }} />
                                <div className="skeleton" style={{ height: '16px', width: '60%' }} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Search/Category Results */}
                {!loading && (search || category) && products.length > 0 && (
                    <>
                        <div className="results-info">
                            {search && <><span>"{search}"</span> — </>}
                            {activeCategory && <><span>{activeCategory.name}</span> — </>}
                            Showing <span>{total}</span> product{total !== 1 ? 's' : ''}
                        </div>
                        <div className="products-grid">
                            {products.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </>
                )}

                {/* Home Page Product Sections */}
                {!loading && !search && !category && products.length > 0 && (
                    <>
                        {/* Spotlight */}
                        <div className="spotlight-section">
                            <div className="spotlight-header">
                                <h2>Spotlight's On</h2>
                                <p>Top picks for you today</p>
                            </div>
                            <div className="products-grid" style={{ flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '10px' }}>
                                {products.slice(0, 10).map(p => <ProductCard key={p.id} product={p} />)}
                            </div>
                        </div>

                        {/* Brands in Spotlight */}
                        <div className="branded-spotlight">
                            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Brands in Spotlight</h2>
                            <div className="branded-spotlight-grid">
                                <div className="brand-ad-card">
                                    <img src="/nb_shoes_ad.png" alt="NB Shoes" />
                                    <div className="brand-ad-info">
                                        <p className="offer">Min 45% Off</p>
                                        <p className="desc">Stability and comfort</p>
                                    </div>
                                </div>
                                <div className="brand-ad-card">
                                    <img src="/campus_shoes_ad.png" alt="Campus Shoes" />
                                    <div className="brand-ad-info">
                                        <p className="offer">Min 50% Off</p>
                                        <p className="desc">Trendy sneakers</p>
                                    </div>
                                </div>
                                <div className="brand-ad-card">
                                    <img src="/reebok_shoes_ad.png" alt="Reebok Shoes" />
                                    <div className="brand-ad-info">
                                        <p className="offer">Min 50% Off</p>
                                        <p className="desc">Official gym shoes</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Category Sections */}
                        {categories.map(cat => {
                            const catProducts = products.filter(p => p.category_id === cat.id).slice(0, 8);
                            if (catProducts.length === 0) return null;

                            if (cat.id === 4) {
                                return (
                                    <div key={cat.id} className="themed-section purple">
                                        <div className="themed-section-header">
                                            <h2>Home Decor & Furnishing</h2>
                                            <button className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '12px' }} onClick={() => setCategory(cat.id)}>→</button>
                                        </div>
                                        <div className="themed-scroll-row">
                                            {catProducts.map(p => (
                                                <a href={`/product/${p.id}`} key={p.id} className="themed-product-tile">
                                                    <img src={Array.isArray(p.images) ? p.images[0] : JSON.parse(p.images || '[]')[0]} alt={p.name} />
                                                    <p>{p.name.split(' ').slice(0, 3).join(' ')}</p>
                                                    <p className="offer">Special offer</p>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={cat.id} className="product-section" style={{ marginTop: '24px' }}>
                                    <div className="section-header">
                                        <h2>{cat.name}</h2>
                                        <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 20px', borderRadius: '4px' }} onClick={() => setCategory(cat.id)}>
                                            View All
                                        </button>
                                    </div>
                                    <div className="products-grid" style={{ background: 'white', padding: '16px', borderRadius: '0 0 12px 12px', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                        {catProducts.map(p => <ProductCard key={p.id} product={p} />)}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}

export default function HomePage() {
    return (
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
            <ProductListingContent />
        </Suspense>
    );
}
