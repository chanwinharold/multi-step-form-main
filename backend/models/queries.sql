-- Active: 1765363679242@@127.0.0.1@3306

DROP TABLE IF EXISTS Periods;
CREATE TABLE Periods (
    id_period INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) UNIQUE CHECK (name IN ('Monthly', 'Yearly'))
);

DROP TABLE IF EXISTS Plans;
CREATE TABLE Plans (
    id_plan INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(40) NOT NULL UNIQUE,
    imgUrl VARCHAR(255) NOT NULL UNIQUE,
    price_monthly DECIMAL NOT NULL,
    price_yearly DECIMAL NOT NULL
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    tel VARCHAR(40) UNIQUE NOT NULL,
    id_plan INTEGER REFERENCES Plans(id_plan),
    id_period INTEGER REFERENCES Periods(id_period)
);

DROP TABLE IF EXISTS Addons;
CREATE TABLE Addons (
    id_addon INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(40) UNIQUE NOT NULL,
    description VARCHAR(255) UNIQUE NOT NULL,
    price_monthly DECIMAL NOT NULL,
    price_yearly DECIMAL NOT NULL
);

DROP TABLE IF EXISTS ChoicesAddons;
CREATE TABLE ChoicesAddons(
    id_user INTEGER REFERENCES Users(id_user),
    id_addon INTEGER REFERENCES Addons(id_addon)
);

INSERT INTO Periods(name)
VALUES  ("Monthly"),
        ("Yearly");

INSERT INTO Plans(title, imgUrl, price_monthly, price_yearly)
VALUES  ('Arcade', 'icon-arcade.svg', 9, 90),
        ('Advanced', 'icon-advanced.svg', 12, 120),
        ('Pro', 'icon-pro.svg', 15, 150);

INSERT INTO Addons(title, description, price_monthly, price_yearly)
VALUES  ('Online service', 'Access to multiplayer games', 1, 10),
        ('Larger storage', 'Extra 1TB of cloud save', 2, 20),
        ('Customizable profile', 'Custom theme on your profile', 2, 20);

SELECT *
FROM Users
INNER JOIN "Plans" USING(id_plan)
INNER JOIN "ChoicesAddons" USING(id_user)
INNER JOIN "Addons" USING(id_addon)
INNER JOIN "Periods" USING(id_period);
