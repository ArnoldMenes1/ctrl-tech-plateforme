export type Product = {
  id: string; name: string; brand: string; category: string; price: number;
  description: string; specs: string[]; image: string; featured?: boolean;
};

const image = {
  phone: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=85',
  laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85',
  tablet: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=85',
  audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85',
  accessory: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=85',
};

export const categories = [
  { name: 'Smartphones', count: 'iPhone & Galaxy', icon: 'smartphone', image: image.phone },
  { name: 'Ordinateurs', count: 'Performance & mobilité', icon: 'laptop', image: image.laptop },
  { name: 'Tablettes', count: 'Création & productivité', icon: 'tablet', image: image.tablet },
  { name: 'Accessoires', count: 'Audio, charge & stockage', icon: 'headphones', image: image.accessory },
];

export const products: Product[] = [
  { id:'iphone-17-pro', name:'iPhone 17 Pro', brand:'Apple', category:'Smartphones', price:1300, description:'Une expérience mobile haut de gamme, pensée pour la création et la performance.', specs:['A19 Pro','Écran OLED 6,3″','256 Go'], image:image.phone, featured:true },
  { id:'galaxy-s25-ultra', name:'Galaxy S25 Ultra', brand:'Samsung', category:'Smartphones', price:1250, description:'Puissance Galaxy AI, grand écran et polyvalence photo.', specs:['Snapdragon 8 Elite','AMOLED 6,9″','12 Go / 256 Go'], image:image.phone, featured:true },
  { id:'macbook-air-m4', name:'MacBook Air 13″ M4', brand:'Apple', category:'Ordinateurs', price:1050, description:'Un ordinateur fin et polyvalent pour les études et le travail.', specs:['Apple M4','16 Go RAM','256 Go SSD'], image:image.laptop, featured:true },
  { id:'asus-zenbook-14', name:'ASUS Zenbook 14 OLED', brand:'ASUS', category:'Ordinateurs', price:1200, description:'Un format compact avec écran OLED pour les usages exigeants.', specs:['Core Ultra 7','OLED 14″ 120 Hz','16 Go / 1 To SSD'], image:image.laptop, featured:true },
  { id:'ipad-pro-m4', name:'iPad Pro 11″ M4', brand:'Apple', category:'Tablettes', price:1280, description:'Une tablette premium pour la création, les études et la mobilité.', specs:['Puce Apple M4','Ultra Retina XDR','256 Go'], image:image.tablet },
  { id:'galaxy-tab-s10-ultra', name:'Galaxy Tab S10 Ultra', brand:'Samsung', category:'Tablettes', price:1080, description:'Grand écran et espace de travail Android.', specs:['Écran 14,6″','12 Go RAM','256 Go'], image:image.tablet },
  { id:'airpods-pro-2', name:'AirPods Pro 2', brand:'Apple', category:'Accessoires', price:250, description:'Écoute sans fil avec réduction active du bruit.', specs:['Réduction de bruit','Mode Transparence','Boîtier MagSafe'], image:image.accessory },
  { id:'sony-xm5', name:'Sony WH-1000XM5', brand:'Sony', category:'Accessoires', price:350, description:'Casque sans fil à réduction de bruit.', specs:['Réduction de bruit','Jusqu’à 30 h','Bluetooth'], image:image.accessory },
  { id:'proline-business-i5', name:'Proline Business 15 Core i5', brand:'Proline', category:'Ordinateurs', price:600, description:'Une configuration équilibrée pour la bureautique et les études.', specs:['Intel Core i5','8 Go RAM','512 Go SSD'], image:image.laptop },
  { id:'asus-vivobook-15', name:'ASUS Vivobook 15', brand:'ASUS', category:'Ordinateurs', price:650, description:'Un portable polyvalent pour les usages quotidiens.', specs:['Intel Core i5 13e gén.','16 Go RAM','512 Go SSD'], image:image.laptop },
  { id:'lenovo-thinkpad-e14', name:'Lenovo ThinkPad E14', brand:'Lenovo', category:'Ordinateurs', price:950, description:'Un ordinateur professionnel conçu pour la mobilité.', specs:['Intel Core i7','14″ WUXGA','16 Go / 512 Go SSD'], image:image.laptop },
  { id:'dell-xps-13', name:'Dell XPS 13', brand:'Dell', category:'Ordinateurs', price:1500, description:'Un ultraportable premium au format compact.', specs:['Intel Core Ultra 7','13,4″ InfinityEdge','16 Go / 512 Go SSD'], image:image.laptop },
  { id:'hp-victus-16', name:'HP Victus 16', brand:'HP', category:'Ordinateurs', price:1000, description:'Une configuration orientée jeu et création.', specs:['Intel Core i5','RTX 4050','16 Go / 512 Go SSD'], image:image.laptop },
  { id:'macbook-pro-14-m4', name:'MacBook Pro 14″ M4', brand:'Apple', category:'Ordinateurs', price:1700, description:'Des performances soutenues pour les workflows créatifs.', specs:['Apple M4','Liquid Retina XDR','16 Go / 512 Go SSD'], image:image.laptop },
  { id:'galaxy-s25', name:'Galaxy S25', brand:'Samsung', category:'Smartphones', price:800, description:'Un smartphone compact avec les fonctions Galaxy AI.', specs:['Snapdragon 8 Elite','AMOLED 6,2″ 120 Hz','12 Go / 256 Go'], image:image.phone },
  { id:'iphone-16', name:'iPhone 16', brand:'Apple', category:'Smartphones', price:800, description:'La puce A18 et un appareil photo polyvalent.', specs:['A18','OLED 6,1″','128 Go'], image:image.phone },
  { id:'airpods-4', name:'AirPods 4', brand:'Apple', category:'Accessoires', price:160, description:'Des écouteurs sans fil au format compact.', specs:['Audio spatial','Boîtier USB-C','Sans fil'], image:image.accessory },
  { id:'anker-powerbank', name:'Batterie externe Anker 20 000 mAh', brand:'Anker', category:'Accessoires', price:60, description:'Une réserve d’énergie pour les déplacements.', specs:['20 000 mAh','Charge USB-C','Charge rapide'], image:image.accessory },
];

export const formatPrice = (price: number) => new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(price);