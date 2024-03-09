INSERT INTO departments (dept_name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Human Resources');

INSERT INTO roles (title, salary, dept_id) VALUES
('Sales Lead', 100000, 1),
('Software Engineer', 120000, 2),
('Account Manager', 150000, 3),
('Accountant', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Nina', 'Buscemi', 1, NULL),
('Nick', 'Seech', 2, 1),
('Mike', 'Esu', 3, 1),
('Penelope', 'Smith', 4, NULL);