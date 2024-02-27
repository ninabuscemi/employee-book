-- Drop the database if it already exists
DROP DATABASE IF EXISTS employee_tracker;

-- Create a new database named employee_tracker
CREATE DATABASE employee_tracker;

-- Switch to the employee_tracker database
USE employee_tracker;

-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

-- Create a table to store departments with a unique department ID and name
CREATE TABLE departments (
    dept_id AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE
);

-- Create a table to store roles with a unique role ID, title, salary, and department ID
CREATE TABLE roles (
    role_id AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE,
    salary DECIMAL(10, 2),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- Create a table to store employees with a unique employee ID, first name, last name, role ID, and manager ID
CREATE TABLE employees (
    employee_id AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    UNIQUE (first_name, last_name),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);
