-- Insert data into the departments table
INSERT INTO departments (name) VALUES
('Engineering'),
('Sales'),
('Marketing'),
('Human Resources');

-- Insert data into the roles table
INSERT INTO roles (title, salary, dept_id) VALUES
('Software Engineer', 80000, 1),  -- Engineering
('Sales Manager', 90000, 2),       -- Sales
('Marketing Coordinator', 60000, 3),-- Marketing
('HR Specialist', 65000, 4);       -- Human Resources

-- Insert data into the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),           
('Jane', 'Smith', 2, 1),         
('Michael', 'Johnson', 3, NULL),    
('Emily', 'Williams', 4, 1);      