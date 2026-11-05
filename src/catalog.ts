export type Product = { id:string; name:string; brand:string; category:string; price:number; description:string; specs:string[]; image:string; featured?:boolean; };
const image={
  "phone": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=85",
  "laptop": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
  "tablet": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=85",
  "accessory": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=85"
};
export const categories=[
  {
    "name": "Smartphones",
    "count": "iPhone & Galaxy",
    "icon": "smartphone",
    "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=85"
  },
  {
    "name": "Ordinateurs",
    "count": "Performance & mobilité",
    "icon": "laptop",
    "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85"
  },
  {
    "name": "Tablettes",
    "count": "Création & productivité",
    "icon": "tablet",
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=85"
  },
  {
    "name": "Accessoires",
    "count": "Audio, charge & stockage",
    "icon": "headphones",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=85"
  }
];
export const products:Product[]=[
 {id:"iphone-15",name:"iPhone 15",brand:"Apple",category:"Smartphones",price:650,description:"Puce A16 Bionic, écran OLED 6,1 pouces, appareil photo 48 Mpx et USB-C.",specs:["A16 Bionic","OLED 6,1″","128 Go"],image:image.phone},
 {id:"iphone-16",name:"iPhone 16",brand:"Apple",category:"Smartphones",price:800,description:"Puce A18, écran OLED 6,1 pouces et bouton Contrôle de l’appareil photo.",specs:["A18","OLED 6,1″","128 Go"],image:image.phone,featured:true},
 {id:"iphone-16-plus",name:"iPhone 16 Plus",brand:"Apple",category:"Smartphones",price:900,description:"Puce A18, grand écran OLED 6,7 pouces et grande autonomie.",specs:["A18","OLED 6,7″","128 Go"],image:image.phone},
 {id:"iphone-16-pro",name:"iPhone 16 Pro",brand:"Apple",category:"Smartphones",price:1100,description:"Puce A18 Pro, écran ProMotion et triple capteur photo.",specs:["A18 Pro","OLED ProMotion 6,3″","256 Go"],image:image.phone},
 {id:"iphone-16-pro-max",name:"iPhone 16 Pro Max",brand:"Apple",category:"Smartphones",price:1250,description:"Puce A18 Pro, écran OLED 6,9 pouces et zoom optique 5x.",specs:["A18 Pro","OLED 6,9″","256 Go"],image:image.phone},
 {id:"iphone-17",name:"iPhone 17",brand:"Apple",category:"Smartphones",price:950,description:"Puce A19, écran OLED 6,3 pouces 120 Hz et double capteur 48 Mpx.",specs:["A19","OLED 6,3″ 120 Hz","256 Go"],image:image.phone},
 {id:"iphone-17-pro",name:"iPhone 17 Pro",brand:"Apple",category:"Smartphones",price:1300,description:"Puce A19 Pro, écran OLED 6,3 pouces et triple capteur 48 Mpx.",specs:["A19 Pro","OLED 6,3″","256 Go"],image:image.phone,featured:true},
 {id:"iphone-17-pro-max",name:"iPhone 17 Pro Max",brand:"Apple",category:"Smartphones",price:1450,description:"Puce A19 Pro, écran OLED 6,9 pouces et triple capteur 48 Mpx.",specs:["A19 Pro","OLED 6,9″","256 Go"],image:image.phone},
 {id:"galaxy-s25",name:"Galaxy S25",brand:"Samsung",category:"Smartphones",price:800,description:"Snapdragon 8 Elite, écran AMOLED 120 Hz et fonctions Galaxy AI.",specs:["Snapdragon 8 Elite","AMOLED 6,2″ 120 Hz","12 Go / 256 Go"],image:image.phone,featured:true},
 {id:"galaxy-s25-plus",name:"Galaxy S25+",brand:"Samsung",category:"Smartphones",price:950,description:"Snapdragon 8 Elite, écran AMOLED QHD+ et charge 45 W.",specs:["Snapdragon 8 Elite","AMOLED 6,7″ QHD+","12 Go / 256 Go"],image:image.phone},
 {id:"galaxy-s25-ultra",name:"Galaxy S25 Ultra",brand:"Samsung",category:"Smartphones",price:1250,description:"Snapdragon 8 Elite, capteur 200 Mpx et S Pen intégré.",specs:["Snapdragon 8 Elite","AMOLED 6,9″","12 Go / 256 Go"],image:image.phone,featured:true},
 {id:"galaxy-z-flip7",name:"Galaxy Z Flip7",brand:"Samsung",category:"Smartphones",price:1050,description:"Smartphone pliable au format clapet avec écran externe.",specs:["Écran pliable 6,9″","Écran externe 4,1″","12 Go / 256 Go"],image:image.phone},
 {id:"galaxy-z-fold7",name:"Galaxy Z Fold7",brand:"Samsung",category:"Smartphones",price:1900,description:"Smartphone pliable grand format avec écran interne de 8 pouces.",specs:["Écran pliable 8″","Écran externe 6,5″","12 Go / 256 Go"],image:image.phone},
 {id:"ipad-pro-m4",name:"Apple iPad Pro 11″ M4",brand:"Apple",category:"Tablettes",price:1280,description:"Tablette équipée de la puce M4 et de l’écran Ultra Retina XDR.",specs:["Puce Apple M4","Ultra Retina XDR 11″","256 Go"],image:image.tablet,featured:true},
 {id:"galaxy-tab-s10-ultra",name:"Samsung Galaxy Tab S10 Ultra",brand:"Samsung",category:"Tablettes",price:1080,description:"Tablette Android grand format avec 12 Go de RAM et 256 Go de stockage.",specs:["Écran 14,6″","12 Go RAM","256 Go"],image:image.tablet},
 {id:"proline-business-i5",name:"Proline Business 15 Core i5",brand:"Proline",category:"Ordinateurs",price:600,description:"Ordinateur portable 15,6 pouces pour la bureautique et les études.",specs:["Intel Core i5","8 Go RAM / 512 Go SSD","Écran 15,6″ Full HD"],image:image.laptop},
 {id:"proline-business-i7",name:"Proline Business 15 Core i7",brand:"Proline",category:"Ordinateurs",price:750,description:"Ordinateur portable Core i7 pour la bureautique avancée.",specs:["Intel Core i7","16 Go RAM / 512 Go SSD","Écran 15,6″ Full HD"],image:image.laptop},
 {id:"proline-pro-16",name:"Proline Pro 16 Core i7",brand:"Proline",category:"Ordinateurs",price:900,description:"Ordinateur 16 pouces avec châssis métallique et lecteur d’empreinte.",specs:["Intel Core i7","16 Go RAM / 1 To SSD","Écran 16″ WUXGA"],image:image.laptop},
 {id:"asus-vivobook-15",name:"ASUS Vivobook 15",brand:"ASUS",category:"Ordinateurs",price:650,description:"Portable polyvalent avec processeur Intel Core i5 de 13e génération.",specs:["Intel Core i5 13e gén.","16 Go RAM / 512 Go SSD","Écran 15,6″ Full HD"],image:image.laptop,featured:true},
 {id:"asus-vivobook-16",name:"ASUS Vivobook 16",brand:"ASUS",category:"Ordinateurs",price:800,description:"Portable 16 pouces équipé d’un processeur AMD Ryzen 7.",specs:["AMD Ryzen 7","16 Go RAM / 512 Go SSD","Écran 16″ WUXGA"],image:image.laptop},
 {id:"asus-vivobook-s14",name:"ASUS Vivobook S 14 OLED",brand:"ASUS",category:"Ordinateurs",price:1100,description:"Portable premium avec écran OLED 3K de 14 pouces.",specs:["Intel Core Ultra 7","16 Go RAM / 1 To SSD","OLED 14″ 3K"],image:image.laptop},
 {id:"asus-zenbook-14",name:"ASUS Zenbook 14 OLED",brand:"ASUS",category:"Ordinateurs",price:1200,description:"Ultraportable OLED 120 Hz au format léger.",specs:["Intel Core Ultra 7","16 Go RAM / 1 To SSD","OLED 14″ 120 Hz"],image:image.laptop,featured:true},
 {id:"asus-tuf-f15",name:"ASUS TUF Gaming F15",brand:"ASUS",category:"Ordinateurs",price:1100,description:"Portable robuste équipé d’une carte graphique RTX 4050.",specs:["Intel Core i7 / RTX 4050","16 Go RAM / 512 Go SSD","Écran 15,6″ 144 Hz"],image:image.laptop},
 {id:"lenovo-ideapad-slim-3",name:"Lenovo IdeaPad Slim 3",brand:"Lenovo",category:"Ordinateurs",price:620,description:"Portable fin et léger pour les usages quotidiens.",specs:["Intel Core i5","16 Go RAM / 512 Go SSD","Écran 15,6″ Full HD"],image:image.laptop},
 {id:"lenovo-thinkpad-e14",name:"Lenovo ThinkPad E14",brand:"Lenovo",category:"Ordinateurs",price:950,description:"Ordinateur professionnel avec clavier ThinkPad et sécurité renforcée.",specs:["Intel Core i7","16 Go RAM / 512 Go SSD","Écran 14″ WUXGA"],image:image.laptop},
 {id:"lenovo-yoga-slim-7",name:"Lenovo Yoga Slim 7",brand:"Lenovo",category:"Ordinateurs",price:1200,description:"Portable premium avec écran OLED et châssis aluminium.",specs:["Intel Core Ultra 7","16 Go RAM / 1 To SSD","OLED 14″"],image:image.laptop},
 {id:"lenovo-legion-5",name:"Lenovo Legion 5",brand:"Lenovo",category:"Ordinateurs",price:1350,description:"Portable orienté jeu avec RTX 4060 et écran 165 Hz.",specs:["AMD Ryzen 7 / RTX 4060","16 Go RAM / 1 To SSD","Écran 15,6″ 165 Hz"],image:image.laptop},
 {id:"dell-inspiron-15",name:"Dell Inspiron 15",brand:"Dell",category:"Ordinateurs",price:650,description:"Portable polyvalent pour les usages quotidiens et professionnels.",specs:["Intel Core i5","16 Go RAM / 512 Go SSD","Écran 15,6″ Full HD"],image:image.laptop},
 {id:"dell-latitude-5440",name:"Dell Latitude 5440",brand:"Dell",category:"Ordinateurs",price:1000,description:"Portable professionnel robuste avec fonctions de sécurité dédiées.",specs:["Intel Core i7","16 Go RAM / 512 Go SSD","Écran 14″ Full HD"],image:image.laptop},
 {id:"dell-xps-13",name:"Dell XPS 13",brand:"Dell",category:"Ordinateurs",price:1500,description:"Ultraportable compact avec écran InfinityEdge.",specs:["Intel Core Ultra 7","16 Go RAM / 512 Go SSD","Écran 13,4″"],image:image.laptop},
 {id:"hp-15",name:"HP 15",brand:"HP",category:"Ordinateurs",price:600,description:"Portable léger pour les études et la bureautique.",specs:["Intel Core i5","8 Go RAM / 512 Go SSD","Écran 15,6″ Full HD"],image:image.laptop},
 {id:"hp-pavilion-15",name:"HP Pavilion 15",brand:"HP",category:"Ordinateurs",price:850,description:"Portable Core i7 avec haut-parleurs Bang & Olufsen.",specs:["Intel Core i7","16 Go RAM / 512 Go SSD","Écran 15,6″ Full HD"],image:image.laptop},
 {id:"hp-victus-16",name:"HP Victus 16",brand:"HP",category:"Ordinateurs",price:1000,description:"Portable avec RTX 4050 pour le jeu et la création.",specs:["Intel Core i5 / RTX 4050","16 Go RAM / 512 Go SSD","Écran 16,1″ 144 Hz"],image:image.laptop},
 {id:"hp-elitebook-840-g10",name:"HP EliteBook 840 G10",brand:"HP",category:"Ordinateurs",price:1250,description:"Portable professionnel avec sécurité avancée.",specs:["Intel Core i7","16 Go RAM / 512 Go SSD","Écran 14″ WUXGA"],image:image.laptop},
 {id:"hp-spectre-x360-14",name:"HP Spectre x360 14",brand:"HP",category:"Ordinateurs",price:1600,description:"Portable convertible 2-en-1 avec écran OLED tactile.",specs:["Intel Core Ultra 7","16 Go RAM / 1 To SSD","OLED tactile 14″"],image:image.laptop},
 {id:"macbook-air-13-m4",name:"MacBook Air 13″ M4",brand:"Apple",category:"Ordinateurs",price:1050,description:"Portable Apple Silicon pour les études et la mobilité.",specs:["Apple M4","16 Go RAM / 256 Go SSD","Liquid Retina 13,6″"],image:image.laptop},
 {id:"macbook-air-15-m4",name:"MacBook Air 15″ M4",brand:"Apple",category:"Ordinateurs",price:1350,description:"Portable Apple Silicon avec grand confort visuel.",specs:["Apple M4","16 Go RAM / 512 Go SSD","Liquid Retina 15,3″"],image:image.laptop},
 {id:"macbook-pro-14-m4",name:"MacBook Pro 14″ M4",brand:"Apple",category:"Ordinateurs",price:1700,description:"Portable professionnel avec écran Liquid Retina XDR.",specs:["Apple M4","16 Go RAM / 512 Go SSD","Liquid Retina XDR 14,2″"],image:image.laptop},
 {id:"macbook-pro-14-m4-pro",name:"MacBook Pro 14″ M4 Pro",brand:"Apple",category:"Ordinateurs",price:2100,description:"Configuration M4 Pro pour les tâches exigeantes.",specs:["Apple M4 Pro","24 Go RAM / 512 Go SSD","Liquid Retina XDR 14,2″"],image:image.laptop},
 {id:"macbook-pro-16-m4-pro",name:"MacBook Pro 16″ M4 Pro",brand:"Apple",category:"Ordinateurs",price:2600,description:"Portable grand format pour les workflows intensifs.",specs:["Apple M4 Pro","24 Go RAM / 512 Go SSD","Liquid Retina XDR 16,2″"],image:image.laptop},
 {id:"airpods-4",name:"AirPods 4",brand:"Apple",category:"Accessoires",price:160,description:"Écouteurs sans fil avec audio spatial et boîtier USB-C.",specs:["Audio spatial","Boîtier USB-C","Sans fil"],image:image.accessory},
 {id:"airpods-pro-2",name:"AirPods Pro 2",brand:"Apple",category:"Accessoires",price:250,description:"Écouteurs avec réduction active du bruit et mode transparence.",specs:["Réduction active du bruit","Mode Transparence","Boîtier MagSafe"],image:image.accessory},
 {id:"apple-watch-series-11",name:"Apple Watch Series 11",brand:"Apple",category:"Accessoires",price:450,description:"Montre connectée avec suivi santé et sport.",specs:["Suivi santé et sport","Écran toujours actif","Connectivité sans fil"],image:image.accessory},
 {id:"galaxy-buds3-pro",name:"Galaxy Buds3 Pro",brand:"Samsung",category:"Accessoires",price:230,description:"Écouteurs Samsung avec réduction de bruit intelligente.",specs:["Réduction de bruit intelligente","Son Hi-Fi","Sans fil"],image:image.accessory},
 {id:"galaxy-watch8",name:"Galaxy Watch8",brand:"Samsung",category:"Accessoires",price:380,description:"Montre connectée Samsung sous Wear OS.",specs:["Wear OS","Suivi santé et sport","Écran connecté"],image:image.accessory},
 {id:"sony-wh-1000xm5",name:"Sony WH-1000XM5",brand:"Sony",category:"Accessoires",price:350,description:"Casque sans fil avec réduction de bruit et autonomie annoncée de 30 heures.",specs:["Réduction de bruit","Jusqu’à 30 h","Bluetooth"],image:image.accessory},
 {id:"logitech-mx-master-3s",name:"Souris Logitech MX Master 3S",brand:"Logitech",category:"Accessoires",price:110,description:"Souris ergonomique silencieuse multi-appareils.",specs:["Ergonomique","Clics silencieux","Multi-appareils"],image:image.accessory},
 {id:"samsung-t7-1tb",name:"SSD externe Samsung T7 1 To",brand:"Samsung",category:"Accessoires",price:120,description:"Stockage portable USB 3.2 avec débit annoncé jusqu’à 1 050 Mo/s.",specs:["1 To","USB 3.2","Jusqu’à 1 050 Mo/s"],image:image.accessory},
 {id:"anker-20000",name:"Batterie externe Anker 20 000 mAh",brand:"Anker",category:"Accessoires",price:60,description:"Batterie externe avec charge rapide USB-C.",specs:["20 000 mAh","USB-C","Charge rapide"],image:image.accessory},
 {id:"charger-65w-gan",name:"Chargeur rapide 65 W GaN",brand:"Générique",category:"Accessoires",price:45,description:"Chargeur compact USB-C pour ordinateurs portables et smartphones.",specs:["65 W","GaN","USB-C"],image:image.accessory},
 {id:"usb-c-hub-7in1",name:"Hub USB-C 7-en-1",brand:"Générique",category:"Accessoires",price:50,description:"Hub USB-C avec HDMI 4K, USB 3.0, lecteur SD et Power Delivery.",specs:["HDMI 4K","USB 3.0 / lecteur SD","Power Delivery"],image:image.accessory},
 {id:"laptop-backpack-156",name:"Sac à dos pour laptop 15,6″",brand:"Générique",category:"Accessoires",price:65,description:"Sac à dos anti-choc et imperméable avec compartiment antivol.",specs:["Jusqu’à 15,6″","Anti-choc","Imperméable"],image:image.accessory},
];
export const formatPrice=(price:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(price);
