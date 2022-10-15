INSERT INTO category (id, name, description, category_id)
VALUES (1, 'clothes', 'clothes for men and women', null),
       (2, 'shoes', 'shoes for men and women', null),
       (3,'men', 'men clothes', 1),
       (4,'women', 'women clothes', 1),
       (5,'men', 'men shoes', 2),
       (6,'women', 'women shoes', 2);
INSERT INTO product (id, name, description,price, category_id)
VALUES (1, 'T_shirt', 'Red Beautiful T_shirt',50.99, 4),
       (2, 'Jacket', 'Black jacket',100, 3),
       (3,'Timberland', 'Black shoes',150, 5),
       (4,'Nason shoes', 'black and white shoes',122.5, 6);

