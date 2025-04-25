-- Insert mock users (some customers, some farmers)
INSERT INTO users (email, type, password) VALUES
  ('customer1@example.com', 'customer', 'hashedpassword1'),
  ('customer2@example.com', 'customer', 'hashedpassword2'),
  ('farmer1@example.com', 'farmer', 'hashedpassword3'),
  ('farmer2@example.com', 'farmer', 'hashedpassword4');

-- Insert mock customers (customer_id_info references users.id for customers)
INSERT INTO customers (name, address, phone, customer_id_info) VALUES
  ('Alice Smith', '123 Main St, Sunbury', '0412345678', 1),
  ('Bob Johnson', '456 Oak Ave, Ballarat', '0423456789', 2);

-- Insert mock farmers (farmer_id_info references users.id for farmers)
INSERT INTO farmers (name, farm_location, suburb, contact_info, farmer_id_info) VALUES
  ('Green Valley Farm', '123 Green Rd', 'Sunbury', 'contact@greenvalley.com', 3),
  ('Happy Cows Dairy', '45 Milk St', 'Gippsland', 'info@happycows.com.au', 4);

-- Insert mock products (farmer_id references farmers.id)
INSERT INTO products (category, name, image_link, description, price, unit, stock, farmer_id, produce_at) VALUES
  ('fruits', 'Oranges', 'link_to_oranges.jpg', 'Fresh Sunbury oranges.', 3.50, 'kg', 120, 1, '2025-04-20'),
  ('fruits', 'Strawberries', 'link_to_strawberries.jpg', 'Juicy strawberries.', 4.20, 'punnet', 60, 1, '2025-04-22'),
  ('fruits', 'Apples', 'link_to_apples.jpg', 'Crisp red apples.', 3.00, 'kg', 80, 1, '2025-04-18'),
  ('fruits', 'Bananas', 'link_to_bananas.jpg', 'Sweet ripe bananas.', 2.50, 'kg', 100, 1, '2025-04-25'),
  ('fruits', 'Blueberries', 'link_to_blueberries.jpg', 'Fresh blueberries.', 5.00, 'punnet', 50, 2, '2025-04-19'),
  ('fruits', 'Pears', 'link_to_pears.jpg', 'Juicy pears.', 3.20, 'kg', 70, 2, '2025-04-20'),

  ('dairy', 'Whole Milk', 'link_to_milk.jpg', 'Fresh whole milk from Happy Cows Dairy.', 2.80, 'L', 200, 2, '2025-04-23'),
  ('dairy', 'Cheddar Cheese', 'link_to_cheese.jpg', 'Aged cheddar cheese.', 5.50, 'block', 80, 2, '2025-04-18'),
  ('dairy', 'Yogurt', 'link_to_yogurt.jpg', 'Natural yogurt.', 4.00, 'tub', 60, 2, '2025-04-20'),
  ('dairy', 'Butter', 'link_to_butter.jpg', 'Creamy butter.', 3.80, 'block', 90, 2, '2025-04-21'),
  ('dairy', 'Cream', 'link_to_cream.jpg', 'Fresh cream.', 2.90, 'bottle', 70, 2, '2025-04-22'),

  ('fats and oils', 'Olive Oil', 'link_to_oil.jpg', 'Cold-pressed olive oil.', 7.99, '500ml', 100, 1, '2025-04-10'),
  ('fats and oils', 'Sunflower Oil', 'link_to_sunfloweroil.jpg', 'Pure sunflower oil.', 6.50, '1L', 80, 1, '2025-04-15'),
  ('fats and oils', 'Coconut Oil', 'link_to_coconutoil.jpg', 'Organic coconut oil.', 8.50, '500ml', 60, 2, '2025-04-17'),

  ('vegetables', 'Carrots', 'link_to_carrots.jpg', 'Organic orange carrots.', 2.00, 'kg', 150, 1, '2025-04-22'),
  ('vegetables', 'Broccoli', 'link_to_broccoli.jpg', 'Fresh broccoli.', 2.80, 'bunch', 70, 1, '2025-04-21'),
  ('vegetables', 'Potatoes', 'link_to_potatoes.jpg', 'Washed potatoes.', 1.80, 'kg', 200, 1, '2025-04-18'),
  ('vegetables', 'Tomatoes', 'link_to_tomatoes.jpg', 'Vine-ripened tomatoes.', 3.30, 'kg', 120, 2, '2025-04-20'),
  ('vegetables', 'Spinach', 'link_to_spinach.jpg', 'Fresh spinach leaves.', 2.50, 'bunch', 60, 2, '2025-04-19'),
  ('vegetables', 'Onions', 'link_to_onions.jpg', 'Brown onions.', 1.60, 'kg', 140, 2, '2025-04-18'),
  ('vegetables', 'Lettuce', 'link_to_lettuce.jpg', 'Crisp lettuce.', 2.20, 'head', 80, 2, '2025-04-17'),

  ('condiments', 'Tomato Sauce', 'link_to_sauce.jpg', 'Thick and tangy.', 3.20, 'bottle', 90, 1, '2025-03-15'),
  ('condiments', 'Mayonnaise', 'link_to_mayo.jpg', 'Creamy mayonnaise.', 3.50, 'jar', 70, 1, '2025-03-20'),
  ('condiments', 'Mustard', 'link_to_mustard.jpg', 'Spicy mustard.', 2.80, 'jar', 60, 2, '2025-03-22'),
  ('condiments', 'BBQ Sauce', 'link_to_bbq.jpg', 'Smoky BBQ sauce.', 4.00, 'bottle', 50, 2, '2025-03-25'),

  ('beverage', 'Apple Juice', 'link_to_juice.jpg', 'Pure apple juice.', 3.00, '1L', 110, 1, '2025-04-20'),
  ('beverage', 'Orange Juice', 'link_to_oj.jpg', 'Fresh orange juice.', 3.20, '1L', 90, 1, '2025-04-21'),
  ('beverage', 'Milkshake', 'link_to_milkshake.jpg', 'Chocolate milkshake.', 4.50, 'bottle', 60, 2, '2025-04-22'),
  ('beverage', 'Lemonade', 'link_to_lemonade.jpg', 'Sparkling lemonade.', 2.80, 'bottle', 70, 2, '2025-04-23'),

  ('sweets', 'Honeycomb', 'link_to_honeycomb.jpg', 'Natural bush honeycomb.', 6.50, '250g', 40, 1, '2025-04-01'),
  ('sweets', 'Chocolate Bar', 'link_to_choc.jpg', 'Dark chocolate bar.', 2.50, 'bar', 100, 1, '2025-04-10'),
  ('sweets', 'Fruit Cake', 'link_to_cake.jpg', 'Traditional fruit cake.', 8.00, 'cake', 30, 2, '2025-04-15'),
  ('sweets', 'Jam Donut', 'link_to_donut.jpg', 'Jam-filled donut.', 2.20, 'each', 90, 2, '2025-04-18');
