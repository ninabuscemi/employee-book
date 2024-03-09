-- Drop the database if it already exists
DROP DATABASE IF EXISTS employee_tracker;

-- Create a new database named employee_tracker
CREATE DATABASE employee_tracker;

-- Switch to the employee_tracker database
USE employee_tracker;

-- Create a table to store departments with a unique department ID and name
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

-- Create a table to store roles with a unique role ID, title, salary, and department ID
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    salary INT,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Create a table to store employees with a unique employee ID, first name, last name, role ID, and manager ID
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    employee_role int,
    manager_id INT,
    FOREIGN KEY (employee_role) REFERENCES roles(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
