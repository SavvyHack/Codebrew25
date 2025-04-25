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


INSERT INTO products (category, name, image_link, description, price, unit, stock, farmer_id, produce_at) VALUES
  ('fruits', 'Oranges', 'fruits_oranges1.png', 'Fresh Sunbury oranges.', 3.50, 'kg', 120, 1, '2025-04-20'),
  ('fruits', 'Strawberries', 'fruits_strawberries1.png', 'Juicy strawberries.', 4.20, 'punnet', 60, 1, '2025-04-22'),
  ('fruits', 'Apples', 'fruits_apples1.png', 'Crisp red apples.', 3.00, 'kg', 80, 1, '2025-04-18'),
  ('fruits', 'Bananas', 'fruits_bananas1.png', 'Sweet ripe bananas.', 2.50, 'kg', 100, 1, '2025-04-25'),
  ('fruits', 'Blueberries', 'fruits_blueberries1.png', 'Fresh blueberries.', 5.00, 'punnet', 50, 2, '2025-04-19'),
  ('fruits', 'Pears', 'fruits_pears1.png', 'Juicy pears.', 3.20, 'kg', 70, 2, '2025-04-20'),

  ('dairy', 'Whole Milk', 'dairy_wholemilk1.png', 'Fresh whole milk from Happy Cows Dairy.', 2.80, 'L', 200, 2, '2025-04-23'),
  ('dairy', 'Cheddar Cheese', 'dairy_cheddarcheese1.png', 'Aged cheddar cheese.', 5.50, 'block', 80, 2, '2025-04-18'),
  ('dairy', 'Yogurt', 'dairy_yogurt1.png', 'Natural yogurt.', 4.00, 'tub', 60, 2, '2025-04-20'),
  ('dairy', 'Butter', 'dairy_butter1.png', 'Creamy butter.', 3.80, 'block', 90, 2, '2025-04-21'),
  ('dairy', 'Cream', 'dairy_cream1.png', 'Fresh cream.', 2.90, 'bottle', 70, 2, '2025-04-22'),

  ('fats and oils', 'Olive Oil', 'fatsandoils_oliveoil1.png', 'Cold-pressed olive oil.', 7.99, '500ml', 100, 1, '2025-04-10'),
  ('fats and oils', 'Sunflower Oil', 'fatsandoils_sunfloweroil1.png', 'Pure sunflower oil.', 6.50, '1L', 80, 1, '2025-04-15'),
  ('fats and oils', 'Coconut Oil', 'fatsandoils_coconutoil1.png', 'Organic coconut oil.', 8.50, '500ml', 60, 2, '2025-04-17'),

  ('vegetables', 'Carrots', 'vegetables_carrots1.png', 'Organic orange carrots.', 2.00, 'kg', 150, 1, '2025-04-22'),
  ('vegetables', 'Broccoli', 'vegetables_broccoli1.png', 'Fresh broccoli.', 2.80, 'bunch', 70, 1, '2025-04-21'),
  ('vegetables', 'Potatoes', 'vegetables_potatoes1.png', 'Washed potatoes.', 1.80, 'kg', 200, 1, '2025-04-18'),
  ('vegetables', 'Tomatoes', 'vegetables_tomatoes1.png', 'Vine-ripened tomatoes.', 3.30, 'kg', 120, 2, '2025-04-20'),
  ('vegetables', 'Spinach', 'vegetables_spinach1.png', 'Fresh spinach leaves.', 2.50, 'bunch', 60, 2, '2025-04-19'),
  ('vegetables', 'Onions', 'vegetables_onions1.png', 'Brown onions.', 1.60, 'kg', 140, 2, '2025-04-18'),
  ('vegetables', 'Lettuce', 'vegetables_lettuce1.png', 'Crisp lettuce.', 2.20, 'head', 80, 2, '2025-04-17'),

  ('condiments', 'Tomato Sauce', 'condiments_tomatosauce1.png', 'Thick and tangy.', 3.20, 'bottle', 90, 1, '2025-03-15'),
  ('condiments', 'Mayonnaise', 'condiments_mayonnaise1.png', 'Creamy mayonnaise.', 3.50, 'jar', 70, 1, '2025-03-20'),
  ('condiments', 'Mustard', 'condiments_mustard1.png', 'Spicy mustard.', 2.80, 'jar', 60, 2, '2025-03-22'),
  ('condiments', 'BBQ Sauce', 'condiments_bbqsauce1.png', 'Smoky BBQ sauce.', 4.00, 'bottle', 50, 2, '2025-03-25'),

  ('beverage', 'Apple Juice', 'beverage_applejuice1.png', 'Pure apple juice.', 3.00, '1L', 110, 1, '2025-04-20'),
  ('beverage', 'Orange Juice', 'beverage_orangejuice1.png', 'Fresh orange juice.', 3.20, '1L', 90, 1, '2025-04-21'),
  ('beverage', 'Milkshake', 'beverage_milkshake1.png', 'Chocolate milkshake.', 4.50, 'bottle', 60, 2, '2025-04-22'),
  ('beverage', 'Lemonade', 'beverage_lemonade1.png', 'Sparkling lemonade.', 2.80, 'bottle', 70, 2, '2025-04-23'),

  ('sweets', 'Honeycomb', 'sweets_honeycomb1.png', 'Natural bush honeycomb.', 6.50, '250g', 40, 1, '2025-04-01'),
  ('sweets', 'Chocolate Bar', 'sweets_chocolatebar1.png', 'Dark chocolate bar.', 2.50, 'bar', 100, 1, '2025-04-10'),
  ('sweets', 'Fruit Cake', 'sweets_fruitcake1.png', 'Traditional fruit cake.', 8.00, 'cake', 30, 2, '2025-04-15'),
  ('sweets', 'Jam Donut', 'sweets_jamdonut1.png', 'Jam-filled donut.', 2.20, 'each', 90, 2, '2025-04-18');
