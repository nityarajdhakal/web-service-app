-- ============================================
-- SEED DATA FOR WEB SERVICE APP
-- ============================================

-- Insert a test user (password is 'password123' hashed with bcrypt)
INSERT INTO users (name, email, password) VALUES
('Test User', 'test@example.com', '$2a$10$XKq0gPqQQB1z8kRBLZFjj.xqLJX8xKmVLQHH3vjB/Hxl/YRPMz/iW');

-- Insert translations for Login page (English)
INSERT INTO translations (page, lang, key, value) VALUES
('login', 'en', 'loginTitle', 'Login'),
('login', 'en', 'emailPlaceholder', 'Email'),
('login', 'en', 'passwordPlaceholder', 'Password'),
('login', 'en', 'loginButton', 'Login'),
('login', 'en', 'menuHome', 'Home'),
('login', 'en', 'menuContact', 'Contact'),
('login', 'en', 'menuAbout', 'About'),
('login', 'en', 'menuTerms', 'Terms');

-- Insert translations for Login page (Swedish)
INSERT INTO translations (page, lang, key, value) VALUES
('login', 'sv', 'loginTitle', 'Logga in'),
('login', 'sv', 'emailPlaceholder', 'E-post'),
('login', 'sv', 'passwordPlaceholder', 'Lösenord'),
('login', 'sv', 'loginButton', 'Logga in'),
('login', 'sv', 'menuHome', 'Hem'),
('login', 'sv', 'menuContact', 'Kontakt'),
('login', 'sv', 'menuAbout', 'Om oss'),
('login', 'sv', 'menuTerms', 'Villkor');

-- Insert translations for Pricelist page (English)
INSERT INTO translations (page, lang, key, value) VALUES
('pricelist', 'en', 'title', 'Price List'),
('pricelist', 'en', 'searchArticle', 'Search Article No...'),
('pricelist', 'en', 'searchProduct', 'Search Product...'),
('pricelist', 'en', 'newProduct', 'New Product'),
('pricelist', 'en', 'printList', 'Print List'),
('pricelist', 'en', 'advancedMode', 'Advanced mode'),
('pricelist', 'en', 'articleNo', 'Article No.'),
('pricelist', 'en', 'productService', 'Product/Service'),
('pricelist', 'en', 'inPrice', 'In Price'),
('pricelist', 'en', 'price', 'Price'),
('pricelist', 'en', 'unit', 'Unit'),
('pricelist', 'en', 'inStock', 'In Stock'),
('pricelist', 'en', 'description', 'Description'),
('pricelist', 'en', 'noProducts', 'No products available');

-- Insert translations for Pricelist page (Swedish)
INSERT INTO translations (page, lang, key, value) VALUES
('pricelist', 'sv', 'title', 'Prislista'),
('pricelist', 'sv', 'searchArticle', 'Sök artikelnummer...'),
('pricelist', 'sv', 'searchProduct', 'Sök produkt...'),
('pricelist', 'sv', 'newProduct', 'Ny produkt'),
('pricelist', 'sv', 'printList', 'Skriv ut lista'),
('pricelist', 'sv', 'advancedMode', 'Avancerat läge'),
('pricelist', 'sv', 'articleNo', 'Artikelnr'),
('pricelist', 'sv', 'productService', 'Produkt/Tjänst'),
('pricelist', 'sv', 'inPrice', 'Inpris'),
('pricelist', 'sv', 'price', 'Pris'),
('pricelist', 'sv', 'unit', 'Enhet'),
('pricelist', 'sv', 'inStock', 'I lager'),
('pricelist', 'sv', 'description', 'Beskrivning'),
('pricelist', 'sv', 'noProducts', 'Inga produkter tillgängliga');

-- Insert translations for Terms page (English)
INSERT INTO translations (page, lang, key, value) VALUES
('terms', 'en', 'title', 'Terms and Conditions'),
('terms', 'en', 'closeButton', 'Close and Go Back'),
('terms', 'en', 'content', 'These are the terms and conditions for using our service. By accessing or using the service, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service. We reserve the right to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes. Your continued use of the Service following the posting of any changes to these Terms constitutes acceptance of those changes.');

-- Insert translations for Terms page (Swedish)
INSERT INTO translations (page, lang, key, value) VALUES
('terms', 'sv', 'title', 'Allmänna villkor'),
('terms', 'sv', 'closeButton', 'Stäng och gå tillbaka'),
('terms', 'sv', 'content', 'Detta är villkoren för att använda vår tjänst. Genom att använda tjänsten godkänner du dessa villkor. Om du inte håller med någon del av villkoren kan du inte använda tjänsten. Vi förbehåller oss rätten att när som helst ändra eller ersätta dessa villkor. Det är ditt ansvar att regelbundet kontrollera dessa villkor för ändringar. Din fortsatta användning av tjänsten efter publicering av ändringar i dessa villkor utgör acceptans av dessa ändringar.');

-- Insert 25 sample products for testing scrolling functionality
INSERT INTO products (article_no, product_name, in_price, price, unit, in_stock, description) VALUES
('1234567890', 'This is a test product with fifty characters this!', 900500, 1500800, 'kilometers/hour', 2500600, 'This is the description with fifty characters this'),
('ART-001', 'Sony DSLR Camera 12345', 15000, 25000, 'pcs', 45, 'Professional camera with high resolution sensor and advanced features'),
('ART-002', 'Laptop Computer Pro 15"', 8500, 14500, 'pcs', 120, 'High-performance laptop with 16GB RAM and SSD storage'),
('ART-003', 'Wireless Mouse Ergonomic', 150, 350, 'pcs', 250, 'Comfortable ergonomic design with precision tracking'),
('ART-004', 'Mechanical Keyboard RGB', 850, 1450, 'pcs', 85, 'RGB backlit mechanical keyboard with Cherry MX switches'),
('ART-005', 'USB-C Hub 7-Port', 450, 890, 'pcs', 160, 'Multi-port hub with USB-C, HDMI, and card readers'),
('ART-006', 'External SSD 1TB', 1200, 2100, 'pcs', 95, 'Fast external solid-state drive with USB 3.2 Gen 2'),
('ART-007', 'Webcam HD 1080p', 680, 1250, 'pcs', 140, 'Full HD webcam with auto-focus and noise reduction'),
('ART-008', 'Bluetooth Headphones', 950, 1850, 'pcs', 180, 'Noise-cancelling wireless headphones with 30-hour battery'),
('ART-009', 'Smartphone Stand Adjustable', 120, 299, 'pcs', 320, 'Universal phone holder with 360-degree rotation'),
('ART-010', 'LED Monitor 27" 4K', 3200, 5800, 'pcs', 55, '4K UHD monitor with HDR support and 144Hz refresh rate'),
('ART-011', 'Graphics Tablet Professional', 2800, 4900, 'pcs', 42, 'Professional drawing tablet with pressure sensitivity'),
('ART-012', 'WiFi Router Dual-Band', 890, 1590, 'pcs', 110, 'High-speed dual-band router with mesh support'),
('ART-013', 'Power Bank 20000mAh', 380, 750, 'pcs', 290, 'Fast-charging power bank with multiple USB ports'),
('ART-014', 'Document Scanner A4', 1450, 2650, 'pcs', 68, 'High-speed document scanner with auto-feed'),
('ART-015', 'Desk Lamp LED Smart', 420, 890, 'pcs', 145, 'Smart LED lamp with app control and color temperature adjustment'),
('ART-016', 'Cable Management Kit', 85, 199, 'set', 425, 'Complete cable organization solution for desk setup'),
('ART-017', 'Microphone USB Condenser', 1150, 2100, 'pcs', 92, 'Studio-quality USB microphone with pop filter'),
('ART-018', 'Monitor Arm Dual Mount', 680, 1290, 'pcs', 78, 'Dual monitor mount with full articulation'),
('ART-019', 'Laptop Cooling Pad', 250, 499, 'pcs', 210, 'Laptop cooling stand with adjustable fans'),
('ART-020', 'Gaming Chair Ergonomic', 2500, 4200, 'pcs', 34, 'Comfortable gaming chair with lumbar support'),
('ART-021', 'Wireless Charger 15W', 280, 590, 'pcs', 185, 'Fast wireless charging pad compatible with Qi devices'),
('ART-022', 'Ethernet Cable Cat8 5m', 95, 219, 'pcs', 380, 'High-speed ethernet cable with gold-plated connectors'),
('ART-023', 'Screen Protector Glass', 65, 149, 'pcs', 520, 'Tempered glass screen protector with oleophobic coating'),
('ART-024', 'Bluetooth Speaker Portable', 580, 1150, 'pcs', 165, 'Waterproof portable speaker with 12-hour battery'),
('ART-025', 'Smart Watch Fitness', 1850, 3200, 'pcs', 89, 'Fitness tracker with heart rate monitor and GPS');

-- Verify the data was inserted
SELECT COUNT(*) as user_count FROM users;
SELECT COUNT(*) as product_count FROM products;
SELECT COUNT(*) as translation_count FROM translations;

