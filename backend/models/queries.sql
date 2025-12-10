-- Active: 1765363679242@@127.0.0.1@3306

DROP TABLE IF EXISTS AddonPrices;
CREATE TABLE AddonPrices (
    id_addon_price INTEGER PRIMARY KEY AUTOINCREMENT,
    price INTEGER NOT NULL
);

DROP TABLE IF EXISTS PlanPrices;
CREATE TABLE PlanPrices (
    id_plan_price INTEGER PRIMARY KEY AUTOINCREMENT,
    price INTEGER NOT NULL
);

DROP TABLE IF EXISTS Periods;
CREATE TABLE Periods (
    id_period INTEGER PRIMARY KEY AUTOINCREMENT,
    period VARCHAR(20) NOT NULL CHECK (period IN ("Monthly", "Yearly")),
    id_addon_price INTEGER REFERENCES AddonPrices(id_addon_price),
    id_plan_price INTEGER REFERENCES PlanPrices(id_plan_price)
);

DROP TABLE IF EXISTS Plans;
CREATE TABLE Plans (
    id_plan INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL,
    id_period INTEGER REFERENCES Periods(id_period)
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    tel VARCHAR(20) UNIQUE NOT NULL,
    id_plan INTEGER REFERENCES Plans(id_plan)
);

DROP TABLE IF EXISTS Addons;
CREATE TABLE Addons (
    id_addon INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) UNIQUE NOT NULL,
    description VARCHAR(255) UNIQUE NOT NULL,
    tel VARCHAR(20) UNIQUE NOT NULL,
    id_plan INTEGER REFERENCES Plans(id_plan)
);

DROP TABLE IF EXISTS Choices;
CREATE TABLE Choices(
    id_user INTEGER REFERENCES Users(id_user),
    id_addon INTEGER REFERENCES Addons(id_addon)
);

/* INSERT INTO PlanPrices() */
