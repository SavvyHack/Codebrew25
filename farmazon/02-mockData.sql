INSERT INTO farmers (name, type, farm_location, suburb, contact_info) VALUES
('Green Valley Farm', 'business', '123 Green Rd', 'Sunbury', 'contact@greenvalley.com'),
('Happy Cows Dairy', 'business', '45 Milk St', 'Gippsland', 'info@happycows.com.au'),
('Tom’s Organic Veggies', 'personal', '78 Veggie Lane', 'Ballarat', 'tom@organicveggies.com'),
('Sunny Grove', 'business', '100 Orange Blvd', 'Mildura', 'sunny@grove.com'),
('MeatCo Farm', 'business', '10 Angus Ave', 'Shepparton', 'hello@meatco.com');




INSERT INTO products (category, name, image_link, description, price, unit, stock, farmer_id, produce_at, expire_at) VALUES
-- Fruits
('fruits', 'Oranges', 'link_to_oranges.jpg', 'Fresh Mildura oranges.', 3.50, 'kg', 120, 4, '2025-04-20', '2025-05-01'),
('fruits', 'Strawberries', 'link_to_strawberries.jpg', 'Juicy, sweet strawberries.', 4.20, 'punnet', 60, 4, '2025-04-22', '2025-04-29'),

-- Dairy
('dairy', 'Whole Milk', 'link_to_milk.jpg', 'Fresh whole milk.', 2.80, 'L', 200, 2, '2025-04-23', '2025-04-30'),
('dairy', 'Cheddar Cheese', 'link_to_cheese.jpg', 'Aged cheddar cheese.', 5.50, 'block', 80, 2, '2025-04-18', '2025-06-01'),

-- Fats and Oils
('fats and oils', 'Olive Oil', 'link_to_oil.jpg', 'Cold-pressed olive oil.', 7.99, '500ml', 100, 1, '2025-04-10', '2026-04-10'),

-- Vegetables
('vegetables', 'Carrots', 'link_to_carrots.jpg', 'Organic orange carrots.', 2.00, 'kg', 150, 3, '2025-04-22', '2025-05-05'),
('vegetables', 'Broccoli', 'link_to_broccoli.jpg', 'Fresh cut broccoli heads.', 2.80, 'bunch', 70, 3, '2025-04-21', '2025-04-29'),

-- Condiments
('condiments', 'Tomato Sauce', 'link_to_sauce.jpg', 'Thick and tangy.', 3.20, 'bottle', 90, 1, '2025-03-15', '2026-03-15'),

-- Beverages
('beverage', 'Apple Juice', 'link_to_juice.jpg', 'Pure cold-pressed apple juice.', 3.00, '1L', 110, 1, '2025-04-20', '2025-05-20'),

-- Sweets
('sweet', 'Honeycomb', 'link_to_honeycomb.jpg', 'Natural bush honeycomb.', 6.50, '250g', 40, 1, '2025-04-01', '2025-09-01'),

-- Meat
('meat', 'Beef Steak', 'link_to_steak.jpg', 'Grass-fed beef steaks.', 15.00, '500g', 100, 5, '2025-04-20', '2025-04-27'),
('meat', 'Lamb Chops', 'link_to_lamb.jpg', 'Juicy lamb chops.', 13.00, '500g', 80, 5, '2025-04-20', '2025-04-28');