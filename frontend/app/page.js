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
            {/* Category Bar */}
            <div className="category-bar">
                <div className="category-bar-inner">
                    <button
                        className={`cat-item ${!category ? 'active' : ''}`}
                        onClick={() => setCategory('')}
                    >
                        <span className="cat-icon">🏬</span>
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`cat-item ${category === String(cat.id) ? 'active' : ''}`}
                            onClick={() => setCategory(cat.id)}
                        >
                            <span className="cat-icon">{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="page-container" style={{ paddingTop: '8px', paddingBottom: '24px' }}>
                {/* Results info */}
                <div className="results-info">
                    {search && <><span>"{search}"</span> — </>}
                    {activeCategory && <><span>{activeCategory.name}</span> — </>}
                    Showing <span>{total}</span> product{total !== 1 ? 's' : ''}
                </div>

                {/* Products */}
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
                ) : products.length === 0 ? (
                    <div className="empty-state" style={{ marginTop: '16px' }}>
                        <div className="empty-state-icon">🔍</div>
                        <h3>No products found</h3>
                        <p>Try a different search or category</p>
                        <button className="btn btn-primary" style={{ width: 'auto', padding: '10px 24px' }} onClick={() => router.push('/')}>
                            View All Products
                        </button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
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
