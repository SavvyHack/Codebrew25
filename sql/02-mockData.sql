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

-- Insert mock data for products based on app/explore/page.tsx structure


INSERT INTO products (category, name, image_link, description, price, unit, stock, farmer_id, location, delivery, pickup, expiry_date) VALUES
  ('Vegetables', 'Organic Tomatoes', 'organicTomatoes.png', 'Fresh, locally grown organic tomatoes', 5.99, 'kg', 100, 1, 'Brisbane, QLD', TRUE, TRUE, '2023-12-15'),
  ('Dairy', 'Free Range Eggs', 'freeRangeEggs.png', 'Farm fresh free-range eggs from happy hens', 7.50, 'dozen', 80, 2, 'Sydney, NSW', TRUE, FALSE, '2023-12-10'),
  ('Specialty', 'Raw Honey', 'rawHoney.png', 'Pure, unfiltered honey from local beehives', 12.99, 'jar', 50, 1, 'Melbourne, VIC', TRUE, TRUE, '2024-06-20'),
  ('Bakery', 'Artisan Sourdough Bread', 'artisanSourdoughBread.png', 'Handcrafted sourdough bread made with organic flour', 6.50, 'loaf', 40, 2, 'Adelaide, SA', FALSE, TRUE, '2023-12-05'),
  ('Fruits', 'Organic Apples', 'organicApples.png', 'Sweet and crisp organic apples', 4.99, 'kg', 120, 1, 'Hobart, TAS', TRUE, TRUE, '2023-12-18'),
  ('Dairy', 'Fresh Goat Cheese', 'freshGoatCheese.png', 'Creamy, tangy goat cheese from pasture-raised goats', 8.99, '200g', 60, 2, 'Canberra, ACT', TRUE, FALSE, '2023-12-12'),
  ('Vegetables', 'Organic Carrots', 'organicCarrots.png', 'Sweet, crunchy organic carrots', 3.99, 'bunch', 150, 1, 'Brisbane, QLD', TRUE, TRUE, '2023-12-15');
