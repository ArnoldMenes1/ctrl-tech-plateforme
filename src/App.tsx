import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowDownUp, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight, CircleHelp, CreditCard, Filter, GitCompareArrows, Headphones, Laptop, MapPin, Menu, Minus, Plus, Search, ShieldCheck, ShoppingBag, Smartphone, Tablet, Truck, X } from 'lucide-react';
import { authClient } from './lib/auth';
import { categories, formatPrice, products, type Product } from './catalog';

type CartLine = { product: Product; quantity: number };
const categoryIcons = { Smartphones: Smartphone, Ordinateurs: Laptop, Tablettes: Tablet, Accessoires: Headphones };

function readCart(): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem('ctrl-tech-cart') || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.map((entry: unknown): CartLine | null => {
      if (typeof entry !== 'object' || entry === null) return null;
      const value = entry as Record<string, unknown>;
      const nestedProduct = value.product;
      if (typeof nestedProduct === 'object' && nestedProduct !== null && typeof (nestedProduct as Record<string, unknown>).id === 'string' && typeof value.quantity === 'number') {
        return { product: nestedProduct as Product, quantity: value.quantity };
      }
      if (typeof value.id === 'string') return { product: value as unknown as Product, quantity: 1 };
      return null;
    }).filter((line): line is CartLine => line !== null);
  } catch { return []; }
}

function Header({ count, compareCount, compareNotice }: { count: number; compareCount: number; compareNotice: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const submitSearch = (event: FormEvent) => { event.preventDefault(); navigate(`/catalogue?q=${encodeURIComponent(search)}`); setSearchOpen(false); setMobileOpen(false); };
  return <>
    <div className="utility-bar"><div className="container utility-inner"><span>CTRL-TECH <i/> LUBUMBASHI, RDC</span><span>Catalogue 2026 <b>·</b> Prix indicatifs en USD</span></div></div>
    <header className="site-header"><div className="container nav-shell">
      <Link to="/" className="brand" aria-label="CTRL-TECH, accueil"><img src="/brand/logo-full.png" alt="CTRL-TECH — Precision in Technology"/></Link>
      <nav className={mobileOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Navigation principale">
        <Link to="/catalogue" onClick={() => setMobileOpen(false)}>Catalogue</Link><Link to="/categories/smartphones" onClick={() => setMobileOpen(false)}>Smartphones</Link><Link to="/categories/ordinateurs" onClick={() => setMobileOpen(false)}>Ordinateurs</Link><Link to="/categories/tablettes" onClick={() => setMobileOpen(false)}>Tablettes</Link><Link to="/categories/accessoires" onClick={() => setMobileOpen(false)}>Accessoires</Link><Link to="/marques" onClick={() => setMobileOpen(false)}>Marques</Link><a href="/#magasin" onClick={() => setMobileOpen(false)}>Le magasin</a>
      </nav>
      <div className="nav-tools"><button className="icon-button" aria-label="Ouvrir la recherche" onClick={() => setSearchOpen(!searchOpen)}><Search size={19}/></button><Link to="/comparateur" className="icon-button compare-trigger" aria-label={`Comparateur, ${compareCount} produits`}><GitCompareArrows size={18}/>{compareCount > 0 && <span>{compareCount}</span>}</Link><Link to="/panier" className="icon-button cart-trigger" aria-label={`Panier, ${count} articles`}><ShoppingBag size={19}/><span>{count}</span></Link>
        <Link to="/compte" className="account-link">Compte</Link>
        <button className="mobile-toggle" aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</button>
      </div></div>
      {compareNotice && <div className="compare-feedback" role="status" aria-live="polite">{compareNotice}</div>}{searchOpen && <div className="search-panel"><form className="container search-form" onSubmit={submitSearch}><Search size={19}/><input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un appareil, une marque…"/><button className="button button-dark" type="submit">Rechercher</button><button className="icon-button" type="button" aria-label="Fermer" onClick={() => setSearchOpen(false)}><X/></button></form></div>}
    </header>
  </>;
}

function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link>{items.map((item, i) => <span key={i} className="crumb"><ChevronRight size={13}/>{item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}
function Eyebrow({ children }: { children: ReactNode }) { return <div className="eyebrow"><span/>{children}</div>; }

function ProductCard({ product, onAdd, onCompare }: { product: Product; onAdd: (p: Product) => void; onCompare: (p: Product) => void }) {
  return <article className="product-card"><Link to={`/produit/${product.id}`} className="product-media"><img src={product.image} alt={product.name} loading="lazy"/>{product.featured && <span className="product-ribbon">Sélection CTRL-TECH</span>}<span className="media-open"><ArrowUpRight size={17}/></span></Link>
    <div className="product-card-body"><div className="product-overline"><span>{product.brand}</span><span>{product.category}</span></div><div className="product-availability">Disponibilité à confirmer</div><Link to={`/produit/${product.id}`} className="product-name">{product.name}</Link><p className="product-spec">{product.specs.slice(0, 2).join(' · ') || 'Configuration à confirmer'}</p><div className="product-card-bottom"><div><strong>{formatPrice(product.price)}</strong><small>Prix indicatif</small></div><button className="compare-icon" onClick={() => onCompare(product)} aria-label={`Comparer ${product.name}`}><GitCompareArrows size={15}/></button><button className="add-icon" onClick={() => onAdd(product)} aria-label={`Ajouter ${product.name} au panier`}><Plus size={18}/></button></div></div>
  </article>;
}

function Home({ onAdd, onCompare }: { onAdd: (p: Product) => void; onCompare: (p: Product) => void }) {
  const featured = products.filter(p => p.featured).slice(0, 4);
  return <main>
    <section className="home-hero"><div className="container hero-layout"><div className="hero-content"><Eyebrow>Precision in technology · Lubumbashi</Eyebrow><h1>La technologie<br/>qui accompagne<br/><em>vos ambitions.</em></h1><p className="hero-intro">Découvrez une sélection d’appareils électroniques conçus pour travailler, créer et aller plus loin.</p><div className="hero-actions"><Link to="/catalogue" className="button button-signal">Explorer le catalogue <ArrowUpRight size={17}/></Link><Link to="/marques" className="text-action">Découvrir nos marques <ArrowRight size={16}/></Link></div><div className="hero-footnote"><span>01 / 04</span><span>Performance · Fiabilité · Sélection</span></div></div>
      <div className="hero-art"><div className="hero-art-caption"><span>ÉDITION 2026</span><span>COLLECTION TECHNOLOGIE</span></div><div className="hero-image-main"><img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1100&q=90" alt="Smartphone, visuel d’ambiance illustratif"/></div><div className="hero-image-note"><span className="note-index">A.</span><span><b>Choisir mieux.</b><small>Les bons outils, au bon moment.</small></span><ArrowUpRight size={18}/></div><div className="hero-orbit orbit-a"/><div className="hero-orbit orbit-b"/></div></div>
      <div className="container hero-bottomline"><span>UNE TECHNOLOGIE SÉLECTIONNÉE</span><div><span>APPLE</span><span>SAMSUNG</span><span>ASUS</span><span>LENOVO</span><span>DELL</span></div></div>
    </section>
    <div className="reassurance-band"><div className="container"><span><ShieldCheck size={17}/> Sélection technologique exigeante</span><span><MapPin size={17}/> Avenue Maniema, Lubumbashi</span><span><Check size={17}/> Prix indicatifs en USD</span></div></div>
    <section className="section-block container" id="univers"><div className="section-intro"><div><Eyebrow>Explorez nos univers</Eyebrow><h2>Un écosystème<br/><em>à votre mesure.</em></h2></div><p>Du smartphone à l’ordinateur professionnel, retrouvez les catégories qui composent notre sélection.</p></div>
      <div className="category-editorial-grid">{categories.map((cat, index) => { const Icon = categoryIcons[cat.name as keyof typeof categoryIcons] || Smartphone; return <Link to={`/categories/${cat.name.toLowerCase()}`} className={`category-editorial category-${index + 1}`} key={cat.name}><img src={cat.image} alt="" loading="lazy"/><span className="category-shade"/><span className="category-number">0{index + 1} / UNIVERS</span><span className="category-icon"><Icon size={19}/></span><span className="category-copy"><b>{cat.name}</b><small>{cat.count}</small></span><ArrowUpRight className="category-link" size={20}/></Link>; })}</div>
    </section>
    <section className="featured-band"><div className="container"><div className="section-intro section-intro-light"><div><Eyebrow>La sélection CTRL-TECH</Eyebrow><h2>Les essentiels<br/><em>du moment.</em></h2></div><Link to="/catalogue" className="text-action light-action">Tout le catalogue <ArrowRight size={16}/></Link></div><div className="product-grid featured-grid">{featured.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onCompare={onCompare}/>)}</div></div></section>
    <section className="brand-focus container"><div className="brand-focus-heading"><Eyebrow>Les marques à découvrir</Eyebrow><h2>Les grandes signatures<br/><em>de la technologie.</em></h2><Link to="/marques" className="text-action">Toutes les marques <ArrowRight size={16}/></Link></div><div className="brand-focus-list">{['Apple','Samsung','ASUS','Lenovo','Dell','HP'].map(name => <Link to={`/marques/${name.toLowerCase()}`} key={name}>{name}<ArrowUpRight size={15}/></Link>)}</div></section>
    <section className="home-curated container"><div className="section-intro"><div><Eyebrow>Références du catalogue 2026</Eyebrow><h2>Les nouveautés <em>à découvrir.</em></h2></div><Link to="/catalogue" className="text-action">Voir tous les produits <ArrowRight size={16}/></Link></div><div className="product-grid">{products.filter(p => ['iphone-17-pro','galaxy-s25-ultra','macbook-pro-14-m4-pro','galaxy-tab-s10-ultra'].includes(p.id)).map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onCompare={onCompare}/>)}</div></section>
    <section className="pro-band"><div className="container pro-band-inner"><div><Eyebrow>Pour les professionnels</Eyebrow><h2>La performance<br/><em>au quotidien.</em></h2><p>Ordinateurs, outils de productivité et configurations adaptées aux usages exigeants.</p><Link to="/categories/ordinateurs" className="button button-signal">Explorer les ordinateurs <ArrowUpRight size={16}/></Link></div><div className="pro-band-image"><img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85" alt="Ordinateur portable, visuel d’ambiance" loading="lazy"/></div></div></section>
    <section className="home-curated container"><div className="section-intro"><div><Eyebrow>Les compléments utiles</Eyebrow><h2>Accessoires <em>et essentiels.</em></h2></div><Link to="/categories/accessoires" className="text-action">Voir les accessoires <ArrowRight size={16}/></Link></div><div className="product-grid">{products.filter(p => p.category === 'Accessoires').slice(0,4).map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onCompare={onCompare}/>)}</div></section>
    <section className="editorial-panel container"><div className="editorial-image"><img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85" alt="Ordinateur portable, visuel d’ambiance" loading="lazy"/><span>CTRL-TECH / 2026</span></div><div className="editorial-copy"><Eyebrow>Le choix de la performance</Eyebrow><h2>Des outils fiables.<br/><em>Des possibilités sans limite.</em></h2><p>Pour étudier, créer, entreprendre ou travailler, découvrez des appareils sélectionnés pour leurs performances et leur qualité.</p><Link to="/catalogue?category=Ordinateurs" className="button button-dark">Explorer les ordinateurs <ArrowUpRight size={17}/></Link></div></section>
    <section className="trust-section container" id="magasin"><div className="trust-heading"><Eyebrow>CTRL-TECH à Lubumbashi</Eyebrow><h2>La technologie,<br/><em>avec le bon conseil.</em></h2></div><div className="trust-items"><div><MapPin/><span><b>Un magasin à Lubumbashi</b><small>Avenue Maniema, République démocratique du Congo</small></span></div><div><ShieldCheck/><span><b>Une sélection exigeante</b><small>Des références choisies pour leurs performances</small></span></div><div><Headphones/><span><b>Un conseil en magasin</b><small>Échangez avec l’équipe avant votre choix</small></span></div></div><a className="trust-map" href="https://www.google.com/maps/search/?api=1&query=Avenue+Maniema+Lubumbashi" target="_blank" rel="noreferrer">Localiser le magasin <ArrowUpRight size={16}/></a></section>
  </main>;
}

function Catalogue({ onAdd, onCompare }: { onAdd: (p: Product) => void; onCompare: (p: Product) => void }) {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [category, setCategory] = useState(params.get('category') || 'Tout');
  const [brand, setBrand] = useState('Toutes');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => { const nextQuery = params.get('q') || ''; const nextCategory = params.get('category') || 'Tout'; setQuery(current => current === nextQuery ? current : nextQuery); setCategory(current => current === nextCategory ? current : nextCategory); }, [params]);
  const pageSize = 12;
  const brands = useMemo(() => ['Toutes', ...Array.from(new Set(products.map(p => p.brand))).sort()], []);
  const filtered = useMemo(() => { const q = query.trim().toLocaleLowerCase('fr'); return products.filter(p => (category === 'Tout' || p.category === category) && (brand === 'Toutes' || p.brand === brand) && (!minPrice || p.price >= Number(minPrice)) && (!maxPrice || p.price <= Number(maxPrice)) && (!q || `${p.name} ${p.brand} ${p.specs.join(' ')}`.toLocaleLowerCase('fr').includes(q))); }, [query, category, brand, minPrice, maxPrice]);
  const sorted = useMemo(() => [...filtered].sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : sort === 'name' ? a.name.localeCompare(b.name) : Number(Boolean(b.featured)) - Number(Boolean(a.featured))), [filtered, sort]);
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => { setParams(current => { const next = new URLSearchParams(current); if (category === 'Tout') next.delete('category'); else next.set('category', category); if (query) next.set('q', query); else next.delete('q'); return next; }, { replace: true }); setPage(1); }, [category, query, brand, minPrice, maxPrice, setParams]);
  const reset = () => { setCategory('Tout'); setBrand('Toutes'); setMinPrice(''); setMaxPrice(''); setQuery(''); setSort('featured'); };
  const filterContent = <><div className="filter-group"><h3>Catégories</h3><label className="filter-option"><input type="radio" checked={category === 'Tout'} onChange={() => setCategory('Tout')}/>Toutes les catégories</label>{categories.map(c => <label className="filter-option" key={c.name}><input type="radio" checked={category === c.name} onChange={() => setCategory(c.name)}/>{c.name}</label>)}</div><div className="filter-group"><h3>Marques</h3><select className="filter-select" value={brand} onChange={e => setBrand(e.target.value)}>{brands.map(b => <option key={b}>{b}</option>)}</select></div><div className="filter-group"><h3>Fourchette de prix (USD)</h3><div className="price-filter"><input type="number" min="0" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Minimum" aria-label="Prix minimum"/><input type="number" min="0" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Maximum" aria-label="Prix maximum"/></div></div><button className="filter-reset" onClick={reset}>Réinitialiser les filtres <X size={14}/></button></>;
  return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Catalogue' }]}/><div className="page-heading catalogue-heading"><div><Eyebrow>La sélection CTRL-TECH</Eyebrow><h1>Le catalogue <em>complet.</em></h1><p>Des appareils performants pour vos études, votre travail et vos projets.</p></div><div className="catalogue-total"><strong>{filtered.length.toString().padStart(2, '0')}</strong><span>références<br/>catalogue 2026</span></div></div>
    <div className="catalogue-toolbar"><form className="catalogue-search" onSubmit={e => e.preventDefault()}><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un produit, une marque…"/>{query && <button type="button" aria-label="Effacer la recherche" onClick={() => setQuery('')}><X size={16}/></button>}</form><button className="filter-mobile-trigger" onClick={() => setFiltersOpen(true)}><Filter size={16}/> Filtres {(category !== 'Tout' || brand !== 'Toutes' || minPrice || maxPrice) && <span>•</span>}</button><label className="sort-control"><ArrowDownUp size={16}/><span>Trier par</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Sélection</option><option value="name">Nom</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option></select></label></div>
    <div className="catalogue-layout"><aside className="filter-sidebar"><div className="filter-heading"><b>Affiner la sélection</b><span>{filtered.length} résultats</span></div>{filterContent}</aside><section className="catalogue-results" aria-label="Résultats du catalogue"><div className="results-meta"><span>{filtered.length ? `Affichage de ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)} sur ${filtered.length} produits` : 'Aucun résultat'}</span>{(category !== 'Tout' || brand !== 'Toutes' || query || minPrice || maxPrice) && <button onClick={reset}>Effacer les filtres <X size={13}/></button>}</div>{visible.length ? <div className="product-grid catalogue-grid">{visible.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onCompare={onCompare}/>)}</div> : <div className="empty-state"><Search size={27}/><h2>Aucun produit trouvé</h2><p>Essayez une autre recherche ou réinitialisez les filtres.</p><button className="button button-dark" onClick={reset}>Réinitialiser</button></div>}{pageCount > 1 && <div className="pagination"><button disabled={page === 1} onClick={() => setPage(p => p - 1)}><ArrowLeft size={15}/> Précédent</button><span>Page <b>{page}</b> / {pageCount}</span><button disabled={page === pageCount} onClick={() => setPage(p => p + 1)}>Suivant <ArrowRight size={15}/></button></div>}</section></div>
    <p className="catalogue-note"><CircleHelp size={15}/> Les prix du catalogue 2026 sont indicatifs. Les configurations, la disponibilité et les conditions commerciales doivent être confirmées auprès de CTRL-TECH.</p>
    {filtersOpen && <div className="drawer-backdrop" role="presentation" onClick={() => setFiltersOpen(false)}><section className="filter-drawer" role="dialog" aria-modal="true" aria-label="Filtres du catalogue" onClick={e => e.stopPropagation()}><div className="drawer-header"><b>Filtres</b><button className="icon-button" onClick={() => setFiltersOpen(false)} aria-label="Fermer"><X/></button></div>{filterContent}<button className="button button-signal drawer-apply" onClick={() => setFiltersOpen(false)}>Afficher {filtered.length} résultats</button></section></div>}
  </main>;
}

function ProductDetail({ onAdd, onCompare }: { onAdd: (p: Product) => void; onCompare: (p: Product) => void }) {
  const { id } = useParams(); const product = products.find(p => p.id === id); const [quantity, setQuantity] = useState(1);
  if (!product) return <main className="page-shell container"><div className="empty-state"><h1>Produit introuvable</h1><Link to="/catalogue" className="button button-dark">Retour au catalogue</Link></div></main>;
  return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Catalogue', to: '/catalogue' }, { label: product.category, to: `/catalogue?category=${encodeURIComponent(product.category)}` }, { label: product.name }]}/><div className="product-detail-layout"><div className="detail-gallery"><div className="detail-main-image"><img src={product.image} alt={product.name}/><span>VISUEL ILLUSTRATIF</span></div><div className="detail-image-caption">Le visuel présenté peut différer de la configuration exacte proposée.</div></div><section className="detail-information"><Eyebrow>{product.brand} / {product.category}</Eyebrow><h1>{product.name}</h1><p className="detail-description">{product.description}</p><div className="detail-price-block"><strong>{formatPrice(product.price)}</strong><span>USD · Prix indicatif</span></div><div className="availability-note"><span className="status-dot"/><span><b>Disponibilité à confirmer</b><small>Contactez le magasin pour vérifier la configuration et le stock.</small></span></div><div className="detail-specs"><h2>Caractéristiques principales</h2>{product.specs.map((spec, i) => <div key={i}><Check size={15}/>{spec}</div>)}</div><button className="detail-compare" onClick={() => onCompare(product)}><GitCompareArrows size={16}/> Ajouter au comparateur</button><div className="detail-purchase"><div className="quantity-control"><button aria-label="Diminuer la quantité" disabled={quantity <= 1} onClick={() => setQuantity(q => q - 1)}><Minus size={15}/></button><span>{quantity}</span><button aria-label="Augmenter la quantité" onClick={() => setQuantity(q => q + 1)}><Plus size={15}/></button></div><button className="button button-signal" onClick={() => { for (let i = 0; i < quantity; i++) onAdd(product); }}>Ajouter au panier <ShoppingBag size={17}/></button></div><p className="detail-disclaimer">L’ajout au panier constitue une sélection indicative et ne confirme ni réservation ni disponibilité.</p></section></div><section className="related-products"><div className="section-intro"><div><Eyebrow>À découvrir</Eyebrow><h2>Dans le même <em>univers.</em></h2></div><Link className="text-action" to={`/catalogue?category=${encodeURIComponent(product.category)}`}>Voir la catégorie <ArrowRight size={16}/></Link></div><div className="product-grid">{products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onCompare={onCompare}/>)}</div></section></main>;
}

function Cart({ lines, onQuantity, onRemove }: { lines: CartLine[]; onQuantity: (id: string, q: number) => void; onRemove: (id: string) => void }) {
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Panier' }]}/><div className="page-heading"><div><Eyebrow>Votre sélection</Eyebrow><h1>Le panier <em>CTRL-TECH.</em></h1><p>Vérifiez les références et les quantités de votre sélection.</p></div></div>
    {!lines.length ? <div className="empty-state cart-empty"><ShoppingBag size={32}/><h2>Votre panier est vide</h2><p>Votre prochaine sélection commence dans le catalogue.</p><Link to="/catalogue" className="button button-dark">Explorer le catalogue <ArrowRight size={16}/></Link></div> : <div className="cart-layout"><section className="cart-items"><div className="cart-list-heading"><span>Produit</span><span>Quantité</span><span>Total</span></div>{lines.map(line => <article className="cart-line" key={line.product.id}><Link to={`/produit/${line.product.id}`} className="cart-product-image"><img src={line.product.image} alt={line.product.name}/></Link><div className="cart-product-info"><span>{line.product.brand} · {line.product.category}</span><Link to={`/produit/${line.product.id}`}>{line.product.name}</Link><small>{formatPrice(line.product.price)} / unité</small><button className="remove-line" onClick={() => onRemove(line.product.id)}>Retirer <X size={13}/></button></div><div className="quantity-control"><button disabled={line.quantity <= 1} onClick={() => onQuantity(line.product.id, line.quantity - 1)} aria-label="Diminuer"><Minus size={14}/></button><span>{line.quantity}</span><button onClick={() => onQuantity(line.product.id, line.quantity + 1)} aria-label="Augmenter"><Plus size={14}/></button></div><strong className="line-total">{formatPrice(line.product.price * line.quantity)}</strong></article>)}</section><aside className="cart-summary"><Eyebrow>Récapitulatif</Eyebrow><h2>Votre sélection</h2><div className="summary-row"><span>Articles</span><b>{lines.reduce((sum, l) => sum + l.quantity, 0)}</b></div><div className="summary-row"><span>Sous-total indicatif</span><b>{formatPrice(total)}</b></div><div className="summary-total"><span>Total indicatif</span><strong>{formatPrice(total)}</strong></div><p>Le total ne comprend aucun frais non confirmé. Les prix et la disponibilité seront vérifiés par le magasin.</p><Link to="/checkout" className="button button-signal full-button">Continuer <ArrowRight size={17}/></Link><Link to="/catalogue" className="back-catalogue"><ArrowLeft size={14}/> Continuer mes recherches</Link></aside></div>}
    <div className="cart-trust-note"><ShieldCheck size={17}/> Cette sélection ne constitue pas encore une commande ou une réservation.</div>
  </main>;
}

function CheckoutContent() {
  return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Panier', to: '/panier' }, { label: 'Finalisation' }]}/><div className="page-heading"><div><Eyebrow>Dernière étape</Eyebrow><h1>Finaliser votre <em>demande.</em></h1><p>Le parcours de commande en ligne est en cours de mise en place.</p></div></div><div className="checkout-layout"><section className="checkout-main"><div className="checkout-steps">{['Coordonnées', 'Livraison', 'Paiement', 'Confirmation'].map((step, i) => <div className={i === 0 ? 'checkout-step active' : 'checkout-step'} key={step}><span>0{i + 1}</span><b>{step}</b></div>)}</div><div className="checkout-unavailable"><div className="checkout-icon"><CreditCard size={23}/></div><h2>La commande en ligne n’est pas encore activée.</h2><p>Les modalités de livraison, les frais, les moyens de paiement et la validation du stock doivent être confirmés avant d’ouvrir le paiement en ligne.</p><div className="checkout-requirements"><span><Check size={15}/> Vérification des références et des prix</span><span><Check size={15}/> Confirmation de la disponibilité</span><span><Check size={15}/> Activation des moyens de paiement</span></div><a className="button button-dark" href="https://www.google.com/maps/search/?api=1&query=Avenue+Maniema+Lubumbashi" target="_blank" rel="noreferrer">Contacter le magasin <ArrowUpRight size={16}/></a></div></section><aside className="checkout-aside"><Truck/><b>Livraison</b><p>Les zones, frais et délais seront communiqués après confirmation par CTRL-TECH.</p><ShieldCheck/><b>Paiement</b><p>Aucun moyen de paiement n’est annoncé avant son activation effective.</p></aside></div></main>;
}

function Checkout() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    let active = true;
    if (!authClient) { setAuthenticated(false); return; }
    authClient.getSession().then(({ data }) => { if (active) setAuthenticated(Boolean(data?.user)); }).catch(() => { if (active) setAuthenticated(false); });
    return () => { active = false; };
  }, []);
  if (authenticated === null) return <main className="page-shell container"><div className="empty-state">Vérification de votre session…</div></main>;
  if (!authenticated) return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Panier', to: '/panier' }, { label: 'Connexion' }]}/><div className="auth-page"><Eyebrow>Commande CTRL-TECH</Eyebrow><h1>Connectez-vous pour continuer.</h1><p>Un compte client est obligatoire avant la finalisation de la commande. Votre panier est conservé pendant la connexion.</p><Link to="/connexion?redirect=/checkout" className="button button-dark">Se connecter <ArrowRight size={16}/></Link></div></main>;
  return <CheckoutContent/>;
}

function OrderStatus({ tracking = false }: { tracking?: boolean }) {
  const { id } = useParams();
  return <main className="page-shell container"><Breadcrumbs items={[{ label: tracking ? 'Suivi de commande' : 'Confirmation' }]}/><div className="status-page"><div className="status-symbol"><CircleHelp size={30}/></div><Eyebrow>{tracking ? 'Suivi CTRL-TECH' : 'Commande CTRL-TECH'}</Eyebrow><h1>{tracking ? 'Suivi non disponible.' : 'Aucune commande confirmée.'}</h1><p>{tracking ? 'Le suivi sera accessible lorsqu’une commande aura été créée et confirmée par le système.' : 'Le site ne traite pas encore les commandes en ligne. Aucun paiement ou achat n’a été enregistré.'}</p>{id && <span className="reference-label">Référence demandée : {id}</span>}<Link to="/catalogue" className="button button-dark">Retour au catalogue <ArrowRight size={16}/></Link></div></main>;
}

function AdminLanding() {
  return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Espace professionnel' }]}/><div className="status-page admin-landing"><Eyebrow>CTRL-TECH / Gestion</Eyebrow><h1>Espace <em>professionnel.</em></h1><p>Le back-office est prévu dans l’architecture du projet, mais ses modules et ses permissions ne sont pas encore activés. Aucun tableau de bord fictif ne sera affiché.</p><p className="catalogue-note"><CircleHelp size={15}/> L'accès sera activé après mise en place des rôles et des contrôles d'autorisation côté API.</p><Link to="/connexion" className="button button-dark">Connexion administrateur</Link></div></main>;
}


function CategoryLanding({ onAdd, onCompare }: { onAdd: (p: Product) => void; onCompare: (p: Product) => void }) {
  const { slug = '' } = useParams();
  const category = categories.find(item => item.name.toLowerCase() === slug.toLowerCase());
  const items = products.filter(p => p.category === category?.name);
  if (!category) return <main className="page-shell container"><div className="empty-state"><h1>Catégorie introuvable</h1><Link to="/catalogue" className="button button-dark">Tout le catalogue</Link></div></main>;
  const brands = Array.from(new Set(items.map(p => p.brand)));
  return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Catalogue', to: '/catalogue' }, { label: category.name }]}/><div className="category-landing-hero"><div><Eyebrow>Univers CTRL-TECH</Eyebrow><h1>{category.name} <em>sélectionnés.</em></h1><p>{category.count}. Découvrez les références présentes dans notre catalogue de travail.</p><Link to={`/catalogue?category=${encodeURIComponent(category.name)}`} className="button button-dark">Voir toute la catégorie <ArrowRight size={16}/></Link></div><img src={category.image} alt="" /></div><div className="category-brand-row"><b>Marques présentes</b>{brands.map(name => <Link key={name} to={`/marques/${name.toLowerCase()}`}>{name}<ArrowUpRight size={13}/></Link>)}</div><div className="section-intro category-results-intro"><div><Eyebrow>La sélection disponible au catalogue</Eyebrow><h2>Explorer les <em>références.</em></h2></div><span>{items.length} produits</span></div><div className="product-grid catalogue-grid">{items.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onCompare={onCompare}/>)}</div></main>;
}

function AuthPage({ signup = false }: { signup?: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationPending, setVerificationPending] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!authClient) { setError("L'authentification n'est pas configurée dans cet environnement."); return; }
    setPending(true); setError(''); setMessage('');
    try {
      if (signup) {
        const result = await authClient.signUp.email({ name: name.trim(), email: email.trim(), password });
        if (result.error) throw new Error(result.error.message || "Impossible de créer le compte.");
        setVerificationPending(true);
        setMessage("Un code de vérification a été envoyé à votre adresse e-mail.");
      } else {
        const result = await authClient.signIn.email({ email: email.trim(), password });
        if (result.error) throw new Error(result.error.message || "Identifiants incorrects.");
        navigate('/compte');
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Une erreur est survenue. Réessayez.");
    } finally { setPending(false); }
  };
  const verifyEmail = async (event: FormEvent) => {
    event.preventDefault();
    if (!authClient) return;
    setPending(true); setError(''); setMessage('');
    try {
      const result = await authClient.emailOtp.verifyEmail({ email: email.trim(), otp: otp.trim() });
      if (result.error) throw new Error(result.error.message || "Code de vérification invalide.");
      navigate('/compte');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Impossible de vérifier le code.");
    } finally { setPending(false); }
  };
  const resendCode = async () => {
    if (!authClient) return;
    setPending(true); setError(''); setMessage('');
    try {
      const result = await authClient.emailOtp.sendVerificationOtp({ email: email.trim(), type: 'email-verification' });
      if (result.error) throw new Error(result.error.message || "Impossible de renvoyer le code.");
      setMessage("Un nouveau code a été envoyé.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Impossible de renvoyer le code.");
    } finally { setPending(false); }
  };
  return <main className="page-shell container"><Breadcrumbs items={[{ label: signup ? 'Créer un compte' : 'Connexion' }]}/><div className="auth-page"><Eyebrow>Espace client CTRL-TECH</Eyebrow><h1>{signup ? 'Créer votre compte.' : 'Ravi de vous retrouver.'}</h1><p>Un compte client est nécessaire pour finaliser une commande et retrouver votre historique.</p>
    {!authClient ? <div className="catalogue-note"><CircleHelp size={16}/> L'URL Neon Auth doit être configurée pour activer la connexion.</div> : verificationPending ? <form className="auth-form" onSubmit={verifyEmail}>
      <label>Code de vérification<input required inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Saisissez le code reçu"/></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      {message && <p className="form-success" role="status">{message}</p>}
      <button disabled={pending} className="button button-signal" type="submit">{pending ? 'Vérification…' : 'Vérifier mon adresse'} <ArrowRight size={16}/></button>
      <button disabled={pending} className="filter-reset" type="button" onClick={resendCode}>Renvoyer le code</button>
    </form> : <form className="auth-form" onSubmit={submit}>
      {signup && <label>Nom complet<input required autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom"/></label>}
      <label>Adresse e-mail<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nom@exemple.com"/></label>
      <label>Mot de passe<input required minLength={8} type="password" autoComplete={signup ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="8 caractères minimum"/></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      {message && <p className="form-success" role="status">{message}</p>}
      <button disabled={pending} className={signup ? 'button button-signal' : 'button button-dark'} type="submit">{pending ? 'Veuillez patienter…' : signup ? 'Créer mon compte' : 'Se connecter'} <ArrowRight size={16}/></button>
    </form>}
    {!verificationPending && <p className="auth-switch">{signup ? 'Vous avez déjà un compte ?' : 'Vous découvrez CTRL-TECH ?'} <Link to={signup ? '/connexion' : '/inscription'}>{signup ? 'Se connecter' : 'Créer un compte'}</Link></p>}
  </div></main>;
}

function AccountPage() {
  const [user, setUser] = useState<{ name?: string | null; email?: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    if (!authClient) { setLoading(false); return; }
    authClient.getSession().then(({ data }) => { if (active) setUser(data?.user ? { name: data.user.name, email: data.user.email } : null); })
      .catch(() => { if (active) setError("Impossible de vérifier votre session."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const signOut = async () => { if (!authClient) return; await authClient.signOut(); setUser(null); };
  return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Mon compte' }]}/><div className="page-heading"><div><Eyebrow>Espace personnel</Eyebrow><h1>Mon <em>compte.</em></h1><p>Retrouvez vos informations et votre activité CTRL-TECH.</p></div></div>
    {loading ? <div className="empty-state">Vérification de votre session…</div> : error ? <div className="empty-state"><p>{error}</p><button className="button button-dark" onClick={() => window.location.reload()}>Réessayer</button></div> : !user ? <div className="empty-state"><CircleHelp size={28}/><h2>Connectez-vous pour continuer</h2><p>Votre compte est nécessaire pour accéder à votre espace personnel.</p><Link to="/connexion" className="button button-dark">Se connecter</Link></div> :
    <div className="account-shell"><aside><b>Mon espace</b><Link to="/compte">Vue d’ensemble</Link><Link to="/compte/commandes">Mes commandes</Link><Link to="/compte/profil">Mes informations</Link><span>Sécurité du compte</span><button className="button button-dark" onClick={signOut}>Se déconnecter</button></aside><section><Eyebrow>Vue d’ensemble</Eyebrow><h2>Bienvenue{user.name ? `, ${user.name}` : ''}.</h2><p>Vous êtes connecté avec l'adresse {user.email}. L’historique des commandes sera affiché lorsque le traitement des commandes sera activé.</p><div className="account-empty"><ShoppingBag/><b>Aucune commande à afficher</b><small>Les commandes confirmées apparaîtront ici.</small><Link to="/catalogue" className="text-action">Découvrir le catalogue <ArrowRight size={15}/></Link></div></section></div>}
  </main>;
}

function InfoPage({ type }: { type: string }) {
  const content: Record<string, { title: string; intro: string; body: string[] }> = {
    about: { title: 'À propos de CTRL-TECH.', intro: 'Une boutique spécialisée dans les appareils électroniques de haute performance à Lubumbashi.', body: ['CTRL-TECH sélectionne des smartphones, tablettes, ordinateurs portables et accessoires pour les étudiants, professionnels, entreprises et créateurs.', 'Notre ambition : rendre la technologie performante plus accessible à celles et ceux qui veulent étudier, travailler, créer et aller plus loin.', 'Adresse communiquée dans le catalogue : Avenue Maniema, Lubumbashi.'] },
    contact: { title: 'Contact et magasin.', intro: 'Retrouvez CTRL-TECH à Lubumbashi, avenue Maniema.', body: ['Pour le moment, l’adresse du magasin est la seule coordonnée confirmée dans les documents du projet.', 'Les numéros de téléphone, WhatsApp, adresses e-mail et horaires doivent être validés avant publication.'] },
    delivery: { title: 'Livraison et retrait.', intro: 'Les modalités de réception sont en cours de validation.', body: ['Les zones desservies, frais, délais, conditions de retrait et éventuels partenaires de transport ne sont pas encore confirmés.', 'Aucun frais ou délai de livraison n’est donc affiché comme engagement commercial.'] },
    warranty: { title: 'Garantie et retours.', intro: 'Les conditions après-vente doivent être confirmées par CTRL-TECH.', body: ['La durée de garantie, les produits couverts, les exclusions, les procédures de retour et le service après-vente ne sont pas encore documentés.', 'Contactez le magasin pour obtenir les conditions applicables à une référence précise avant tout achat.'] },
    terms: { title: 'Conditions de vente.', intro: 'Les conditions générales de vente ne sont pas encore publiées.', body: ['Les prix du catalogue sont indicatifs et doivent être confirmés par CTRL-TECH.', 'Les modalités de commande, paiement, livraison, annulation et retour seront publiées après validation commerciale et juridique.'] },
    privacy: { title: 'Confidentialité.', intro: 'La politique de confidentialité est en cours de préparation.', body: ['Les informations sur les données collectées, leur utilisation, leur conservation, les droits des clients et les contacts responsables doivent être validées avant publication.'] },
    faq: { title: 'Questions fréquentes.', intro: 'Les réponses officielles seront publiées après validation par le magasin.', body: ['Les prix et la disponibilité sont-ils définitifs ? Non : les données actuelles sont indicatives et doivent être confirmées.', 'Puis-je commander et payer en ligne ? Le parcours de commande en ligne n’est pas encore activé.', 'Où se trouve CTRL-TECH ? L’adresse communiquée est Avenue Maniema, Lubumbashi.'] }
  };
  const page = content[type] || content.about;
  return <main className="page-shell container"><Breadcrumbs items={[{ label: page.title }]}/><article className="info-page"><Eyebrow>CTRL-TECH / Informations</Eyebrow><h1>{page.title}</h1><p className="info-intro">{page.intro}</p><div className="info-body">{page.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>{type === 'contact' && <a className="button button-dark" href="https://www.google.com/maps/search/?api=1&query=Avenue+Maniema+Lubumbashi" target="_blank" rel="noreferrer">Localiser le magasin <ArrowUpRight size={16}/></a>}</article></main>;
}

function BrandsPage() {
  const brands = Array.from(new Set(products.map(p => p.brand))).sort();
  return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Marques' }]}/><div className="page-heading"><div><Eyebrow>Nos marques</Eyebrow><h1>La technologie par <em>marque.</em></h1><p>Parcourez les références du catalogue par constructeur et fabricant.</p></div></div><div className="brand-directory">{brands.map(brand => <Link to={`/marques/${encodeURIComponent(brand.toLowerCase())}`} key={brand}><span>{brand.slice(0,2).toUpperCase()}</span><b>{brand}</b><small>{products.filter(p => p.brand === brand).length} références</small><ArrowUpRight size={17}/></Link>)}</div></main>;
}

function BrandDetail({ onAdd, onCompare }: { onAdd: (p: Product) => void; onCompare: (p: Product) => void }) {
  const { slug = '' } = useParams();
  const brand = Array.from(new Set(products.map(p => p.brand))).find(name => name.toLowerCase() === decodeURIComponent(slug));
  const items = products.filter(p => p.brand === brand);
  if (!brand) return <main className="page-shell container"><div className="empty-state"><h1>Marque introuvable</h1><Link to="/marques" className="button button-dark">Toutes les marques</Link></div></main>;
  return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Marques', to: '/marques' }, { label: brand }]}/><div className="page-heading"><div><Eyebrow>Univers de marque</Eyebrow><h1>{brand} <em>chez CTRL-TECH.</em></h1><p>Découvrez les références {brand} présentes dans le catalogue de travail.</p></div><div className="catalogue-total"><strong>{items.length.toString().padStart(2,'0')}</strong><span>références<br/>catalogue</span></div></div><div className="product-grid catalogue-grid">{items.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onCompare={onCompare}/>)}</div></main>;
}

function ComparePage({ ids, onRemove }: { ids: string[]; onRemove: (id: string) => void }) {
  const selected = ids.map(id => products.find(p => p.id === id)).filter((p): p is Product => Boolean(p));
  const category = selected[0]?.category;
  const attributes = ['Marque', 'Catégorie', 'Prix indicatif', 'Caractéristiques'];
  return <main className="page-shell container"><Breadcrumbs items={[{ label: 'Comparateur' }]}/><div className="page-heading"><div><Eyebrow>Aide à la décision</Eyebrow><h1>Comparer les <em>produits.</em></h1><p>Jusqu’à trois références d’une même famille peuvent être comparées.</p></div><span className="catalogue-total"><strong>{selected.length}/3</strong><span>produits<br/>sélectionnés</span></span></div>{!selected.length ? <div className="empty-state"><GitCompareArrows size={30}/><h2>Votre comparateur est vide</h2><p>Ajoutez des produits depuis le catalogue pour examiner leurs différences.</p><Link className="button button-dark" to="/catalogue">Choisir des produits</Link></div> : <><div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Critères</th>{selected.map(p => <th key={p.id}><div className="compare-product"><img src={p.image} alt=""/><b>{p.name}</b><button onClick={() => onRemove(p.id)}>Retirer <X size={12}/></button></div></th>)}{selected.length < 3 && <th className="compare-add-cell"><Link to="/catalogue"><Plus size={18}/> Ajouter un produit</Link></th>}</tr></thead><tbody>{attributes.map(attr => <tr key={attr}><th>{attr}</th>{selected.map(p => <td key={p.id}>{attr === 'Marque' ? p.brand : attr === 'Catégorie' ? p.category : attr === 'Prix indicatif' ? formatPrice(p.price) : p.specs.join(' · ') || 'Non renseigné'}</td>)}{selected.length < 3 && <td>—</td>}</tr>)}</tbody></table></div>{category && selected.some(p => p.category !== category) && <p className="catalogue-note">Les produits de familles différentes ne peuvent pas être comparés ensemble.</p>}</>}</main>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-top"><div className="footer-brand-block"><Link to="/" className="footer-logo"><img src="/brand/logo-full.png" alt="CTRL-TECH"/></Link><p>La technologie, bien choisie.<br/>Votre univers électronique à Lubumbashi.</p></div><div className="footer-column"><b>Explorer</b><Link to="/catalogue">Tout le catalogue</Link><Link to="/categories/smartphones">Smartphones</Link><Link to="/categories/ordinateurs">Ordinateurs</Link><Link to="/categories/tablettes">Tablettes</Link><Link to="/categories/accessoires">Accessoires</Link><Link to="/marques">Marques</Link><Link to="/comparateur">Comparateur</Link></div><div className="footer-column"><b>CTRL-TECH</b><Link to="/a-propos">À propos</Link><Link to="/contact">Contact</Link><Link to="/livraison-retrait">Livraison & retrait</Link><Link to="/garantie-retours">Garantie & retours</Link><Link to="/conditions">Conditions de vente</Link><Link to="/confidentialite">Confidentialité</Link><Link to="/faq">FAQ</Link><a href="/#magasin">Le magasin</a><a href="https://www.google.com/maps/search/?api=1&query=Avenue+Maniema+Lubumbashi" target="_blank" rel="noreferrer">Nous trouver</a><Link to="/admin">Espace professionnel</Link></div><div className="footer-address"><MapPin/><b>Lubumbashi, RDC</b><span>Avenue Maniema</span><small>Informations commerciales à confirmer en magasin.</small></div></div><div className="container footer-bottom"><span>© 2026 CTRL-TECH. Tous droits réservés.</span><span>Precision in Technology · Catalogue indicatif</span></div></footer>;
}

export default function App() {
  const [cart, setCart] = useState<CartLine[]>(readCart);
  const [compareIds, setCompareIds] = useState<string[]>(() => { try { const value = JSON.parse(window.localStorage.getItem('ctrl-tech-compare') || '[]'); return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string').slice(0,3) : []; } catch { return []; } });
  const [compareNotice, setCompareNotice] = useState('');
  useEffect(() => { window.localStorage.setItem('ctrl-tech-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.localStorage.setItem('ctrl-tech-compare', JSON.stringify(compareIds)); }, [compareIds]);
  const add = (product: Product) => setCart(old => { const existing = old.find(line => line.product.id === product.id); return existing ? old.map(line => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line) : [...old, { product, quantity: 1 }]; });
  const quantity = (id: string, next: number) => setCart(old => old.map(line => line.product.id === id ? { ...line, quantity: Math.max(1, next) } : line));
  const remove = (id: string) => setCart(old => old.filter(line => line.product.id !== id));
  const compare = (product: Product) => { if (compareIds.includes(product.id)) { setCompareIds(old => old.filter(id => id !== product.id)); setCompareNotice(`${product.name} retiré du comparateur.`); return; } const current = compareIds.map(id => products.find(p => p.id === id)).filter(Boolean); if (current.length && current[0]?.category !== product.category) { setCompareNotice('Comparez uniquement des produits de la même famille.'); return; } if (compareIds.length >= 3) { setCompareNotice('Le comparateur est limité à trois produits.'); return; } setCompareIds(old => [...old, product.id]); setCompareNotice(`${product.name} ajouté au comparateur.`); };
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  return <><Header count={count} compareCount={compareIds.length} compareNotice={compareNotice}/><Routes><Route path="/" element={<Home onAdd={add} onCompare={compare}/>}/><Route path="/catalogue" element={<Catalogue onAdd={add} onCompare={compare}/>}/><Route path="/marques" element={<BrandsPage/>}/><Route path="/categories/:slug" element={<CategoryLanding onAdd={add} onCompare={compare}/>}/><Route path="/connexion" element={<AuthPage/>}/><Route path="/inscription" element={<AuthPage signup/>}/><Route path="/compte/*" element={<AccountPage/>}/><Route path="/a-propos" element={<InfoPage type="about"/>}/><Route path="/contact" element={<InfoPage type="contact"/>}/><Route path="/livraison-retrait" element={<InfoPage type="delivery"/>}/><Route path="/garantie-retours" element={<InfoPage type="warranty"/>}/><Route path="/conditions" element={<InfoPage type="terms"/>}/><Route path="/confidentialite" element={<InfoPage type="privacy"/>}/><Route path="/faq" element={<InfoPage type="faq"/>}/><Route path="/marques/:slug" element={<BrandDetail onAdd={add} onCompare={compare}/>}/><Route path="/comparateur" element={<ComparePage ids={compareIds} onRemove={id => setCompareIds(old => old.filter(x => x !== id))}/>}/><Route path="/produit/:id" element={<ProductDetail onAdd={add} onCompare={compare}/>}/><Route path="/panier" element={<Cart lines={cart} onQuantity={quantity} onRemove={remove}/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/commande/:id" element={<OrderStatus/>}/><Route path="/suivi/:id" element={<OrderStatus tracking/>}/><Route path="/admin/*" element={<AdminLanding/>}/><Route path="*" element={<main className="page-shell container"><div className="empty-state"><h1>Page introuvable</h1><Link to="/" className="button button-dark">Retour à l’accueil</Link></div></main>}/></Routes><Footer/></>;
}
