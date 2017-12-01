CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Balenciaga Triple S", "clothing", 850, 100);

SELECT * FROM products

UPDATE products
SET stock_quantity = 2000
WHERE item_id = 3;

