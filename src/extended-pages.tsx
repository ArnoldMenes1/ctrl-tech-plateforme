import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BadgeCheck, Bell, Box, Building2, CalendarDays, CheckCircle2, ChevronRight, CircleHelp, ClipboardList, CreditCard, FileText, Headphones, LayoutDashboard, LockKeyhole, MapPin, Package, PackageCheck, Plus, Search, Settings, ShieldCheck, ShoppingBag, Truck, Users, Wallet, X } from 'lucide-react';

const demoOrders = [
  { id: 'CT-2026-0048', date: '04 nov. 2026', status: 'En préparation', total: '$1 250', items: 'Samsung Galaxy S25 Ultra' },
  { id: 'CT-2026-0031', date: '21 oct. 2026', status: 'Livrée', total: '$800', items: 'iPhone 16' },
  { id: 'CT-2026-0022', date: '12 oct. 2026', status: 'Livrée', total: '$160', items: 'AirPods 4' },
];
const adminNav = [
  { to: '/admin', label: 'Vue d’ensemble', icon: LayoutDashboard },
  { to: '/admin/produits', label: 'Produits', icon: Package },
  { to: '/admin/commandes', label: 'Commandes', icon: ClipboardList },
  { to: '/admin/stocks', label: 'Stocks', icon: Box },
  { to: '/admin/clients', label: 'Clients', icon: Users },
  { to: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="workspace-intro"><div className="page-kicker">CTRL-TECH / {eyebrow}</div><h1>{title}</h1><p>{description}</p></div>;
}
function Status({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral'|'good'|'warm' }) {
  return <span className={`workspace-status ${tone}`}>{children}</span>;
}
function DemoNotice() {
  return <div className="workspace-demo"><ShieldCheck size={17}/><span><b>Interface de démonstration.</b> Données fictives, aucune commande ni modification n’est enregistrée. Les actions métier seront reliées aux API après validation du backend.</span></div>;
}

function CheckoutPage() {
  const [delivery, setDelivery] = useState('pickup');
  const [payment, setPayment] = useState('mobile');
  return <main className="container page-main workspace-page"><PageIntro eyebrow="COMMANDE" title="Finaliser votre demande." description="Renseignez vos coordonnées et choisissez le mode de réception souhaité."/><DemoNotice/>
    <div className="workspace-checkout"><form className="workspace-panel" onSubmit={e=>e.preventDefault()}>
      <section className="workspace-form-section"><span className="workspace-step">01</span><div><h2>Vos coordonnées</h2><p>Les champs marqués d’un astérisque sont requis.</p></div></section>
      <div className="workspace-form-grid"><label>Nom complet *<input required placeholder="Votre nom et prénom"/></label><label>Téléphone *<input required type="tel" placeholder="+243 …"/></label><label className="wide">Adresse e-mail<input type="email" placeholder="nom@exemple.com"/></label></div>
      <section className="workspace-form-section"><span className="workspace-step">02</span><div><h2>Mode de réception</h2><p>Le magasin confirmera les modalités avant toute commande.</p></div></section>
      <div className="workspace-choice-grid"><button type="button" className={delivery==='pickup'?'workspace-choice selected':'workspace-choice'} onClick={()=>setDelivery('pickup')}><MapPin/><b>Retrait en magasin</b><small>Avenue Maniema, Lubumbashi</small></button><button type="button" className={delivery==='delivery'?'workspace-choice selected':'workspace-choice'} onClick={()=>setDelivery('delivery')}><Truck/><b>Livraison</b><small>Zone et frais à confirmer</small></button></div>
      <section className="workspace-form-section"><span className="workspace-step">03</span><div><h2>Moyen de paiement envisagé</h2><p>Aucun paiement n’est collecté sur cette maquette.</p></div></section>
      <div className="workspace-choice-grid"><button type="button" className={payment==='mobile'?'workspace-choice selected':'workspace-choice'} onClick={()=>setPayment('mobile')}><Wallet/><b>Mobile Money</b><small>Modalités à confirmer</small></button><button type="button" className={payment==='cash'?'workspace-choice selected':'workspace-choice'} onClick={()=>setPayment('cash')}><CreditCard/><b>Espèces en magasin</b><small>USD — sous réserve de validation</small></button></div>
      <label className="workspace-full-label">Informations complémentaires<textarea rows={3} placeholder="Précisions utiles pour notre équipe…"/></label>
      <button className="button button-dark workspace-submit" type="button" disabled>Envoyer la demande — bientôt disponible</button>
    </form><aside className="workspace-panel workspace-order-summary"><h2>Votre récapitulatif</h2><div className="workspace-order-item"><div className="workspace-product-placeholder"><ShoppingBag/></div><div><b>Votre sélection</b><small>Les articles seront chargés depuis le panier.</small></div></div><div className="workspace-summary-line"><span>Sous-total indicatif</span><b>À calculer</b></div><div className="workspace-summary-line"><span>Livraison</span><b>À confirmer</b></div><div className="workspace-summary-total"><span>Total</span><b>À confirmer</b></div><p className="workspace-muted">Les prix affichés dans le catalogue sont indicatifs. Le magasin confirmera le montant final, le stock et les conditions de vente.</p></aside></div>
  </main>;
}

function AccountPage() {
  return <main className="container page-main workspace-page"><PageIntro eyebrow="ESPACE CLIENT" title="Votre espace, en un seul endroit." description="Retrouvez vos demandes, vos informations et l’assistance CTRL-TECH."/><DemoNotice/><div className="workspace-account-grid"><div className="workspace-panel workspace-profile-card"><div className="workspace-avatar">CT</div><h2>Bienvenue chez CTRL-TECH</h2><p>Connectez-vous avec votre compte client pour accéder à vos informations personnelles.</p><button className="button button-dark" type="button" disabled>Connexion client — Clerk à configurer</button><small>Le parcours d’authentification sera activé après configuration des clés et des règles de session.</small></div><div className="workspace-panel workspace-link-list"><Link to="/compte/commandes"><ClipboardList/><span><b>Mes commandes</b><small>Suivre vos achats et demandes</small></span><ChevronRight/></Link><Link to="/aide"><CircleHelp/><span><b>Centre d’assistance</b><small>Obtenir une réponse à vos questions</small></span><ChevronRight/></Link><Link to="/conditions"><FileText/><span><b>Conditions de vente</b><small>Consulter les informations commerciales</small></span><ChevronRight/></Link></div></div></main>;
}
function OrdersPage() {
  return <main className="container page-main workspace-page"><div className="page-kicker"><Link to="/compte">Espace client</Link> / Commandes</div><PageIntro eyebrow="MES COMMANDES" title="Le suivi de vos commandes." description="Consultez l’avancement de vos achats et retrouvez leur récapitulatif."/><DemoNotice/><div className="workspace-panel workspace-table-wrap"><table className="workspace-table"><thead><tr><th>Référence</th><th>Date</th><th>Articles</th><th>Montant</th><th>Statut</th><th></th></tr></thead><tbody>{demoOrders.map(o=><tr key={o.id}><td><b>{o.id}</b></td><td>{o.date}</td><td>{o.items}</td><td>{o.total}</td><td><Status tone={o.status==='Livrée'?'good':'warm'}>{o.status}</Status></td><td><Link to={`/compte/commandes/${o.id}`} aria-label={`Voir ${o.id}`}><ChevronRight/></Link></td></tr>)}</tbody></table><p className="workspace-muted">Exemples fictifs pour illustrer l’interface. Les commandes réelles viendront de l’API sécurisée.</p></div></main>;
}
function OrderDetailPage() {
  return <main className="container page-main workspace-page"><div className="page-kicker"><Link to="/compte">Espace client</Link> / <Link to="/compte/commandes">Commandes</Link> / CT-2026-0048</div><PageIntro eyebrow="SUIVI DE COMMANDE" title="Commande CT-2026-0048." description="Un aperçu du parcours de suivi qui sera alimenté par le backend."/><DemoNotice/><div className="workspace-panel"><div className="workspace-order-head"><div><Status tone="warm">En préparation</Status><h2>Votre commande est en cours de préparation.</h2><p>Dernière mise à jour : 04 novembre 2026</p></div><PackageCheck size={40}/></div><div className="workspace-timeline"><div className="done"><CheckCircle2/><span><b>Demande reçue</b><small>04 novembre · 09:42</small></span></div><div className="done"><CheckCircle2/><span><b>Commande confirmée</b><small>04 novembre · 10:15</small></span></div><div className="active"><Package/><span><b>En préparation</b><small>Étape actuelle</small></span></div><div><Truck/><span><b>Prête au retrait / expédiée</b><small>En attente</small></span></div></div></div></main>;
}
function HelpPage() {
  const [open,setOpen]=useState(0);
  const faqs=[['Les prix affichés sont-ils définitifs ?','Non. Les prix du catalogue sont indicatifs et peuvent varier selon les arrivages et le marché. CTRL-TECH doit confirmer le prix avant toute commande.'],['Comment vérifier la disponibilité d’un appareil ?','Contactez l’équipe ou rendez-vous au magasin. La disponibilité doit être confirmée avant le déplacement ou la validation d’une commande.'],['Puis-je retirer mon achat en magasin ?','Le retrait à Avenue Maniema, Lubumbashi, est prévu dans le parcours. Les horaires et modalités restent à confirmer par le magasin.'],['Quels moyens de paiement sont acceptés ?','Le catalogue mentionne les espèces en USD et le mobile money. Les modalités exactes doivent être confirmées par CTRL-TECH.']];
  return <main className="container page-main workspace-page"><PageIntro eyebrow="ASSISTANCE" title="Comment pouvons-nous vous aider ?" description="Les réponses essentielles avant de choisir votre prochain appareil."/><div className="workspace-help-grid"><div className="workspace-panel"><h2>Questions fréquentes</h2>{faqs.map(([q,a],i)=><div className="workspace-faq" key={q}><button type="button" onClick={()=>setOpen(open===i?-1:i)}><b>{q}</b><Plus className={open===i?'rotated':''}/></button>{open===i&&<p>{a}</p>}</div>)}</div><div className="workspace-panel workspace-help-card"><Headphones size={28}/><h2>Besoin d’un conseil personnalisé ?</h2><p>Notre équipe peut vous accompagner dans le choix d’un appareil adapté à votre usage.</p><a className="button button-dark" href="https://www.google.com/maps/search/?api=1&query=Avenue+Maniema+Lubumbashi" target="_blank" rel="noreferrer">Nous trouver <ArrowRight size={16}/></a><small>Avenue Maniema · Lubumbashi</small></div></div></main>;
}
function InfoPage({ kind }: { kind: 'conditions'|'livraison'|'confidentialite' }) {
  const content={conditions:{title:'Conditions de vente',description:'Les informations commerciales à valider avant toute commande.',sections:[['Prix et devise','Les prix du catalogue sont indicatifs, affichés en dollars américains (USD), et peuvent évoluer selon les arrivages et le marché. Le prix final doit être confirmé par le magasin.'],['Produits et disponibilité','Les références sont présentées à titre de catalogue. La disponibilité, la configuration exacte et l’état du produit doivent être confirmés avant la vente.'],['Garantie et service après-vente','Les produits sont annoncés neufs et scellés avec garantie dans le catalogue de travail. La durée, les exclusions et la procédure SAV restent à préciser par CTRL-TECH.']]},livraison:{title:'Livraison et retrait',description:'Les modalités de réception sont à confirmer avec le magasin.',sections:[['Retrait en magasin','Le point de vente indiqué est Avenue Maniema, Lubumbashi. Les horaires et le processus de retrait doivent être confirmés.'],['Livraison','La couverture géographique, les frais, les délais et les transporteurs ne sont pas encore renseignés.'],['Confirmation','Aucune livraison n’est déclenchée depuis cette interface de démonstration.']]},confidentialite:{title:'Confidentialité',description:'Informations à compléter avant l’ouverture publique du service.',sections:[['Données collectées','Les formulaires de compte et de commande sont des maquettes. Aucune donnée saisie ici n’est transmise ou enregistrée.'],['Finalités et conservation','Les finalités, durées de conservation, droits des personnes et contacts responsables devront être documentés avant activation.'],['Sécurité','Les accès clients et administrateurs devront être contrôlés côté serveur avec des rôles et permissions vérifiés.']]}}[kind];
  return <main className="container page-main workspace-page"><PageIntro eyebrow="INFORMATIONS" title={content.title} description={content.description}/><DemoNotice/><div className="workspace-panel workspace-legal">{content.sections.map(([h,p])=><section key={h}><h2>{h}</h2><p>{p}</p></section>)}</div></main>;
}

function AdminShell({ title, subtitle, children }: { title:string; subtitle:string; children:React.ReactNode }) {
  return <main className="admin-layout"><aside className="admin-sidebar"><Link to="/" className="admin-brand"><span>CTRL</span>TECH<small>ADMINISTRATION</small></Link><div className="admin-nav-label">ESPACE DE GESTION</div>{adminNav.map(n=>{const Icon=n.icon;return <Link key={n.to} to={n.to} className="admin-nav-link"><Icon size={18}/>{n.label}</Link>})}<div className="admin-sidebar-bottom"><ShieldCheck/><span>Prototype d’interface<br/><small>Accès réel non activé</small></span></div></aside><section className="admin-main"><header className="admin-topbar"><span>CTRL-TECH <ChevronRight size={14}/> Administration</span><div><Bell size={18}/><span className="admin-user">CT</span></div></header><div className="admin-content"><div className="admin-heading"><div><div className="page-kicker">BACK-OFFICE / DÉMONSTRATION</div><h1>{title}</h1><p>{subtitle}</p></div><Status tone="warm">Données de démonstration</Status></div><DemoNotice/>{children}</div></section></main>;
}
function AdminDashboard() {
  return <AdminShell title="Vue d’ensemble" subtitle="Les indicateurs clés de votre activité, réunis au même endroit."><div className="admin-kpis"><div><span>Chiffre d’affaires</span><b>$12 480</b><small>Exemple de données</small></div><div><span>Commandes</span><b>48</b><small>Sur la période fictive</small></div><div><span>Produits actifs</span><b>36</b><small>Catalogue de démonstration</small></div><div><span>Stock faible</span><b>04</b><small>Seuils fictifs</small></div></div><div className="admin-dashboard-grid"><section className="workspace-panel"><div className="admin-panel-heading"><h2>Commandes récentes</h2><Link to="/admin/commandes">Tout voir <ArrowRight size={15}/></Link></div><div className="admin-list">{demoOrders.map(o=><div key={o.id}><span className="admin-order-icon"><ShoppingBag/></span><span><b>{o.id}</b><small>{o.items}</small></span><strong>{o.total}</strong><Status tone={o.status==='Livrée'?'good':'warm'}>{o.status}</Status></div>)}</div></section><section className="workspace-panel"><div className="admin-panel-heading"><h2>Accès rapides</h2></div><div className="admin-quick-links"><Link to="/admin/produits"><Package/>Gérer le catalogue<ChevronRight/></Link><Link to="/admin/stocks"><Box/>Contrôler les stocks<ChevronRight/></Link><Link to="/admin/clients"><Users/>Voir les clients<ChevronRight/></Link></div></section></div></AdminShell>;
}
function AdminProducts() {
  const rows=[['iPhone 16 Pro Max','Apple','Smartphones','$1 250','Publié'],['Galaxy S25 Ultra','Samsung','Smartphones','$1 250','Publié'],['MacBook Pro 14” M4','Apple','Ordinateurs','$1 700','Brouillon'],['ASUS Vivobook 16','ASUS','Ordinateurs','$800','Publié']];
  return <AdminShell title="Produits" subtitle="Préparez le catalogue, ses variantes et ses informations commerciales."><div className="admin-toolbar"><div className="catalogue-search"><Search size={17}/><input placeholder="Rechercher un produit…" aria-label="Rechercher un produit"/></div><button className="button button-dark" disabled><Plus size={16}/> Ajouter un produit</button></div><div className="workspace-panel workspace-table-wrap"><table className="workspace-table"><thead><tr><th>Produit</th><th>Marque</th><th>Catégorie</th><th>Prix indicatif</th><th>Publication</th><th></th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><Status tone={r[4]==='Publié'?'good':'neutral'}>{r[4]}</Status></td><td><button className="admin-icon-button" disabled aria-label="Modifier"><Settings size={16}/></button></td></tr>)}</tbody></table></div></AdminShell>;
}
function AdminOrders() {
  return <AdminShell title="Commandes" subtitle="Visualisez les demandes et suivez leur traitement."><div className="admin-toolbar"><div className="catalogue-search"><Search size={17}/><input placeholder="Référence, client ou statut…" aria-label="Rechercher une commande"/></div><button className="workspace-filter" disabled>Filtrer les commandes</button></div><div className="workspace-panel workspace-table-wrap"><table className="workspace-table"><thead><tr><th>Référence</th><th>Date</th><th>Client</th><th>Total</th><th>Statut</th></tr></thead><tbody><tr><td><b>CT-2026-0048</b></td><td>04 nov. 2026</td><td>Client démo A</td><td>$1 250</td><td><Status tone="warm">En préparation</Status></td></tr><tr><td><b>CT-2026-0031</b></td><td>21 oct. 2026</td><td>Client démo B</td><td>$800</td><td><Status tone="good">Livrée</Status></td></tr><tr><td><b>CT-2026-0022</b></td><td>12 oct. 2026</td><td>Client démo C</td><td>$160</td><td><Status tone="good">Livrée</Status></td></tr></tbody></table></div></AdminShell>;
}
function AdminStock() {
  const rows=[['iPhone 16 Pro Max','IPH-16PM-256','02','05','À réapprovisionner'],['Galaxy S25 Ultra','SAM-S25U-256','08','04','Normal'],['MacBook Air 13 M4','MBA-M4-16-256','01','03','À réapprovisionner'],['AirPods 4','APP-AIR4','12','05','Normal']];
  return <AdminShell title="Stocks & inventaire" subtitle="Surveillez les quantités disponibles et les seuils d’alerte."><div className="admin-kpis compact"><div><span>Références suivies</span><b>36</b></div><div><span>Alertes de stock</span><b>02</b></div><div><span>Valeur du stock</span><b>À calculer</b></div></div><div className="workspace-panel workspace-table-wrap"><table className="workspace-table"><thead><tr><th>Produit</th><th>SKU</th><th>Quantité</th><th>Seuil</th><th>État</th></tr></thead><tbody>{rows.map(r=><tr key={r[1]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><Status tone={r[4]==='Normal'?'good':'warm'}>{r[4]}</Status></td></tr>)}</tbody></table></div></AdminShell>;
}
function AdminClients() {
  return <AdminShell title="Clients & accès" subtitle="La gestion des utilisateurs et des rôles sera contrôlée par le backend."><div className="workspace-panel workspace-placeholder"><Users size={34}/><h2>Gestion des comptes clients et collaborateurs</h2><p>Cette vue définit le point d’entrée pour les profils, les rôles RBAC, les invitations et les journaux d’accès. Les données personnelles ne sont pas exposées dans cette maquette.</p><Status tone="warm">Clerk + RBAC requis</Status></div></AdminShell>;
}
function AdminSettings() {
  return <AdminShell title="Paramètres" subtitle="Les réglages opérationnels et commerciaux de CTRL-TECH."><div className="workspace-settings-grid">{[['Identité du magasin','Nom, logo, adresse et contacts'],['Règles commerciales','Prix, devise, garanties et retours'],['Livraison & retrait','Zones, frais et délais'],['Paiements','Moyens acceptés et rapprochement'],['Sécurité','Rôles, permissions et sessions'],['Notifications','E-mails et alertes opérationnelles']].map(([h,p])=><div className="workspace-panel" key={h}><Settings/><h3>{h}</h3><p>{p}</p><Status tone="warm">À configurer</Status></div>)}</div></AdminShell>;
}

export function ExtendedRoutes() {
  return <Routes>
    <Route path="/commande" element={<CheckoutPage/>}/>
    <Route path="/compte" element={<AccountPage/>}/>
    <Route path="/compte/commandes" element={<OrdersPage/>}/>
    <Route path="/compte/commandes/:id" element={<OrderDetailPage/>}/>
    <Route path="/aide" element={<HelpPage/>}/>
    <Route path="/conditions" element={<InfoPage kind="conditions"/>}/>
    <Route path="/livraison-retours" element={<InfoPage kind="livraison"/>}/>
    <Route path="/confidentialite" element={<InfoPage kind="confidentialite"/>}/>
    <Route path="/admin" element={<AdminDashboard/>}/>
    <Route path="/admin/produits" element={<AdminProducts/>}/>
    <Route path="/admin/commandes" element={<AdminOrders/>}/>
    <Route path="/admin/stocks" element={<AdminStock/>}/>
    <Route path="/admin/clients" element={<AdminClients/>}/>
    <Route path="/admin/parametres" element={<AdminSettings/>}/>
  </Routes>;
}
