/* ========================================
   Elektronik Ticarət Mərkəzi — script.js
   ======================================== */

// ===== PRODUCT DATA =====
const summaryFreeShippingNote = document.getElementById('freeShippingNote');
const summaryFreeShippingText = document.getElementById('freeShippingText');
const loadMoreWrapper = document.getElementById('loadMoreWrapper');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// ===== CATALOG GENERATION =====
// Hər kateqoriya üçün 120 məhsul generasiya olunur
const PAGE_SIZE = 24;
let visibleCount = PAGE_SIZE;

const catalogBrands = {
  smartfonlar: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Oppo', 'Realme'],
  noutbuklar: ['Apple', 'ASUS', 'Lenovo', 'HP', 'Dell', 'MSI'],
  aksesuarlar: ['Apple', 'JBL', 'Anker', 'Logitech', 'Baseus', 'Sony'],
  'mehset-texnikasi': ['Bosch', 'Samsung', 'LG', 'Beko', 'Philips', 'Braun'],
  televizorlar: ['Samsung', 'LG', 'Sony', 'Philips', 'TCL', 'Hisense'],
  kondisionerler: ['Daikin', 'Mitsubishi', 'LG', 'Samsung', 'Gree', 'Midea'],
  aspiratorlar: ['Bosch', 'Siemens', 'Electrolux', 'Beko', 'Gorenje', 'Teka'],
  soyuducular: ['Samsung', 'LG', 'Bosch', 'Beko', 'Indesit', 'Arçelik'],
  fenler: ['Philips', 'Braun', 'Remington', 'Dyson', 'Bosch', 'Xiaomi'],
  'sok-cekenler': ['Dyson', 'Samsung', 'Xiaomi', 'Bosch', 'Philips', 'Karcher'],
  pecliler: ['Bosch', 'Ariston', 'Arcelik', 'Gorenje', 'Samsung', 'Vestel'],
  'et-cekenler': ['Bosch', 'Philips', 'Moulinex', 'Tefal', 'Scarlett', 'Kitfort'],
  utuler: ['Philips', 'Tefal', 'Braun', 'Bosch', 'Rowenta', 'Scarlett'],
  blenderler: ['Philips', 'Bosch', 'Braun', 'Tefal', 'Moulinex', 'Xiaomi'],
  tosterler: ['Philips', 'Bosch', 'Braun', 'Tefal', 'Moulinex', 'Scarlett'],
  plansetler: ['Apple', 'Samsung', 'Xiaomi', 'Lenovo', 'Huawei', 'Redmi'],
  'elektron-kitablar': ['Amazon', 'PocketBook', 'Kobo', 'Xiaomi', 'Digma', 'Onyx'],
  'robot-supurgerler': ['Xiaomi', 'iRobot', 'Samsung', 'Ecovacs', 'Roborock', 'Karcher'],
  'mikro-dalga': ['Samsung', 'LG', 'Bosch', 'Beko', 'Midea', 'Gorenje'],
  proyektorlar: ['Epson', 'BenQ', 'XGIMI', 'Anker', 'LG', 'Acer'],
  kameralar: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'GoPro'],
  dronlar: ['DJI', 'Autel', 'Hubsan', 'Parrot', 'Ryze', 'Xiaomi'],
  printerler: ['HP', 'Canon', 'Epson', 'Brother', 'Xerox', 'Pantum'],
  skaynerler: ['Epson', 'Canon', 'Brother', 'HP', 'Fujitsu', 'Xerox'],
  monitorlar: ['Samsung', 'LG', 'Dell', 'ASUS', 'AOC', 'BenQ'],
};

const catalogModels = {
  smartfonlar: [
    { name: 'iPhone 15 Pro 256GB', spec: '6.1" Super Retina XDR, A17 Pro, 48MP kamera, Titan gövdə', price: 2899, oldPrice: 3299 },
    { name: 'iPhone 15 128GB', spec: '6.1" Super Retina XDR, A16 Bionic, 48MP kamera, Dynamic Island', price: 2199, oldPrice: 2499 },
    { name: 'iPhone 14 128GB', spec: '6.1" Super Retina XDR, A15 Bionic, 12MP kamera, Face ID', price: 1799, oldPrice: 2099 },
    { name: 'Galaxy S24 Ultra 512GB', spec: '6.8" AMOLED, Snapdragon 8 Gen 3, 200MP kamera, S Pen', price: 2399, oldPrice: 2699 },
    { name: 'Galaxy S24+ 256GB', spec: '6.7" AMOLED, Exynos 2400, 50MP kamera, 45W şarj', price: 1999, oldPrice: 2299 },
    { name: 'Galaxy A55 128GB', spec: '6.6" AMOLED, Exynos 1480, 50MP kamera, IP67', price: 699, oldPrice: 849 },
    { name: 'Redmi Note 13 Pro 256GB', spec: '6.67" AMOLED, Snapdragon 7s, 200MP kamera, 67W şarj', price: 549, oldPrice: 699 },
    { name: 'Redmi 13C 128GB', spec: '6.74" HD+, Helio G85, 50MP kamera, 5000mAh', price: 279, oldPrice: 349 },
  ],
  noutbuklar: [
    { name: 'MacBook Pro M3 14"', spec: 'Apple M3 Pro, 18GB RAM, 512GB SSD, Liquid Retina XDR', price: 5299, oldPrice: 5799 },
    { name: 'MacBook Air M2 13"', spec: 'Apple M2, 8GB RAM, 256GB SSD, Retina ekran, 18 saat batareya', price: 3299, oldPrice: 3699 },
    { name: 'ASUS ROG Strix G16', spec: 'Intel i9-14900HX, RTX 4070, 16GB RAM, 1TB SSD, 16" 240Hz', price: 4599, oldPrice: 5199 },
    { name: 'ASUS Vivobook 15', spec: 'Intel i5-1335U, 16GB RAM, 512GB SSD, 15.6" FHD', price: 1299, oldPrice: 1499 },
    { name: 'Lenovo IdeaPad Slim 3', spec: 'AMD Ryzen 5, 8GB RAM, 256GB SSD, 15.6" FHD', price: 899, oldPrice: 1099 },
    { name: 'HP Pavilion 15', spec: 'Intel i7-1355U, 16GB RAM, 1TB SSD, 15.6" FHD', price: 1599, oldPrice: 1899 },
    { name: 'Dell XPS 13 Plus', spec: 'Intel i7-1360P, 16GB RAM, 512GB SSD, 13.4" OLED', price: 3799, oldPrice: 4299 },
    { name: 'MSI Katana 15', spec: 'Intel i7-13620H, RTX 4060, 16GB RAM, 512GB SSD, 15.6" 144Hz', price: 2899, oldPrice: 3299 },
  ],
  aksesuarlar: [
    { name: 'AirPods Pro 2 (USB-C)', spec: 'Aktiv səs-kəsilmə, Spatial Audio, adaptiv şəffaflıq, MagSafe', price: 549, oldPrice: 699 },
    { name: 'Apple Watch Series 9', spec: '45mm GPS, Always-On Retina, S9 chip, ECG, qan oksigen sensoru', price: 1299, oldPrice: 1499 },
    { name: 'JBL Charge 5 Speaker', spec: 'Suya davamlı, 20 saat batareya, PartBoost, güclü bass', price: 459, oldPrice: 599 },
    { name: 'Anker PowerCore 20000mAh', spec: 'PD 65W şarj, 3 port, rəqəmsal ekran', price: 129, oldPrice: 169 },
    { name: 'Logitech MX Master 3S', spec: '8000 DPI, 7 düymə, USB-C, susuz klik', price: 189, oldPrice: 239 },
    { name: 'Sony WH-1000XM5', spec: 'Səviyyəli səs-kəsilmə, 30 saat batareya, LDAC', price: 749, oldPrice: 899 },
    { name: 'Baseus MacBook Stendi', spec: 'Alüminium, 360° dövr, 16\"-a qədər dəstək', price: 79, oldPrice: 99 },
    { name: 'iPad Air 11" M2', spec: 'Apple M2, 128GB, 11" Liquid Retina, Apple Pencil Pro dəstəkli', price: 1899, oldPrice: 2199 },
  ],
  'mehset-texnikasi': [
    { name: 'Bosch Seriе 6 Pəncərə', spec: 'A+++ enerji, 8 kq yuyuma, 1400 d/d, EcoSilence', price: 1099, oldPrice: 1299 },
    { name: 'LG FV1450S Pəncərə', spec: 'AI DD mühərrik, 9 kq, Steam+, Wi-Fi idarəetmə', price: 1249, oldPrice: 1499 },
    { name: 'Beko Microwave', spec: '25 litr, 900W, grill funksiyası, rəqəmsal ekran', price: 249, oldPrice: 329 },
    { name: 'Philips Tost Mashın', spec: '2 dilim, 7 qədər, çökmə əleyhinə, heated toast', price: 89, oldPrice: 119 },
    { name: 'Braun Çaydan', spec: '1.7 litr, 2200W, filtr, səs-kəs salan göstərici', price: 79, oldPrice: 109 },
    { name: 'Samsung Robot Süpürgə', spec: 'LiDAR naviqasiya, 5500Pa sorulma, Wi-Fi, mopping', price: 899, oldPrice: 1199 },
    { name: 'LG Dishwasher', spec: '14 yerlik, QuadWash, ThinQ Wi-Fi, A++ enerji', price: 1099, oldPrice: 1349 },
    { name: 'Bosch Blender', spec: '1000W, 2.3 litr şüşə, 4 bıçaq, 15000 d/d', price: 189, oldPrice: 249 },
  ],
  televizorlar: [
    { name: 'Samsung 55" QN90C Neo QLED 4K', spec: '4K QLED, 120Hz, HDR10+, Object Tracking Sound, Tizen OS', price: 3299, oldPrice: 3899 },
    { name: 'LG 65" OLED C3 4K', spec: 'OLED evo, 120Hz, Dolby Vision, α9 AI Processor, webOS', price: 4999, oldPrice: 5799 },
    { name: 'Sony 55" X80L 4K LED', spec: '4K HDR, X1 Processor, Triluminos Pro, Google TV', price: 2499, oldPrice: 2899 },
    { name: 'LG 43" UT7500 4K LED', spec: '4K Active HDR, 60Hz, ThinQ AI, webOS 23', price: 799, oldPrice: 949 },
    { name: 'Philips 50" PUS7608 4K', spec: '4K HDR10+, Ambilight 3 tərəfli, Dolby Atmos', price: 1099, oldPrice: 1349 },
    { name: 'TCL 65" C645 QLED', spec: 'QLED 4K, 144Hz, Dolby Vision IQ, Google TV', price: 1799, oldPrice: 2199 },
    { name: 'Hisense 55" E7KQ QLED', spec: 'QLED 4K, 144Hz Game Mode, Dolby Atmos, VIDAA', price: 1499, oldPrice: 1799 },
    { name: 'Samsung 32" T4400 HD', spec: 'HD LED, 60Hz, PurColor, Slim design', price: 449, oldPrice: 549 },
  ],
  kondisionerler: [
    { name: 'Daikin FTXM 12k BTU', spec: 'İnverter, A+++ enerji, Wi-Fi, Flowda yönləndirilmiş hava', price: 2899, oldPrice: 3399 },
    { name: 'Mitsubishi MSZ 9k BTU', spec: 'İnverter, A+++, səssiz rejim 19dB, Filtr təmizlənməsi', price: 2599, oldPrice: 2999 },
    { name: 'LG Artcool 12k BTU', spec: 'İnverter, A++, ThinQ Wi-Fi, çoxlu hava axını', price: 2199, oldPrice: 2599 },
    { name: 'Samsung WindFree 12k BTU', spec: 'WindFree soyutma, AI Auto Cooling, Wi-Fi, A++', price: 2399, oldPrice: 2899 },
    { name: 'Gree 9k BTU', spec: 'İnverter, A++ enerji, soyuq plazma filtr, səssiz', price: 1399, oldPrice: 1699 },
    { name: 'Midea 18k BTU', spec: 'İnverter, A+++, Gear rejimi, 20m hava axını', price: 2099, oldPrice: 2499 },
    { name: 'LG Dual Inverter 18k BTU', spec: 'Dual Inverter, A+++, 10 illik zəmanət kompresor', price: 2499, oldPrice: 2999 },
    { name: 'Daikin 18k BTU Multi', spec: 'Multi split, 2 otaq üçün, inverter, A+++', price: 4499, oldPrice: 5199 },
  ],
  aspiratorlar: [
    { name: 'Bosch 60cm Aspirator', spec: '700 m³/s, 3 sürət, halogen işıq, metallik filter', price: 549, oldPrice: 699 },
    { name: 'Siemens 90cm Aspirator', spec: '1000 m³/s, touch idarəetmə, LED işıq, səssiz', price: 899, oldPrice: 1099 },
    { name: 'Electrolux 60cm', spec: '800 m³/s, 3 sürət, kömür filtr, gümüş rəng', price: 449, oldPrice: 599 },
    { name: 'Beko 60cm Aspirator', spec: '650 m³/s, 3 sürət, LED, karbon filtr', price: 349, oldPrice: 449 },
    { name: 'Gorenje 90cm Ada', spec: '950 m³/s, sensor idarəetmə, avtomatik bağlanma', price: 799, oldPrice: 999 },
    { name: 'Teka 60cm Dav Window', spec: '620 m³/s, 3 sürət, çıxarıla bilən filtrlər', price: 299, oldPrice: 399 },
    { name: 'Bosch 90cm Slope', spec: '1100 m³/s, 4 sürət, tam örtülü, gecə rejimi', price: 1299, oldPrice: 1599 },
    { name: 'Siemens 60cm Slim', spec: '750 m³/s, 2 halogen işıq, alüminium filtr', price: 649, oldPrice: 799 },
  ],
  soyuducular: [
    { name: 'Samsung 520L No Frost', spec: 'No Frost, Twin Cooling Plus, A++ enerji, inverter', price: 2899, oldPrice: 3399 },
    { name: 'LG 450L Inverter Linear', spec: 'Inverter Linear Compressor, DoorCooling+, A+++', price: 3199, oldPrice: 3799 },
    { name: 'Bosch 400L No Frost', spec: 'No Frost, MultiAirFlow, A++ enerji, LowFrost', price: 2599, oldPrice: 3099 },
    { name: 'Beko 360L NeoFrost', spec: 'NeoFrost Dual Cooling, 2 aydır saxlama, A+ enerji', price: 1699, oldPrice: 1999 },
    { name: 'Indesit 300L Standart', spec: 'Total No Frost, 2 qapı, A+ enerji, súper soyutma', price: 1199, oldPrice: 1449 },
    { name: 'Arçelik 480L Side by Side', spec: 'Side by Side, su dispenseri, A++ enerji, LED ekran', price: 3599, oldPrice: 4199 },
    { name: 'LG 635L Side-by-Side', spec: 'NatureFRESH, InstaView, su + buz dispenseri, A+++', price: 4999, oldPrice: 5799 },
    { name: 'Samsung 230L Mini', spec: 'Mini ölçü, No Frost, A+ enerji, sıx məkan üçün', price: 899, oldPrice: 1099 },
  ],
  fenler: [
    { name: 'Philips 2100W Saç Fenı', spec: '2100W, İonCare texnologiyası, 3 istilik, 2 sürət, soyuq hava', price: 129, oldPrice: 169 },
    { name: 'Braun Satin Hair 7', spec: 'İonTex, 2000W, diffuzor başlıq, konsentrator nozul', price: 159, oldPrice: 199 },
    { name: 'Remington D5950 Pro', spec: '2200W, keramik örtük, ion generator, soyuq vurma', price: 99, oldPrice: 129 },
    { name: 'Dyson Supersonic', spec: 'Intelligent heat control, 5 başlıq, səssiz mühərrik, ion', price: 899, oldPrice: 1099 },
    { name: 'Bosch 1800W Fen', spec: '1800W, 2 sürət, 3 istilik, yığılan tutmaq, salon nozulu', price: 89, oldPrice: 119 },
    { name: 'Xiaomi Ionic Hair Fen', spec: 'İon baxım, 1800W, temperatura görə avtomatik güc, yüngül', price: 79, oldPrice: 109 },
    { name: 'Philips 5000 Series', spec: '2200W, HeatProtect sensor, 6 rejim, diffuzor daxil', price: 189, oldPrice: 239 },
    { name: 'Braun Satin Hair 3', spec: '1600W, 2 sürət, 2 istilik, foldable tutmaq', price: 69, oldPrice: 99 },
  ],
  'sok-cekenler': [
    { name: 'Dyson V15 Detect', spec: 'Lazer toz aşkarlama, 240AW sorulma, 60 dəq işləmə, HEPA', price: 1899, oldPrice: 2299 },
    { name: 'Samsung Jet 90', spec: '200W sorulma, Jet Cyclonic, 60 dəq batareya, HEPA filtr', price: 1299, oldPrice: 1599 },
    { name: 'Xiaomi G11 Plus', spec: '145AW, 60 dəq işləmə, LCD ekran, HEPA, 5 filtr mərhələ', price: 499, oldPrice: 649 },
    { name: 'Bosch Unlimited 7', spec: 'AllFloor HighPower, 65 dəq, çıxarıla bilən batareya', price: 999, oldPrice: 1249 },
    { name: 'Philips SpeedPro Max', spec: '180° tutmaq, 65 dəq, 360° süpürmə başlığı, LED far', price: 749, oldPrice: 949 },
    { name: 'Karcher VC 6', spec: 'Şok çəkən + yuyulan, 2000W, su filtri, HEPA 13', price: 599, oldPrice: 749 },
    { name: 'Dyson V11 Absolute', spec: '185AW, High Torque başlıq, 60 dəq, LCD ekran', price: 1599, oldPrice: 1949 },
    { name: 'Samsung Jet 75 Complete', spec: '200W, 5 filtr mərhələ, 3 başlıq, divar stendi', price: 1149, oldPrice: 1399 },
  ],
  pecliler: [
    { name: 'Bosch 4 Ocaqlı Qaz Plitə', spec: '4 ocaqlı, avtomatik atəş açma, qaz-kontrol, emal üst', price: 749, oldPrice: 899 },
    { name: 'Beko Elektrik Peç + Plitə', spec: '60cm, 4 ocaqlı, 66 litr peç, konveksiya, grill', price: 1099, oldPrice: 1349 },
    { name: 'Arcelik Qaz Peçi', spec: 'Analog idarəetmə, 60 litr, ikili şüşə qapı, A+ enerji', price: 649, oldPrice: 799 },
    { name: 'Gorenje 60cm Elektrik', spec: 'Seramik ocaqlar, 66 litr, AquaClean, tikili saat', price: 1299, oldPrice: 1599 },
    { name: 'Samsung 5 Ocaqlı Qaz Plitə', spec: '5 ocaqlı, cast iron qaşalar, wok ocaq, child lock', price: 949, oldPrice: 1149 },
    { name: 'Vestel Qaz-Elektrik Kombinə', spec: 'Qaz ocaqlar + elektrik peç, 60cm, tikili saat', price: 849, oldPrice: 1049 },
    { name: 'Bosch Seriе 8 Plitə', spec: 'Beş ocaqlı, EcoClean seçimi, A+ enerji, LED göstərici', price: 1699, oldPrice: 1999 },
    { name: 'Beko 90cm Geniş Plitə', spec: '90cm, 5 ocaqlı, güclü peç, gümüş rəng', price: 1449, oldPrice: 1749 },
  ],
  'et-cekenler': [
    { name: 'Bosch Elektrik Ət Çəkən', spec: '2500W, 3 dəlik plаş, metal gövdə, kəsmik əlavəsi', price: 349, oldPrice: 449 },
    { name: 'Philips 2000W Ət Çəkən', spec: '2000W, 3 növ kəsici, köftə əlavəsi, saxlama qutusu', price: 299, oldPrice: 399 },
    { name: 'Moulinex ME535 Ət Çəkən', spec: '1800W, metal gövdə, 3 disk, sarımsaq сiçəyi', price: 249, oldPrice: 329 },
    { name: 'Tefal NE6090 Ət Çəkən', spec: '2200W, 5 kq/dəq güc, 3 plаş, kefirlik daxil', price: 329, oldPrice: 419 },
    { name: 'Scarlett Ət Çəkən IS-46', spec: '1500W, 3 disk, reverse funksiyası, plastik gövdə', price: 159, oldPrice: 219 },
    { name: 'Kitfort KT-2210', spec: '2800W, tam metal, 4 disk, kolbasa nozulu', price: 389, oldPrice: 489 },
    { name: 'Bosch ProPower Ət Çəkən', spec: '3000W, Professional kəsici, 3 disk, metal qutu', price: 499, oldPrice: 649 },
    { name: 'Philips Seriе 7000', spec: '2500W, PowerBlade, 5 kq/dəq, smart örtük', price: 449, oldPrice: 579 },
  ],
  utuler: [
    { name: 'Philips PerfectCare Elite', spec: 'Buxar generatoru, 240g buxar vərmə, OptimalTEMP', price: 749, oldPrice: 949 },
    { name: 'Tefal FV9865 Ultimate', spec: '2600W, 55g buxar, buxar vərmə 220g, durbin örtük', price: 349, oldPrice: 449 },
    { name: 'Braun TexStyle 9', spec: '2800W, iCraft örtük, 65g buxar, vertikal buxar', price: 299, oldPrice: 389 },
    { name: 'Bosch TDA7060GB', spec: '3000W, keramik örtük, 210g buxar vərmə, anti-drip', price: 249, oldPrice: 329 },
    { name: 'Rowenta DW8210 Pro', spec: '2500W, Microsteam 400, 50g buxar, anti-kalk', price: 279, oldPrice: 359 },
    { name: 'Scarlett ISI-350', spec: '2200W, 35g buxar, keramik örtük, spray funksiyası', price: 99, oldPrice: 139 },
    { name: 'Philips 3000 Series', spec: '2400W, SteamGlide örtük, 45g buxar, drip-stop', price: 169, oldPrice: 229 },
    { name: 'Tefal Steam Generator', spec: 'Buxar stansiyası, 6.2 bar, 350g buxar, 1.5l tank', price: 899, oldPrice: 1149 },
  ],
  blenderler: [
    { name: 'Philips Seriе 5000 Blender', spec: '1000W, 2L şüşə kuвtık, ProBlend 6, 5 sürət + pulse', price: 179, oldPrice: 229 },
    { name: 'Bosch VitaPower Serie 4', spec: '1200W, 2.3L kuвtık, titan bıçaq, iсə dəsmal daxil', price: 219, oldPrice: 279 },
    { name: 'Braun TriForce Pro', spec: '1400W, TriForce təхmаk, 2L kuвtık, iсə crush funksiyası', price: 249, oldPrice: 319 },
    { name: 'Tefal BlendForce II', spec: '900W, 1.5L kuвtık, 4 bıçaq sistemi, 2 sürət', price: 129, oldPrice: 169 },
    { name: 'Moulinex BlendForce', spec: '700W, 1.5L kuвtık, 2 sürət + pulse, ləkə əleyhinə', price: 99, oldPrice: 139 },
    { name: 'Xiaomi Smoothie Blender', spec: 'Portativ, 400W, USB-C şarj, 500ml şişe, 6 bıçaq', price: 89, oldPrice: 119 },
    { name: 'Philips High Speed', spec: '1400W, 2L tritan kuвtık, proqramlar, vacuum texnologiya', price: 349, oldPrice: 449 },
    { name: 'Bosch MMB6174S', spec: '1000W, 2.3L, ThermoShield, çoxfunksiyalı 3-si-1', price: 269, oldPrice: 349 },
  ],
  tosterler: [
    { name: 'Philips HD2581 Toster', spec: '2 dilim, 8 qədər qəhvəyilik, çıxarma, kill switch', price: 89, oldPrice: 119 },
    { name: 'Bosch TAT4P420', spec: '2 dilim, 860W, briush önü, heated toast, crumb tepsisi', price: 119, oldPrice: 159 },
    { name: 'Braun HT 1010', spec: '2 dilim, 1000W, briush önü, AvtoQə, ləkəsiz gövdə', price: 99, oldPrice: 139 },
    { name: 'Tefal TT360138 Toster', spec: '2 dilim, 850W, 7 qədər, bagel rejimi, crumb tepsisi', price: 79, oldPrice: 109 },
    { name: 'Moulinex LT2608', spec: '2 dilim, 800W, 7 qədər qəhvəyilik, avtomatik bağlanma', price: 69, oldPrice: 99 },
    { name: 'Scarlett ST-2801', spec: '2 dilim, 750W, 6 qədər, çıxarma funksiyası', price: 49, oldPrice: 69 },
    { name: 'Philips 4 Dilim Toster', spec: '4 dilim, 1400W, 2 ayrı idarəetmə paneli', price: 149, oldPrice: 199 },
    { name: 'Bosch DesignLine', spec: '2 dilim, 1090W, retro dizayn, ləkə gövdə, 7 qədər', price: 129, oldPrice: 169 },
  ],
  plansetler: [
    { name: 'iPad Pro 13" M4', spec: 'Apple M4, 256GB, Ultra Retina XDR, Apple Pencil Pro dəstəkli', price: 4299, oldPrice: 4899 },
    { name: 'iPad Air 11" M2', spec: 'Apple M2, 128GB, Liquid Retina, 12MP kamera', price: 1899, oldPrice: 2199 },
    { name: 'Samsung Galaxy Tab S9+', spec: 'Snapdragon 8 Gen 2, 256GB, 12.4" AMOLED, S Pen daxil', price: 2899, oldPrice: 3399 },
    { name: 'Samsung Galaxy Tab A9+', spec: 'Snapdragon 695, 64GB, 11" ekran, quad speaker', price: 549, oldPrice: 699 },
    { name: 'Xiaomi Pad 6', spec: 'Snapdragon 870, 128GB, 11" 144Hz, quad speaker', price: 649, oldPrice: 849 },
    { name: 'Lenovo Tab P12', spec: 'Dimensity 7050, 128GB, 12.7" 3K ekran, JBL kolumna', price: 799, oldPrice: 999 },
    { name: 'Huawei MatePad 11.5', spec: 'Kirin 820, 128GB, 11.5" 120Hz, M-Pencil daxil', price: 699, oldPrice: 899 },
    { name: 'Redmi Pad SE', spec: 'Helio G99, 128GB, 11" 90Hz, 8000mAh batareya', price: 349, oldPrice: 449 },
  ],
  'elektron-kitablar': [
    { name: 'Amazon Kindle Paperwhite', spec: '6.8" E-Ink, 8GB, adastözsiz, IPX8, warm light', price: 349, oldPrice: 429 },
    { name: 'Amazon Kindle Oasis', spec: '7" E-Ink, 32GB, qrifil edən, IPX8, adi qıvırma', price: 549, oldPrice: 699 },
    { name: 'PocketBook Era 7', spec: '7" E-Ink, 32GB, adastözsiz, warm light, Bluetooth', price: 449, oldPrice: 549 },
    { name: 'PocketBook Verse Pro', spec: '6" E-Ink, 16GB, IPX8, smart işıq, qulaqlıq', price: 299, oldPrice: 379 },
    { name: 'Kobo Libra 2', spec: '7" E-Ink, 32GB, IPX8, Bluetooth, dark mode', price: 379, oldPrice: 469 },
    { name: 'Xiaomi Mi Reader Pro', spec: '7.8" E-Ink, 32GB, Android 11, stylus dəstəkli', price: 429, oldPrice: 529 },
    { name: 'Digma E64Q', spec: '6" E-Ink, 8GB, qəhvəyi işıq, microSD slot', price: 149, oldPrice: 199 },
    { name: 'Onyx Boox Nova Air C', spec: '7.8" rəngli E-Ink, 64GB, Android 11, stylus daxil', price: 849, oldPrice: 999 },
  ],
  'robot-supurgerler': [
    { name: 'Xiaomi Robot S10', spec: 'LiDAR naviqasiya, 4000Pa, 3200mAh, mopping, Mi Home', price: 599, oldPrice: 749 },
    { name: 'iRobot Roomba j7+', spec: 'PrecisionVision, 6000Pa, avtomatik boşaltma, AI obstacle', price: 1499, oldPrice: 1899 },
    { name: 'Samsung Jet Bot AI+', spec: 'LiDAR, 5500Pa, Clean Station, AI object recognition', price: 1699, oldPrice: 2099 },
    { name: 'Ecovacs Deebot T20', spec: 'OZMO mopping, 6000Pa, hot water wash, YIKI AI', price: 1399, oldPrice: 1749 },
    { name: 'Roborock S8 Pro Ultra', spec: 'VibraRise mopping, 6000Pa, dok stansiya, AI sorulma', price: 1799, oldPrice: 2199 },
    { name: 'Karcher RCV 5', spec: 'LiDAR, 3000Pa, 180 dəq işləmə, MyKarcher app', price: 749, oldPrice: 949 },
    { name: 'Xiaomi X20+', spec: '6000Pa, avtomatik su təmizləmə, mopping, 180 dəq', price: 899, oldPrice: 1149 },
    { name: 'iRobot Roomba Combo', spec: 'Vacuum + mopping, 4500Pa, smart mapping, Alexa', price: 1199, oldPrice: 1499 },
  ],
  'mikro-dalga': [
    { name: 'Samsung 23L Microwave', spec: '23 litr, 800W, 1000W grill, rəqəmsal ekran, child lock', price: 329, oldPrice: 419 },
    { name: 'LG 25L NeoChef', spec: '25 litr, 1000W, Smart Inverter, NeoChef örtük', price: 379, oldPrice: 479 },
    { name: 'Bosch 25L Seriе 4', spec: '25 litr, 900W, AutoPilot 7, grill, quartz element', price: 449, oldPrice: 549 },
    { name: 'Beko 20L Microwave', spec: '20 litr, 700W, 5 güc səviyyəsi, timer, defrost', price: 229, oldPrice: 299 },
    { name: 'Midea 20L Solo', spec: '20 litr, 700W, 6 güc rejimi, meхanik idarəetmə', price: 179, oldPrice: 239 },
    { name: 'Gorenje 25L Grill', spec: '25 litr, 900W, 1000W grill, buxar təmizlik, LED', price: 399, oldPrice: 499 },
    { name: 'Samsung 32L Convection', spec: '32 litr, 900W, konveksiya, ızgara, SlimFry', price: 649, oldPrice: 799 },
    { name: 'LG 42L Solardom', spec: '42 litr, 900W, Solardom, qızıl gövdə, 305 proqram', price: 849, oldPrice: 1049 },
  ],
  proyektorlar: [
    { name: 'Epson EH-TW5800', spec: 'Full HD, 2700 lumen, 3LCD, HDMI x2, 10000 saat', price: 1899, oldPrice: 2299 },
    { name: 'BenQ TH690ST', spec: '4K HDR, 3000 lumen, LED, 100% DCI-P3, səssiz', price: 2299, oldPrice: 2799 },
    { name: 'XGIMI Horizon Pro', spec: '4K, 2200 ISO lumen, Android TV, X-VUE 2.0', price: 2599, oldPrice: 3199 },
    { name: 'Anker Nebula Capsule', spec: '720p, 100 lumen, 360° səs, Android TV, kapsula ölçü', price: 649, oldPrice: 849 },
    { name: 'LG HU810PW', spec: '4K UHD, 2700 lumen, laser, webOS, iris diaphragm', price: 3299, oldPrice: 3999 },
    { name: 'Acer K138STi', spec: 'HD 720p, 1000 lumen, DLP, Wi-Fi, Bluetooth, 1.5 kq', price: 999, oldPrice: 1249 },
    { name: 'Epson EB-W52', spec: 'WXGA, 3400 lumen, 3LCD ofis üçün, HDMI x2', price: 1299, oldPrice: 1599 },
    { name: 'XGIMI MoGo 2 Pro', spec: 'FHD, 400 ISO lumen, Android TV 11, 2x8W səs', price: 899, oldPrice: 1149 },
  ],
  kameralar: [
    { name: 'Canon EOS R6 Mark II', spec: '24.2MP full-frame, 40fps, 4K60 video, Wi-Fi', price: 6499, oldPrice: 7499 },
    { name: 'Nikon Z6 III', spec: '24.5MP full-frame, EXPEED 7, 6K video, 20fps', price: 5999, oldPrice: 6899 },
    { name: 'Sony A7 IV', spec: '33MP full-frame, 4K60, 759 AF nöqtə, dual slot', price: 5499, oldPrice: 6299 },
    { name: 'Fujifilm X-T5', spec: '40.2MP APS-C, IBIS 7 stop, 6.2K video, film emulyasiya', price: 3899, oldPrice: 4499 },
    { name: 'Panasonic Lumix S5 II', spec: '24MP full-frame, 5-axis IBIS, 6K video, phase AF', price: 4299, oldPrice: 4999 },
    { name: 'GoPro HERO 12 Black', spec: '5.3K60 video, HDR, HyperSmooth 6.0, suke davamlı', price: 899, oldPrice: 1099 },
    { name: 'Canon EOS R50', spec: '24.2MP APS-C, Dual Pixel AF, 4K30, vlog üçün', price: 1299, oldPrice: 1599 },
    { name: 'Sony ZV-E10', spec: '24.2MP APS-C, 4K30, varyfocal mic, vlog üçün', price: 1499, oldPrice: 1799 },
  ],
  dronlar: [
    { name: 'DJI Mini 4 Pro', spec: '249q, 4K60 HDR, omnidirectional sensorlar, 34 dəq', price: 1799, oldPrice: 2149 },
    { name: 'DJI Air 3', spec: 'dual kamera, 48MP, 46 dəq, 4K100 HDR, O4', price: 2299, oldPrice: 2699 },
    { name: 'DJI Mavic 3 Pro', spec: 'Hasselblad 4/3 CMOS, 43 dəq, 5.1K video, 3 kamera', price: 4299, oldPrice: 4999 },
    { name: 'Autel EVO Lite+', spec: '6K video, 40 dəq, moonlight algorithm, 249q', price: 1999, oldPrice: 2399 },
    { name: 'Hubsan Zino 2+', spec: '4K30, 33 dəq, GPS, 9km ötürmə, 250q', price: 449, oldPrice: 599 },
    { name: 'Parrot Anafi AI', spec: '48MP, 4K60, 32 dəq, 4G bağlılıq, AI tracking', price: 2699, oldPrice: 3199 },
    { name: 'Ryze Tello EDU', spec: '720p, 13 dəq, havada fırlanma, təhsil üçün', price: 149, oldPrice: 199 },
    { name: 'Xiaomi Fimi X8 Pro', spec: '4K HDR, 35 dəq, 3-axis gimbal, GPS, 10km', price: 699, oldPrice: 899 },
  ],
  printerler: [
    { name: 'HP LaserJet M141w', spec: 'Lazer, 20 səh/dəq, Wi-Fi, çap + skan, 150 səh tray', price: 349, oldPrice: 449 },
    { name: 'Canon PIXMA G3420', spec: 'CISS, 7700 səhifə rəngli, Wi-Fi, 3-si-1', price: 449, oldPrice: 549 },
    { name: 'Epson EcoTank L3260', spec: 'CISS, 4500 səh qara, 7500 rəngli, Wi-Fi Direct', price: 499, oldPrice: 629 },
    { name: 'Brother HL-L2340DW', spec: 'Lazer, 26 səh/dəq, Wi-Fi, duplex çap', price: 399, oldPrice: 499 },
    { name: 'Xerox Phaser 3052', spec: 'Lazer, 22 səh/dəq, Wi-Fi, 10000 səh ayda', price: 429, oldPrice: 539 },
    { name: 'Pantum P3300DW', spec: 'Lazer, 33 səh/dəq, avtomatik duplex, Wi-Fi', price: 349, oldPrice: 439 },
    { name: 'HP OfficeJet 9010e', spec: 'Sərbəst çap, 22 səh/dəq, ADF, fax, Wi-Fi 6', price: 599, oldPrice: 749 },
    { name: 'Canon i-SENSYS MF752Cdw', spec: 'Rəngli lazer, 31 səh/dəq, duplex, 50-sheet ADF', price: 1299, oldPrice: 1599 },
  ],
  skaynerler: [
    { name: 'Epson DS-530 II', spec: 'Sənəd skayneri, 35 ppm, ADF 50 səh, duplex, USB 3.0', price: 849, oldPrice: 1049 },
    { name: 'Canon DR-C225 II', spec: '25 ppm, Wi-Fi, A4, 3000 səh günə daxil', price: 699, oldPrice: 879 },
    { name: 'Brother ADS-1700W', spec: 'Kompakt, 25 ppm, Wi-Fi, touchscreen, USB', price: 649, oldPrice: 829 },
    { name: 'HP ScanJet Pro 3000', spec: '35 ppm, 4000 səh günə daxil, duplex, USB 3.0', price: 799, oldPrice: 999 },
    { name: 'Fujitsu ScanSnap iX1600', spec: '40 ppm, Wi-Fi, touchscreen, duplex, ADF 50', price: 1099, oldPrice: 1349 },
    { name: 'Xerox DocuMate 4700', spec: 'A3 planşet, 1200 DPI, 24 bit rəng, USB', price: 1349, oldPrice: 1649 },
    { name: 'Epson Perfection V600', spec: 'Foto skayner, 6400 DPI, hazır slayd, film skan', price: 749, oldPrice: 949 },
    { name: 'Canon CanoScan LiDE 400', spec: '2400 DPI, ultra yüngül, USB güc, 4 EZ düymə', price: 299, oldPrice: 389 },
  ],
  monitorlar: [
    { name: 'Samsung Odyssey G7 27"', spec: 'QLED, 240Hz, 1ms, 1440p, 1000R əyri, HDR600', price: 1299, oldPrice: 1599 },
    { name: 'LG UltraGear 27"', spec: 'Nano IPS, 165Hz, 1ms, 1440p, G-SYNC uyğunluq', price: 899, oldPrice: 1099 },
    { name: 'Dell UltraSharp U2724D', spec: '27" IPS, 1440p, 120Hz, USB-C 90W, 4 USB', price: 1099, oldPrice: 1349 },
    { name: 'ASUS ROG Swift 32"', spec: '4K, 144Hz, HDMI 2.1, mini-LED HDR1000, G-SYNC', price: 2499, oldPrice: 2999 },
    { name: 'AOC Q27G3XMN', spec: '27" VA, 1440p, 180Hz, HDR1000, mini-LED, 1ms', price: 649, oldPrice: 849 },
    { name: 'BenQ PD2705Q', spec: '27" IPS, 1440p, 100% sRGB, type-c, dizaynerlər üçün', price: 849, oldPrice: 1049 },
    { name: 'Samsung 34" ViewFinity', spec: '34" ultrawide, 1440p, 100Hz, USB-C, HDR10', price: 999, oldPrice: 1249 },
    { name: 'LG 24" IPS FHD', spec: '24" IPS, 1080p, 75Hz, AMD FreeSync, 3 taraflı bitsiz', price: 279, oldPrice: 349 },
  ],
};

const catalogImages = {
  smartfonlar: [
    'https://images.pexels.com/photos/3945672/pexels-photo-3945672.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/3945695/pexels-photo-3945695.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  noutbuklar: [
    'https://images.pexels.com/photos/3951449/pexels-photo-3951449.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/19012030/pexels-photo-19012030.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/3560565/pexels-photo-3560565.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6938576/pexels-photo-6938576.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  aksesuarlar: [
    'https://images.pexels.com/photos/3921817/pexels-photo-3921817.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/31406895/pexels-photo-31406895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/374110/pexels-photo-374110.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/10535365/pexels-photo-10535365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/815493/pexels-photo-815493.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  'mehset-texnikasi': [
    'https://images.pexels.com/photos/31406895/pexels-photo-31406895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/374110/pexels-photo-374110.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/10535365/pexels-photo-10535365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9743550/pexels-photo-9743550.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  televizorlar: [
    'https://images.pexels.com/photos/14715808/pexels-photo-14715808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/39338464/pexels-photo-39338464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7546717/pexels-photo-7546717.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7587735/pexels-photo-7587735.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7587781/pexels-photo-7587781.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6782360/pexels-photo-6782360.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  kondisionerler: [
    'https://images.pexels.com/photos/38788452/pexels-photo-38788452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/24551564/pexels-photo-24551564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/5505098/pexels-photo-5505098.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/27427771/pexels-photo-27427771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/34554960/pexels-photo-34554960.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/24709789/pexels-photo-24709789.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  aspiratorlar: [
    'https://images.pexels.com/photos/7214729/pexels-photo-7214729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/38310806/pexels-photo-38310806.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/11179240/pexels-photo-11179240.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/34992769/pexels-photo-34992769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6903246/pexels-photo-6903246.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7587372/pexels-photo-7587372.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  soyuducular: [
    'https://images.pexels.com/photos/34872429/pexels-photo-34872429.png?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/4221389/pexels-photo-4221389.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9646742/pexels-photo-9646742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/27301775/pexels-photo-27301775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6835104/pexels-photo-6835104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9031968/pexels-photo-9031968.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  fenler: [
    'https://images.pexels.com/photos/3993328/pexels-photo-3993328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/32641723/pexels-photo-32641723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7518702/pexels-photo-7518702.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/3758494/pexels-photo-3758494.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  'sok-cekenler': [
    'https://images.pexels.com/photos/9462148/pexels-photo-9462148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6196579/pexels-photo-6196579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9462142/pexels-photo-9462142.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/4792772/pexels-photo-4792772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/4107288/pexels-photo-4107288.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  pecliler: [
    'https://images.pexels.com/photos/28054208/pexels-photo-28054208.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7538295/pexels-photo-7538295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/10388448/pexels-photo-10388448.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6968556/pexels-photo-6968556.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/8596750/pexels-photo-8596750.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  'et-cekenler': [
    'https://images.pexels.com/photos/10415514/pexels-photo-10415514.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7493592/pexels-photo-7493592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/5908056/pexels-photo-5908056.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/18205657/pexels-photo-18205657.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  utuler: [
    'https://images.pexels.com/photos/28576628/pexels-photo-28576628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/28576633/pexels-photo-28576633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/28576619/pexels-photo-28576619.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/28576618/pexels-photo-28576618.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/5202923/pexels-photo-5202923.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  blenderler: [
    'https://images.pexels.com/photos/12689255/pexels-photo-12689255.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/19599327/pexels-photo-19599327.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/19773943/pexels-photo-19773943.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/12689256/pexels-photo-12689256.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/19599329/pexels-photo-19599329.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  tosterler: [
    'https://images.pexels.com/photos/3997309/pexels-photo-3997309.png?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7696932/pexels-photo-7696932.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7937466/pexels-photo-7937466.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7936635/pexels-photo-7936635.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/1448665/pexels-photo-1448665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  plansetler: [
    'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/3945695/pexels-photo-3945695.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  'elektron-kitablar': [
    'https://images.pexels.com/photos/1790124/pexels-photo-1790124.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  'robot-supurgerler': [
    'https://images.pexels.com/photos/4087996/pexels-photo-4087996.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9462148/pexels-photo-9462148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/4792772/pexels-photo-4792772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/4107288/pexels-photo-4107288.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  'mikro-dalga': [
    'https://images.pexels.com/photos/31406895/pexels-photo-31406895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9743550/pexels-photo-9743550.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/374110/pexels-photo-374110.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  proyektorlar: [
    'https://images.pexels.com/photos/14715808/pexels-photo-14715808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/39338464/pexels-photo-39338464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7546717/pexels-photo-7546717.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7587735/pexels-photo-7587735.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  kameralar: [
    'https://images.pexels.com/photos/51383/photo_camera photographing_photo-51383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  dronlar: [
    'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/724921/pexels-photo-724921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/1087185/pexels-photo-1087185.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  printerler: [
    'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/3560565/pexels-photo-3560565.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/39284/printer-ink-cartridge-print-39284.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  skaynerler: [
    'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/3560565/pexels-photo-3560565.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  monitorlar: [
    'https://images.pexels.com/photos/3521937/pexels-photo-3521937.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/705675/pexels-photo-705675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6938576/pexels-photo-6938576.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
};

const categoryLabels = {
  smartfonlar: 'Smartfonlar',
  noutbuklar: 'Noutbuklar',
  aksesuarlar: 'Aksesuarlar',
  'mehset-texnikasi': 'Məişət texnikası',
  televizorlar: 'Televizorlar',
  kondisionerler: 'Kondisionerlər',
  aspiratorlar: 'Aspiratorlar',
  soyuducular: 'Soyuducular',
  fenler: 'Fenlər',
  'sok-cekenler': 'Şok çəkənlər',
  pecliler: 'Pəçlilər',
  'et-cekenler': 'Ət çəkənlər',
  utuler: 'Ütülər',
  blenderler: 'Blenderlər',
  tosterler: 'Tosterlər',
  plansetler: 'Plansetlər',
  'elektron-kitablar': 'Elektron kitablar',
  'robot-supurgerler': 'Robot tostoranlar',
  'mikro-dalga': 'Mikro dalğalı soba',
  proyektorlar: 'Proyektorlar',
  kameralar: 'Kameralar',
  dronlar: 'Dronlar',
  printerler: 'Printerlər',
  skaynerler: 'Skaynerlər',
  monitorlar: 'Monitorlar',
};

function generateProducts() {
  const all = [];
  let id = 1;

  Object.keys(categoryLabels).forEach((category) => {
    const models = catalogModels[category];
    const imgs = catalogImages[category];
    const brands = catalogBrands[category];

    for (let i = 0; i < 120; i++) {
      const base = models[i % models.length];
      const brand = brands[i % brands.length];
      const variant = Math.floor(i / models.length) + 1;
      // Qiymət variantına görə azca dəyişir
      const priceAdj = (variant - 1) * 37;
      const oldPriceAdj = (variant - 1) * 43;

      all.push({
        id: id++,
        name: variant > 1 ? `${brand} ${base.name} (Model ${variant})` : `${brand} ${base.name}`,
        spec: base.spec,
        price: base.price + priceAdj,
        oldPrice: base.oldPrice + oldPriceAdj,
        category,
        categoryLabel: categoryLabels[category],
        discount: Math.round(((base.oldPrice + oldPriceAdj - (base.price + priceAdj)) / (base.oldPrice + oldPriceAdj)) * 100),
        image: imgs[i % imgs.length],
      });
    }
  });

  return all;
}

const products = generateProducts();

// Ən populyar 8 məhsul (səhifə açılanda görünənlər)
function getVisibleProducts() {
  return products.slice(0, visibleCount);
}

function getFilteredProducts() {
  return products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });
}

function hasMoreProducts(filtered) {
  return activeCategory === 'all' ? products.length > visibleCount : filtered.length > visibleCount;
}

// ===== CONSTANTS =====
const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_FEE = 30;
const DISCOUNT_RATE = 0.05; // 5% extra checkout discount

// ===== STATE =====
let cart = [];
let favorites = [];
let activeCategory = 'all';
let searchTerm = '';

// ===== DOM REFERENCES =====
const productsGrid = document.getElementById('productsGrid');
const noResults = document.getElementById('noResults');
const cartCount = document.getElementById('cartCount');
const favCount = document.getElementById('favCount');
const cartBtn = document.getElementById('cartBtn');
const favBtn = document.getElementById('favBtn');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartShipping = document.getElementById('cartShipping');
const cartDiscount = document.getElementById('cartDiscount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutBody = document.getElementById('checkoutBody');
const confirmOrderBtn = document.getElementById('confirmOrderBtn');
const favItems = document.getElementById('favItems');
const favEmpty = document.getElementById('favEmpty');
const favFooter = document.getElementById('favFooter');
const addAllToFavBtn = document.getElementById('addAllToFavBtn');
const searchInput = document.getElementById('searchInput');
const searchInputMobile = document.getElementById('searchInputMobile');
const cartToast = document.getElementById('cartToast');
const toastMessage = document.getElementById('toastMessage');
const summaryEmpty = document.getElementById('summaryEmpty');
const summaryContent = document.getElementById('summaryContent');
const summaryItemsList = document.getElementById('summaryItemsList');
const summarySubtotal = document.getElementById('summarySubtotal');
const summaryShipping = document.getElementById('summaryShipping');
const summaryDiscount = document.getElementById('summaryDiscount');
const summaryTotal = document.getElementById('summaryTotal');
const summaryCheckoutBtn = document.getElementById('summaryCheckoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const freeShippingNote = document.getElementById('freeShippingNote');
const freeShippingText = document.getElementById('freeShippingText');

// ===== HELPERS =====
function fmt(amount) {
  return `${amount.toLocaleString('az-AZ')} AZN`;
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const filtered = getFilteredProducts();
  const visible = filtered.slice(0, visibleCount);

  const html = visible
    .map(
      (p, index) => `
      <div class="col-6 col-md-4 col-lg-3" data-category="${p.category}" data-name="${p.name.toLowerCase()}">
        <div class="card product-card" style="animation-delay: ${Math.min(index, 16) * 0.05}s">
          <div class="product-image-wrapper">
            <span class="product-category-tag">${p.categoryLabel}</span>
            <span class="product-discount-tag">-${p.discount}%</span>
            <button class="fav-heart-btn ${favorites.includes(p.id) ? 'active' : ''}" data-fav-id="${p.id}" aria-label="Sevimlilere elave et">
              <i class="bi ${favorites.includes(p.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
            <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy" />
          </div>
          <div class="product-card-body">
            <h3 class="product-name">${p.name}</h3>
            <p class="product-spec">${p.spec}</p>
            <div class="product-price-row">
              <span class="product-price">${p.price.toLocaleString('az-AZ')} <span class="currency">AZN</span></span>
              <span class="product-old-price">${p.oldPrice.toLocaleString('az-AZ')} AZN</span>
            </div>
            <div class="product-actions-row">
              <button class="btn btn-add-cart" data-id="${p.id}">
                <i class="bi bi-cart-plus"></i> Səbətə at
              </button>
            </div>
          </div>
        </div>
      </div>`
    )
    .join('');
  productsGrid.innerHTML = html;

  // Load more düyməsinin görünməsi
  const canLoadMore = filtered.length > visibleCount;
  loadMoreWrapper.style.display = canLoadMore ? 'block' : 'none';
  noResults.classList.toggle('d-none', filtered.length > 0);
}

// ===== EVENT DELEGATION ON PRODUCT GRID =====
productsGrid.addEventListener('click', (e) => {
  const favBtn = e.target.closest('.fav-heart-btn');
  if (favBtn) {
    e.stopPropagation();
    const id = parseInt(favBtn.dataset.favId, 10);
    toggleFavorite(id);
    return;
  }

  const addBtn = e.target.closest('.btn-add-cart');
  if (addBtn) {
    e.stopPropagation();
    const id = parseInt(addBtn.dataset.id, 10);
    addToCart(id);
  }
});

// ===== FAVORITES =====
function toggleFavorite(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  if (favorites.includes(id)) {
    favorites = favorites.filter((fid) => fid !== id);
    showToast(`${product.name} sevimlilerden silindi`);
  } else {
    favorites.push(id);
    showToast(`${product.name} sevimlilere elave edildi!`);
  }

  updateFavUI();
  renderProducts();
}

function updateFavUI() {
  favCount.textContent = favorites.length;
  favCount.classList.remove('bump');
  void favCount.offsetWidth;
  favCount.classList.add('bump');

  if (favorites.length === 0) {
    favEmpty.style.display = 'block';
    favItems.querySelectorAll('.cart-item').forEach((el) => el.remove());
    favFooter.style.display = 'none';
  } else {
    favEmpty.style.display = 'none';
    favFooter.style.display = 'block';

    const favProducts = favorites
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);

    const itemsHtml = favProducts
      .map(
        (item) => `
      <div class="cart-item fav-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price.toLocaleString('az-AZ')} AZN</div>
          <button class="btn-fav-add-cart" data-action="add-to-cart">
            <i class="bi bi-cart-plus me-1"></i>Səbətə at
          </button>
        </div>
        <button class="cart-item-remove" data-action="remove-fav" aria-label="Sil">
          <i class="bi bi-trash3"></i>
        </button>
      </div>`
      )
      .join('');
    favItems.innerHTML = itemsHtml;
  }
}

// ===== CART LOGIC =====
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`${product.name} səbətə əlavə edildi!`);
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) {
    removeFromCart(id);
    return;
  }
  updateCartUI();
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getShippingCost(subtotal) {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FEE;
}

function getDiscountAmount(subtotal) {
  if (subtotal === 0) return 0;
  return Math.round(subtotal * DISCOUNT_RATE);
}

function getCartTotalAmount() {
  const subtotal = getCartSubtotal();
  const shipping = getShippingCost(subtotal);
  const discount = getDiscountAmount(subtotal);
  return subtotal + shipping - discount;
}

function updateCartUI() {
  const count = getCartCount();
  cartCount.textContent = count;
  cartCount.classList.remove('bump');
  void cartCount.offsetWidth;
  cartCount.classList.add('bump');

  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartItems.querySelectorAll('.cart-item').forEach((el) => el.remove());
    cartFooter.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    const subtotal = getCartSubtotal();
    const shipping = getShippingCost(subtotal);
    const discount = getDiscountAmount(subtotal);
    const total = subtotal + shipping - discount;

    cartSubtotal.textContent = fmt(subtotal);
    cartShipping.textContent = shipping === 0 ? 'Pulsuz' : fmt(shipping);
    cartDiscount.textContent = `−${fmt(discount)}`;
    cartTotal.textContent = fmt(total);

    const itemsHtml = cart
      .map(
        (item) => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price.toLocaleString('az-AZ')} AZN</div>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="decrease">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-action="increase">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-action="remove" aria-label="Sil">
          <i class="bi bi-trash3"></i>
        </button>
      </div>`
      )
      .join('');
    cartItems.innerHTML = itemsHtml;
  }

  updateSummarySection();
}

// ===== CART SUMMARY SECTION =====
function updateSummarySection() {
  if (cart.length === 0) {
    summaryEmpty.style.display = 'block';
    summaryContent.style.display = 'none';
    return;
  }

  summaryEmpty.style.display = 'none';
  summaryContent.style.display = 'block';

  const subtotal = getCartSubtotal();
  const shipping = getShippingCost(subtotal);
  const discount = getDiscountAmount(subtotal);
  const total = subtotal + shipping - discount;

  summarySubtotal.textContent = fmt(subtotal);
  summaryShipping.textContent = shipping === 0 ? 'Pulsuz' : fmt(shipping);
  summaryDiscount.textContent = `−${fmt(discount)}`;
  summaryTotal.textContent = fmt(total);

  if (subtotal < FREE_SHIPPING_THRESHOLD) {
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    freeShippingText.textContent = `Pulsuz çatdırılma üçün ${fmt(remaining)} daha əlavə edin`;
    freeShippingNote.style.display = 'flex';
  } else {
    freeShippingText.textContent = 'Pulsuz çatdırılma tətbiq edildi';
    freeShippingNote.style.display = 'flex';
  }

  const itemsHtml = cart
    .map(
      (item) => `
    <div class="summary-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="summary-item-img" />
      <div class="summary-item-info">
        <div class="summary-item-name">${item.name}</div>
        <div class="summary-item-spec">${item.spec}</div>
        <div class="summary-item-qty">
          <button class="qty-btn" data-action="decrease">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-action="increase">+</button>
          <span class="summary-item-unit-price">${item.price.toLocaleString('az-AZ')} AZN / ədəd</span>
        </div>
      </div>
      <div class="summary-item-right">
        <span class="summary-item-sum">${(item.price * item.qty).toLocaleString('az-AZ')} AZN</span>
        <button class="cart-item-remove" data-action="remove" aria-label="Sil">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    </div>`
    )
    .join('');
  summaryItemsList.innerHTML = itemsHtml;
}

summaryItemsList.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const item = btn.closest('.summary-item');
  if (!item) return;
  const id = parseInt(item.dataset.id, 10);
  const action = btn.dataset.action;
  if (action === 'increase') changeQty(id, 1);
  else if (action === 'decrease') changeQty(id, -1);
  else if (action === 'remove') removeFromCart(id);
});

if (summaryCheckoutBtn) {
  summaryCheckoutBtn.addEventListener('click', () => {
    renderCheckout();
    const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    modal.show();
  });
}

if (clearCartBtn) {
  clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCartUI();
    showToast('Səbət təmizləndi');
  });
}

// ===== TOAST =====
let toastInstance = null;
function showToast(message) {
  toastMessage.textContent = message;
  if (!toastInstance) {
    toastInstance = new bootstrap.Toast(cartToast, { delay: 2500 });
  }
  toastInstance.show();
}

// ===== FILTERING =====
function filterProducts() {
  // renderProducts artıq filter + limit nəzərə alaraq göstərir
  renderProducts();
}

// ===== SEARCH =====
function handleSearch(value) {
  searchTerm = value.trim().toLowerCase();
  visibleCount = PAGE_SIZE;
  filterProducts();
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
}
if (searchInputMobile) {
  searchInputMobile.addEventListener('input', (e) => {
    handleSearch(e.target.value);
    if (searchInput) searchInput.value = e.target.value;
  });
}

// ===== CATEGORY FILTERS =====
function setCategory(category) {
  activeCategory = category;
  visibleCount = PAGE_SIZE;

  document.querySelectorAll('.category-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  document.querySelectorAll('.filter-pill').forEach((pill) => {
    pill.classList.toggle('active', pill.dataset.category === category);
  });

  filterProducts();

  const productsSection = document.getElementById('products');
  if (window.scrollY < 100 && category !== 'all') {
    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ===== LOAD MORE =====
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    visibleCount += PAGE_SIZE;
    renderProducts();
  });
}

document.querySelectorAll('.category-btn').forEach((btn) => {
  btn.addEventListener('click', () => setCategory(btn.dataset.category));
});
document.querySelectorAll('.filter-pill').forEach((pill) => {
  pill.addEventListener('click', () => setCategory(pill.dataset.category));
});

// ===== CART BUTTON — Open offcanvas =====
if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    offcanvas.show();
  });
}

// ===== FAV BUTTON — Open offcanvas =====
if (favBtn) {
  favBtn.addEventListener('click', () => {
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('favOffcanvas'));
    offcanvas.show();
  });
}

// ===== CART ITEM EVENT DELEGATION =====
cartItems.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const cartItem = btn.closest('.cart-item');
  if (!cartItem) return;
  const id = parseInt(cartItem.dataset.id, 10);
  const action = btn.dataset.action;
  if (action === 'increase') changeQty(id, 1);
  else if (action === 'decrease') changeQty(id, -1);
  else if (action === 'remove') removeFromCart(id);
});

// ===== FAV ITEM EVENT DELEGATION =====
favItems.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const favItem = btn.closest('.fav-item');
  if (!favItem) return;
  const id = parseInt(favItem.dataset.id, 10);
  const action = btn.dataset.action;
  if (action === 'add-to-cart') addToCart(id);
  else if (action === 'remove-fav') toggleFavorite(id);
});

// ===== ADD ALL FAVORITES TO CART =====
if (addAllToFavBtn) {
  addAllToFavBtn.addEventListener('click', () => {
    favorites.forEach((id) => addToCart(id));
    showToast('Butun sevimliler səbətə əlavə edildi!');
  });
}

// ===== CHECKOUT =====
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    renderCheckout();
    const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
    if (offcanvas) offcanvas.hide();
    modal.show();
  });
}

function renderCheckout() {
  const subtotal = getCartSubtotal();
  const shipping = getShippingCost(subtotal);
  const discount = getDiscountAmount(subtotal);
  const total = subtotal + shipping - discount;

  const itemsHtml = cart
    .map(
      (item) => `
    <div class="checkout-item">
      <img src="${item.image}" alt="${item.name}" class="checkout-item-img" />
      <div class="checkout-item-info">
        <span class="checkout-item-name">${item.name}</span>
        <span class="checkout-item-qty">${item.qty} ədəd × ${item.price.toLocaleString('az-AZ')} AZN</span>
      </div>
      <span class="checkout-item-sum">${(item.price * item.qty).toLocaleString('az-AZ')} AZN</span>
    </div>`
    )
    .join('');

  checkoutBody.innerHTML = `
    <div class="checkout-items-list">${itemsHtml}</div>
    <div class="checkout-calc">
      <div class="checkout-calc-row">
        <span>Məbləğ:</span>
        <span>${fmt(subtotal)}</span>
      </div>
      <div class="checkout-calc-row">
        <span>Çatdırılma:</span>
        <span>${shipping === 0 ? 'Pulsuz' : fmt(shipping)}</span>
      </div>
      <div class="checkout-calc-row checkout-discount-row">
        <span>Endirim (5%):</span>
        <span class="checkout-discount-value">−${fmt(discount)}</span>
      </div>
      <div class="checkout-total-row">
        <span>Ümumi cəm:</span>
        <span class="checkout-total-amount">${fmt(total)}</span>
      </div>
    </div>`;
}

if (confirmOrderBtn) {
  confirmOrderBtn.addEventListener('click', () => {
    const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    if (modal) modal.hide();
    cart = [];
    updateCartUI();
    setTimeout(() => showToast('Sifarişiniz ugurla yekunlasdirildi!'), 300);
  });
}

// ===== INIT =====
renderProducts();
updateCartUI();
updateFavUI();
updateSummarySection();
