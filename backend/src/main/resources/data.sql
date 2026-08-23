INSERT IGNORE INTO categories (name, description, active) VALUES
('Pizza','Handcrafted Italian pizzas',TRUE),
('Pasta','Classic Italian pasta dishes',TRUE),
('Desserts','Homemade Italian desserts',TRUE),
('Drinks','Cold and hot beverages',TRUE);

INSERT IGNORE INTO food_items (category_id,name,description,price,available)
SELECT category_id,'Margherita Pizza','Tomato, mozzarella and basil',12.00,TRUE FROM categories WHERE name='Pizza';
INSERT IGNORE INTO food_items (category_id,name,description,price,available)
SELECT category_id,'Pepperoni Pizza','Tomato, mozzarella and pepperoni',15.00,TRUE FROM categories WHERE name='Pizza';
INSERT IGNORE INTO food_items (category_id,name,description,price,available)
SELECT category_id,'Carbonara','Pasta with egg, cheese and pancetta',14.00,TRUE FROM categories WHERE name='Pasta';
INSERT IGNORE INTO food_items (category_id,name,description,price,available)
SELECT category_id,'Bolognese','Slow-cooked beef and tomato sauce',15.00,TRUE FROM categories WHERE name='Pasta';
INSERT IGNORE INTO food_items (category_id,name,description,price,available)
SELECT category_id,'Tiramisu','Classic coffee and mascarpone dessert',8.00,TRUE FROM categories WHERE name='Desserts';
INSERT IGNORE INTO food_items (category_id,name,description,price,available)
SELECT category_id,'Lemonade','Fresh house lemonade',4.00,TRUE FROM categories WHERE name='Drinks';