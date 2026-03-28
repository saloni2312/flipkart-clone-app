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

    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const [prods, cats] = await Promise.all([
                fetchProducts({ search, category, limit: 40 }),
                fetchCategories(),
            ]);
            setProducts(prods.products);
            setTotal(prods.total);
            setCategories(cats);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [search, category]);

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
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`cat-item ${category === String(cat.id) ? 'active' : ''}`}
                            onClick={() => setCategory(String(cat.id) === category ? '' : cat.id)}
                            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                        >
                            <div className="cat-icon-circle">{cat.icon}</div>
                            <span className="cat-name">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="page-container" style={{ paddingBottom: '40px' }}>
                {/* 3-Column Banner Grid */}
                {!category && !search && (
                    <div className="home-banner-grid">
                        <div className="banner-item"><img src="/banner_fridge.png" alt="Fridge Sale" /></div>
                        <div className="banner-item"><img src="/banner_aqua.png" alt="Aqua Sale" /></div>
                        <div className="banner-item"><img src="/banner_daikin.png" alt="AC Sale" /></div>
                    </div>
                )}

                {/* Hot Pick Section */}
                {!category && !search && (
                    <div className="hot-pick-section">
                        <p style={{ textAlign: 'left', fontSize: '12px', color: '#878787', marginBottom: '8px', fontWeight: '600' }}>Today's Hot Pick</p>
                        <div className="hot-pick-banner">
                            <img src="/banner_nothing.png" alt="Nothing Phone 2a" />
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="products-grid">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} style={{ background: 'white', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div className="skeleton" style={{ width: '100%', aspectRatio: '1' }} />
                                <div className="skeleton" style={{ height: '16px', width: '80%' }} />
                                <div className="skeleton" style={{ height: '16px', width: '60%' }} />
                            </div>
                        ))}
                    </div>
                ) : (search || category) ? (
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
                ) : (
                    <>
                        {/* Spotlight Section (Red) */}
                        <div className="spotlight-section">
                            <div className="spotlight-header">
                                <h2>Spotlight's On</h2>
                                <p>Top picks for you today</p>
                            </div>
                            <div className="products-grid">
                                {products.slice(0, 10).map(p => <ProductCard key={p.id} product={p} />)}
                            </div>
                        </div>

                        {/* Standard Sections */}
                        {categories.map(cat => {
                            const catProducts = products.filter(p => p.category_id === cat.id).slice(0, 4);
                            if (catProducts.length === 0) return null;
                            return (
                                <div key={cat.id} className="product-section" style={{ marginTop: '24px' }}>
                                    <div className="section-header">
                                        <h2>{cat.name}</h2>
                                        <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 20px', borderRadius: '4px' }} onClick={() => setCategory(cat.id)}>
                                            View All
                                        </button>
                                    </div>
                                    <div className="products-grid" style={{ background: 'white', padding: '16px', borderRadius: '0 0 12px 12px' }}>
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
