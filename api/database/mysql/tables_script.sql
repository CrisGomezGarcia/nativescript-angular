CREATE DATABASE school;
USE school;

CREATE TABLE clasification(
	id VARCHAR(6) NOT NULL PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);

CREATE TABLE personal_information (
  matricule VARCHAR(10) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  country VARCHAR(150) NOT NULL,
  clasification VARCHAR(6) NOT NULL,
  CONSTRAINT FOREIGN KEY (clasification) REFERENCES clasification(id)
);

CREATE TABLE sessions_type(
	id VARCHAR(10) NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    description VARCHAR(150)
);

CREATE TABLE sessions (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    matricule VARCHAR(10) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    created_at DATETIME NOT NULL,
    session_type VARCHAR(10) NOT NULL,
    CONSTRAINT FOREIGN KEY (matricule) REFERENCES personal_information(matricule),
    CONSTRAINT FOREIGN KEY (session_type) REFERENCES sessions_type(id)
);