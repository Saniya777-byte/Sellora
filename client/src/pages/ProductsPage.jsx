import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import { Search, SlidersHorizontal, RefreshCw, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './ProductsPage.css';

const PAGE_SIZE = 20;

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'name',       label: 'Name A–Z' },
];

function applySort(items, sort) {
  const arr = [...items];
  switch (sort) {
    case 'price-asc':  return arr.sort((a, b) => a.price - b.price);
    case 'price-desc': return arr.sort((a, b) => b.price - a.price);
    case 'rating':     return arr.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    case 'name':       return arr.sort((a, b) => a.title.localeCompare(b.title));
    default:           return arr;
  }
}

function getCategories(products) {
  const cats = ['All', ...new Set((products || []).map((p) => p.category))];
  return cats;
}

function ProductsPage({ onNavigate, initialSearch = '' }) {
  const { products, loading, error, retry } = useProducts();
  const [search,   setSearch]   = useState(initialSearch);
  const [sort,     setSort]     = useState('default');
  const [category, setCategory] = useState('All');
  const [page,     setPage]     = useState(1);

  const categories = useMemo(() => getCategories(products), [products]);

  const filtered = useMemo(() => {
    let list = products;

    if (category !== 'All') {
      list = list.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q),
      );
    }

    return applySort(list, sort);
  }, [products, search, sort, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const start      = (safePage - 1) * PAGE_SIZE;
  const pageItems  = filtered.slice(start, start + PAGE_SIZE);

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSort = (val) => {
    setSort(val);
    setPage(1);
  };

  return (
    <main className="products-page page" id="main-content">
      <div className="container">
        {/* Header */}
        <div className="products-page__header section">
          <div>
            <p className="section-sub">Our Collection</p>
            <div className="section-divider" />
            <h1 className="section-heading">Fine Jewelry</h1>
          </div>
          <p className="products-page__count">
            {!loading && !error && `${filtered.length} piece${filtered.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Controls */}
        <div className="products-controls">
          <div className="products-search">
            <Search size={15} className="products-search__icon" />
            <input
              id="product-search"
              data-testid="product-search-input"
              type="search"
              className="products-search__input"
              placeholder="Search jewelry..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search products"
            />
            {search && (
              <button
                type="button"
                className="products-search__clear"
                onClick={() => handleSearch('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="products-sort">
            <SlidersHorizontal size={15} className="products-sort__icon" />
            <select
              id="sort-select"
              className="products-sort__select"
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        {!loading && !error && categories.length > 1 && (
          <div className="products-cats" role="tablist" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                id={`cat-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                data-testid={`category-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                aria-selected={category === cat}
                className={`tag ${category === cat ? 'active' : ''}`}
                onClick={() => handleCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Active search tag */}
        {search && !loading && (
          <div className="products-active-search">
            <span>Results for: <strong>&quot;{search}&quot;</strong></span>
            <button onClick={() => handleSearch('')} className="btn btn-ghost btn-sm" aria-label="Clear search filter">
              <X size={13} /> Clear
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="state-wrap" role="alert">
            <RefreshCw size={32} className="state-icon" />
            <h2 className="state-title">Something went wrong</h2>
            <p className="state-desc">{error}</p>
            <button id="retry-products-btn" className="btn btn-gold" onClick={retry}>
              Retry
            </button>
          </div>
        )}

        {/* Grid */}
        {!error && (
          <div className="product-grid products-page__grid">
            {loading
              ? Array.from({ length: PAGE_SIZE }).map((_, i) => <ProductCardSkeleton key={i} />)
              : pageItems.map((p) => (
                  <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
                ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="state-wrap">
            <Search size={32} className="state-icon" />
            <h2 className="state-title">No results found</h2>
            <p className="state-desc">
              We could not find anything matching &quot;{search}&quot;. Try a different term.
            </p>
            <button
              id="clear-search-btn"
              className="btn btn-outline"
              onClick={() => { handleSearch(''); handleCategory('All'); }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="products-pagination" role="navigation" aria-label="Page navigation">
            <button
              id="prev-page-btn"
              className="btn btn-outline btn-sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            <div className="products-pagination__pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  id={`page-btn-${n}`}
                  className={`products-pagination__num ${n === safePage ? 'active' : ''}`}
                  onClick={() => setPage(n)}
                  aria-label={`Page ${n}`}
                  aria-current={n === safePage ? 'page' : undefined}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              id="next-page-btn"
              className="btn btn-outline btn-sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              aria-label="Next page"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default ProductsPage;
