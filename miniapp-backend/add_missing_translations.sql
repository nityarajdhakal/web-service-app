-- Migration: Add missing translation keys
-- Run this on your Render database to add the noProducts translation

-- Add noProducts translation for English
INSERT INTO translations (page, lang, key, value) 
VALUES ('pricelist', 'en', 'noProducts', 'No products available')
ON CONFLICT DO NOTHING;

-- Add noProducts translation for Swedish
INSERT INTO translations (page, lang, key, value) 
VALUES ('pricelist', 'sv', 'noProducts', 'Inga produkter tillgängliga')
ON CONFLICT DO NOTHING;

-- Verify all translations are loaded
SELECT page, lang, key, value 
FROM translations 
WHERE page = 'pricelist' 
ORDER BY lang, key;

