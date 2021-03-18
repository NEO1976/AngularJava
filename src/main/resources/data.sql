DROP TABLE IF EXISTS bestellung;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT PRIMARY KEY,
  FIRST_NAME VARCHAR(250) NOT NULL,
  LAST_NAME VARCHAR(250) NOT NULL,
  EMAIL VARCHAR(250) NOT NULL
);

CREATE TABLE bestellung (
  id INT PRIMARY KEY,
  DEFINITION VARCHAR2 (2000) NOT NULL,
  PREIS_TOTAL INTEGER,
  USERS_ID INT,
  FOREIGN KEY (USERS_ID) REFERENCES  users(id)

);

INSERT INTO users (ID, FIRST_NAME, LAST_NAME, EMAIL) VALUES
  (1, 'first', 'last 1', 'abc1@gmail.com'),
  (2, 'first', 'last 2', 'abc2@gmail.com'),
  (3, 'first', 'last 3', 'abc3@gmail.com');

DROP TABLE IF EXISTS felgen;

CREATE TABLE felgen(
  id INT PRIMARY KEY,
 DEFINITION VARCHAR(255),
  PREIS NUMBER(255)
);

INSERT INTO felgen(id, DEFINITION, PREIS) VALUES
    (1, '18 Zoll Felgen mit 5 Speichen Design', 1000.00),
    (2, '18 Zoll Felgen mit 4 Speichen Design', 800.00);



DROP TABLE IF EXISTS lackierung;

CREATE TABLE lackierung(
  id INT PRIMARY KEY,
 DEFINITION VARCHAR(255),
  PREIS NUMBER(255)
);

INSERT INTO lackierung(id, DEFINITION, PREIS) VALUES
    (1, 'Schwarz mit Perleneffekt', 1000.00);

DROP TABLE IF EXISTS motorleistung;

CREATE TABLE motorleistung(
  id INT PRIMARY KEY,
 DEFINITION VARCHAR(255),
  PREIS NUMBER(255)
);

INSERT INTO motorleistung(id, DEFINITION, PREIS) VALUES
    (1, '1.8 TFSI Benzin', 1000.00);

DROP TABLE IF EXISTS sonderausstattung;

CREATE TABLE sonderausstattung(
  id INT PRIMARY KEY,
 DEFINITION VARCHAR(255),
  PREIS NUMBER(255)
);

INSERT INTO sonderausstattung(id, DEFINITION, PREIS) VALUES
    (1, 'Navigation', 1000.00),
    (2, 'Auto Cruise Control', 6000),
    (3, 'Automatische Parkhilfe', 5000),
    (4, 'Tempomat', 1200),
    (5, 'Elektrische Sitzheizung', 4000);



