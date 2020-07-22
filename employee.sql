DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
  dep_id INT NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (dep_id)
);
CREATE TABLE roles(
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) default 0,
  department_id INT default 0,
  PRIMARY KEY (role_id)
);
CREATE TABLE employees(
  emp_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT default 0,
  manager_id INT default 0 ,
  PRIMARY KEY (emp_id)
);
