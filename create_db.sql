CREATE DATABASE authentic_recipes;
USE authentic_recipes;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT,
  instructions TEXT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  user_id INT,
  rating INT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  user_id INT,
  comment TEXT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE Recipes ADD COLUMN story TEXT;
ALTER TABLE Recipes ADD COLUMN imagePath VARCHAR(255);
CREATE TABLE restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cuisine_type VARCHAR(255),
    address VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE restaurants MODIFY user_id INT NULL;

