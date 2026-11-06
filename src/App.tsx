import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { ArrowRight, Search, ShoppingBag, Menu, X, ChevronRight, ShieldCheck, Truck, Headphones, MapPin, Plus, SlidersHorizontal, Headphones as HeadphonesIcon, ArrowUpRight } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { categories, formatPrice, products, type Product } from './catalog';
import { fetchCatalogueProducts, isUuid } from './catalog-api';
import { ExtendedRoutes } from './extended-pages';

const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

function Header({ count }: { count:number }) {
  const [open,setOpen]=useState(false);
  return <header className="site-header"><div className="topline">L’exigence technologique, au cœur de Lubumbashi <span>•</span> Avenue Maniema</div><div className="nav-wrap container">
    <Link to="/" className="brand" aria-label="CTRL-TECH — Accueil"><img className="brand-home-icon" src="/brand/ctrl-tech-icon.png" alt="CTRL-TECH" /></Link>
    <nav id="primary-navigation" className={open?'nav-links open':'nav-links'} aria-label="Navigation principale"><Link to="/catalogue" onClick={()=>setOpen(false)}>Catalogue</Link><a href="/#categories" onClick={()=>setOpen(false)}>Catégories</a><a href="/#about" onClick={()=>setOpen(false)}>Notre magasin</a><a href="/#contact" onClick={()=>setOpen(false)}>Contact</a></nav>
    <div className="nav-actions"><Link to="/catalogue" className="search-action" aria-label="Rechercher"><Search size={19}/></Link><Link to="/panier" className="cart-action" aria-label={`Panier, ${count} article(s)`}><ShoppingBag size={19}/><span aria-hidden="true">{count}</span></Link>{clerkEnabled?<><SignedOut><SignInButton mode="modal"><button className="auth-trigger">Connexion</button></SignInButton></SignedOut><SignedIn><UserButton afterSignOutUrl="/"/></SignedIn></>:<Link className="auth-placeholder" to="/compte">Espace client</Link>}<button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="primary-navigation">{open?<X/>:<Menu/>}</button></div>
  </div></header>;
}

function ProductCard({ product, onAdd }: {product:Product; onAdd:(p:Product)=>void}) {
  return <article className="product-card"><Link to={`/produit/${product.id}`} className="product-image"><img src={product.image} alt={product.name} loading="lazy"/><span className="image-tag">{product.featured ? "Sélection CTRL-TECH" : product.category}</span></Link><div className="product-info"><div className="product-meta"><span>{product.brand}</span><span>{product.category}</span></div><Link to={`/produit/${product.id}`} className="product-title">{product.name}</Link><div className="spec-line">{product.specs.slice(0,2).join(' · ')}</div><div className="product-bottom"><div><strong>{formatPrice(product.price)}</strong><small>Prix indicatif</small></div><button type="button" onClick={()=>onAdd(product)} className="add-button" aria-label={`Ajouter ${product.name} au panier`}><Plus size={18}/></button></div></div></article>;
}

function Home({ onAdd }: {onAdd:(p:Product)=>void}) {
  const featured=products.filter(p=>p.featured);
  return <><section className="hero"><div className="hero-glow"></div><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><span></span> LA TECHNOLOGIE, BIEN CHOISIE.</div><h1>Le meilleur de la tech.<br/><em>Sans compromis.</em></h1><p>Des appareils soigneusement sélectionnés pour celles et ceux qui veulent aller plus loin. Découvrez notre univers technologique à Lubumbashi.</p><div className="hero-buttons"><Link to="/catalogue" className="button button-light">Explorer le catalogue <ArrowRight size={17}/></Link><a href="#categories" className="text-link">Découvrir nos catégories <ArrowUpRight size={16}/></a></div><div className="hero-proof"><div className="proof-item"><ShieldCheck/><span><b>Sélection exigeante</b><small>Des références choisies</small></span></div><div className="proof-item"><Headphones/><span><b>Conseil en magasin</b><small>Un accompagnement humain</small></span></div></div></div><div className="hero-visual"><div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div><div className="hero-device"><img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=90" alt="Smartphone haut de gamme"/></div><div className="floating-note note-top"><span className="note-dot"></span> COLLECTION 2026</div><div className="floating-note note-bottom"><b>Performance.</b><span>Design. Fiabilité.</span></div><div className="hero-index">01 <span>/</span> 04</div></div></div><div className="hero-bottom container"><span>APPLE</span><span>SAMSUNG</span><span>ASUS</span><span>LENOVO</span><span>DELL</span><span>SONY</span></div></section>
  <section className="section container" id="categories"><div className="section-heading"><div><div className="eyebrow dark"><span></span> EXPLOREZ L’UNIVERS CTRL-TECH</div><h2>La bonne technologie.<br/><em>Pour chaque ambition.</em></h2></div><Link to="/catalogue" className="arrow-link">Tout le catalogue <ArrowRight size={17}/></Link></div><div className="category-grid">{categories.map((c,i)=><Link to="/catalogue" className="category-card" key={c.name}><img src={c.image} alt=""/><div className="category-overlay"></div><div className="category-content"><small>0{i+1} / CATÉGORIE</small><h3>{c.name}</h3><span>{c.count}</span></div><span className="category-arrow"><ArrowUpRight/></span></Link>)}</div></section>
  <section className="featured-section"><div className="container"><div className="section-heading"><div><div className="eyebrow dark"><span></span> SÉLECTION CTRL-TECH</div><h2>Des produits qui font<br/><em>la différence.</em></h2></div><Link to="/catalogue" className="arrow-link">Voir la sélection <ArrowRight size={17}/></Link></div><div className="product-grid">{featured.map(p=><ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</div></div></section>
  <section className="service-strip container" id="about"><div><ShieldCheck/><span><b>Produits neufs</b><small>Une sélection de produits neufs</small></span></div><div><Truck/><span><b>Conseil & accompagnement</b><small>Avant et après votre achat</small></span></div><div><MapPin/><span><b>À Lubumbashi</b><small>Avenue Maniema</small></span></div><div><HeadphonesIcon/><span><b>À votre écoute</b><small>Contactez notre équipe</small></span></div></section>
  <section className="contact-banner" id="contact"><div className="container contact-inner"><div><div className="eyebrow"><span></span> PASSEZ NOUS VOIR</div><h2>Votre prochain appareil<br/><em>vous attend peut-être.</em></h2><p>Venez découvrir notre sélection et bénéficiez de conseils adaptés à vos besoins.</p></div><div className="contact-card"><MapPin/><b>CTRL-TECH</b><span>Avenue Maniema, Lubumbashi</span><a href="https://www.google.com/maps/search/?api=1&query=Avenue+Maniema+Lubumbashi" target="_blank" rel="noreferrer">Nous trouver <ArrowUpRight size={16}/></a></div></div></section>
  </>;
}

function Catalogue({ onAdd }: {onAdd:(p:Product)=>void}) {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('Tout');
  const [sort,setSort]=useState('featured');
  const [remoteProducts,setRemoteProducts]=useState<Product[]|null>(null);
  const [loading,setLoading]=useState(true);
  const [apiUnavailable,setApiUnavailable]=useState(false);

  useEffect(()=>{
    const controller=new AbortController();
    setLoading(true);
    fetchCatalogueProducts({
      q:query.trim() || undefined,
      category:category==='Tout' ? undefined : category,
      signal:controller.signal,
    }).then((items)=>{
      setRemoteProducts(items);
      setApiUnavailable(false);
    }).catch((error:unknown)=>{
      if(error instanceof Error && error.name==='AbortError') return;
      setRemoteProducts(null);
      setApiUnavailable(true);
    }).finally(()=>{
      if(!controller.signal.aborted)setLoading(false);
    });
    return ()=>controller.abort();
  },[query,category]);

  const sourceProducts=remoteProducts ?? products;
  const shown=useMemo(()=>{
    const filtered=remoteProducts===null
      ? sourceProducts.filter((p)=>(category==='Tout'||p.category===category)&&(`${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())))
      : [...sourceProducts];
    return filtered.sort((a,b)=>sort==='price-asc'?a.price-b.price:sort==='price-desc'?b.price-a.price:sort==='featured'?Number(Boolean(b.featured))-Number(Boolean(a.featured))||a.name.localeCompare(b.name):0);
  },[sourceProducts,remoteProducts,query,category,sort]);

  return <main className="container page-main">
    <div className="page-kicker">CTRL-TECH / CATALOGUE</div>
    <div className="catalogue-title"><div><h1>Le catalogue <em>CTRL-TECH.</em></h1><p>Une sélection de technologies pour vos projets, votre travail et votre quotidien.</p></div><span aria-live="polite">{shown.length} références {remoteProducts!==null?'publiées':'de démonstration'}</span></div>
    <div className="catalogue-tools">
      <div className="catalogue-search"><Search size={18}/><input aria-label="Rechercher un produit ou une marque" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher un produit, une marque…"/></div>
      <div className="filter-label"><SlidersHorizontal size={16}/> Filtrer</div>
      <select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Filtrer par catégorie"><option>Tout</option>{categories.map(c=><option key={c.name}>{c.name}</option>)}</select>
      <select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Trier les produits"><option value="featured">Trier par sélection</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option></select>
    </div>
    {loading&&<p className="catalogue-status" role="status">Chargement du catalogue…</p>}
    {apiUnavailable&&<p className="catalogue-status" role="status">Le catalogue en ligne est momentanément indisponible. Affichage des références de démonstration.</p>}
    <div className="product-grid catalogue-grid">{shown.map(p=><ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</div>
    {!loading&&shown.length===0&&<div className="empty-state" role="status">Aucun produit ne correspond à cette recherche.</div>}
    <p className="catalogue-disclaimer">Catalogue de travail. Les prix sont indicatifs ; disponibilité, configuration et conditions de vente doivent être confirmées par CTRL-TECH avant toute commande.</p>
  </main>;
}
function ProductDetail({onAdd}:{onAdd:(p:Product)=>void}) {
  const {id}=useParams();
  const localProduct=products.find(x=>x.id===id);
  const [remoteProduct,setRemoteProduct]=useState<Product|null>(null);
  const [loading,setLoading]=useState(()=>Boolean(id&&isUuid(id)));
  const [unavailable,setUnavailable]=useState(false);

  useEffect(()=>{
    if(!id||!isUuid(id)){setRemoteProduct(null);setLoading(false);return;}
    const controller=new AbortController();
    setLoading(true);
    fetchCatalogueProducts({id,signal:controller.signal}).then((items)=>{
      setRemoteProduct(items[0]??null);
      setUnavailable(false);
    }).catch((error:unknown)=>{
      if(error instanceof Error&&error.name==='AbortError')return;
      setUnavailable(true);
      setRemoteProduct(null);
    }).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[id]);

  const p=localProduct??remoteProduct;
  if(loading)return <main className="container page-main empty-state" role="status">Chargement de la fiche produit…</main>;
  if(!p)return <main className="container page-main empty-state"><h1>Produit introuvable</h1><p>{unavailable?'La fiche produit ne peut pas être chargée pour le moment.':'Cette référence n’est pas disponible dans le catalogue.'}</p><Link to="/catalogue">Retour au catalogue</Link></main>;
  return <main className="container page-main">
    <div className="page-kicker"><Link to="/">Accueil</Link> / <Link to="/catalogue">Catalogue</Link> / {p.name}</div>
    <div className="detail-grid"><div className="detail-image"><img src={p.image} alt={p.name}/></div><div className="detail-copy">
      <span className="eyebrow dark"><span></span> {p.brand} · {p.category}</span><h1>{p.name}</h1><p>{p.description}</p>
      <div className="detail-price">{formatPrice(p.price)}<small>Prix indicatif, à confirmer en magasin</small></div>
      <h3>Caractéristiques principales</h3><ul>{p.specs.map(s=><li key={s}><ChevronRight size={16}/>{s}</li>)}</ul>
      <div className="notice"><ShieldCheck size={18}/><span>Produit présenté à titre de catalogue. Stock, configuration exacte et garantie à confirmer auprès de CTRL-TECH.</span></div>
      <button className="button button-dark" type="button" onClick={()=>onAdd(p)}>Ajouter au panier <ShoppingBag size={17}/></button>
    </div></div>
  </main>;
}
function Cart({items,onRemove}:{items:Product[];onRemove:(id:string)=>void}) {
  return <main className="container page-main"><div className="page-kicker">CTRL-TECH / PANIER</div><h1 className="cart-title">Votre panier.</h1>{items.length===0?<div className="empty-state"><ShoppingBag size={32}/><h2>Votre panier est vide</h2><p>Explorez le catalogue pour ajouter vos produits préférés.</p><Link className="button button-dark" to="/catalogue">Voir le catalogue <ArrowRight size={17}/></Link></div>:<div className="cart-layout"><div className="cart-list">{items.map((p,i)=><div className="cart-row" key={`${p.id}-${i}`}><img src={p.image} alt=""/><div><b>{p.name}</b><small>{p.brand} · Prix indicatif</small><strong>{formatPrice(p.price)}</strong></div><button type="button" onClick={()=>onRemove(p.id)} aria-label={`Retirer ${p.name} du panier`}><X size={18}/></button></div>)}</div><aside className="cart-summary"><h3>Récapitulatif</h3><p><span>Articles</span><b>{items.length}</b></p><p><span>Total indicatif</span><b>{formatPrice(items.reduce((s,p)=>s+p.price,0))}</b></p><div className="notice">Ce panier est une maquette fonctionnelle. Le passage de commande sera activé après validation des prix, stocks et modalités commerciales.</div><Link className="button button-dark" to="/commande">Continuer</Link></aside></div>}</main>;
}

function Footer(){return <footer className="footer"><div className="container footer-main"><Link to="/" className="brand footer-brand"><img className="brand-logo" src="/brand/logo-full.png" alt="CTRL-TECH — Precision in Technology" /><img className="brand-symbol" src="/brand/ctrl-tech-icon.png" alt="" aria-hidden="true" /></Link><p>La technologie, bien choisie.<br/>Votre univers électronique à Lubumbashi.</p><div className="footer-links"><Link to="/catalogue">Catalogue</Link><Link to="/aide">Assistance</Link><Link to="/conditions">Conditions</Link><Link to="/livraison-retours">Livraison</Link><Link to="/confidentialite">Confidentialité</Link></div><div className="footer-location"><MapPin size={17}/> Avenue Maniema, Lubumbashi</div></div><div className="container footer-bottom"><span>© 2026 CTRL-TECH. Tous droits réservés.</span><span>Catalogue indicatif · Informations à confirmer en magasin</span></div></footer>}

export default function App(){
  const [cart,setCart]=useState<Product[]>(()=>{
    try {
      const stored=window.localStorage.getItem('ctrl-tech-cart');
      const parsed=stored?JSON.parse(stored):[];
      return Array.isArray(parsed)?parsed.filter((item)=>item&&typeof item.id==='string'):[];
    } catch {
      return [];
    }
  });
  useEffect(()=>{window.localStorage.setItem('ctrl-tech-cart',JSON.stringify(cart));},[cart]);
  const add=(p:Product)=>setCart(old=>[...old,p]);
  const remove=(id:string)=>{let removed=false;setCart(old=>old.filter(p=>{if(p.id===id&&!removed){removed=true;return false;}return true;}));};
  return <><Header count={cart.length}/><Routes><Route path="/" element={<Home onAdd={add}/>}/><Route path="/catalogue" element={<Catalogue onAdd={add}/>}/><Route path="/produit/:id" element={<ProductDetail onAdd={add}/>}/><Route path="/panier" element={<Cart items={cart} onRemove={remove}/>}/><Route path="*" element={<main className="container page-main empty-state"><h1>404</h1><p>Cette page n’existe pas.</p><Link to="/">Retour à l’accueil</Link></main>}/></Routes><ExtendedRoutes/><Footer/></>;
}