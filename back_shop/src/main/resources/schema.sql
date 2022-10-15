DROP TABLE IF EXISTS category;

CREATE TABLE category
(
    id  INTEGER PRIMARY KEY auto_increment,
    name     VARCHAR(128),
    description VARCHAR(256),
    category_id  INTEGER,
    foreign key (category_id) references category(id)
);

DROP TABLE IF EXISTS product;

CREATE TABLE product
(
    id  INTEGER PRIMARY KEY auto_increment,
    name     VARCHAR(128),
    description VARCHAR(256),
    price DOUBLE,
    category_id  INTEGER,
    foreign key (category_id) references category(id)
);