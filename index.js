const inquirer = require('inquirer');
const mysql = require("mysql2");
const cTable = require("console.table");

// Creates a connection to MySQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tralala101*",
    database: "employee_tracker",
});

// Connects to the database
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database.");
    startApp();
});

// Function to start the application
function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Delete a department",
                "Delete a role",
                "Delete an employee",
                "Exit",
            ],
        },
    ]).then((answer) => {
        switch (answer.action) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateEmployeeRole();
                break;
           case "Delete a department":
                deleteDepartment();
                break;
            case "Delete a role":
                deleteRole();
                break;
            case "Delete an employee":
                deleteEmployee();
                break;
            case "Exit":
                console.log("Exiting the application.");
                db.end();
                break;
        }
    });
}
// Function to view all roles
function viewRoles() {
    db.query("SELECT * FROM roles", (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

// Function to view all departments
function viewDepartments() {
    db.query("SELECT * FROM departments", (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

// Function to view all employees
function viewEmployees() {
    db.query("SELECT * FROM employees", (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

// Function to add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter the employee's first name:",
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name:",
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the employee's role ID:",
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter the employee's manager ID (if applicable):",
        },
    ]).then((answer) => {
        const { first_name, last_name, role_id, manager_id } = answer;
        db.query(
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [first_name, last_name, role_id, manager_id],
            (err, results) => {
                if (err) {
                    console.log("Error adding employee:", err.message);
                } else {
                    console.log("Employee added successfully.");
                }
                startApp();
            }
        );
    });
}

// Function to add department
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the name of the department",
        },
    ]).then((answer) => {
        db.query(
            "INSERT INTO departments (name) VALUES (?)",
            [answer.name],
            (err, results) => {
                if (err) {
                    console.log("Error adding department:", err.message);
                } else {
                    console.log("Department added successfully.");
                }
                startApp();
            }
        );
    });
}

// Function to add a role
function addRole() {
    db.query("SELECT * FROM departments", (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the title of the role:",
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the salary for this role:",
                validate: function (value) {
                    // Validate if the input is a valid number
                    const isValid = /^\d+(\.\d+)?$/.test(value);
                    return isValid || 'Please enter a valid number';
                }
            },
            {
                type: "list",
                name: "department",
                message: "Select the department for this role:",
                choices: results.map((dept) => ({
                    name: dept.name,
                    value: dept.dept_id,
                })),
            },
        ]).then((answer) => {
            // Convert salary to a number before inserting into the database
            const salary = parseFloat(answer.salary);
            db.query(
                "INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)",
                [answer.title, salary, answer.department],
                (err, results) => {
                    if (err) {
                        console.log("Error adding role:", err.message);
                    } else {
                        console.log("Role added successfully.");
                    }
                    startApp();
                }
            );
        });
    });
}

// Function to update an employee's role
function updateEmployeeRole() {
    db.query("SELECT * FROM employees", (err, employees) => {
        if (err) throw err;
        db.query("SELECT * FROM roles", (err, roles) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Select the employee to update:",
                    choices: employees.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.employee_id,
                    })),
                },
                {
                    type: "list",
                    name: "roleId",
                    message: "Select the employee's new role:",
                    choices: roles.map((role) => ({
                        name: role.title,
                        value: role.role_id,
                    })),
                },
            ]).then((answer) => {
                db.query(
                    "UPDATE employees SET role_id = ? WHERE employee_id = ?",
                    [answer.roleId, answer.employeeId],
                    (err, results) => {
                        if (err) throw err;
                        console.log("Employee role updated successfully.");
                        startApp();
                    }
                );
            });
        });
    });
}

// Function to delete a department
function deleteDepartment() {
    db.query("SELECT * FROM departments", (err, departments) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "departmentId",
                message: "Select the department to delete:",
                choices: departments.map((dept) => ({
                    name: dept.name,
                    value: dept.dept_id,
                })),
            },
        ]).then((answer) => {
            db.query(
                "DELETE FROM departments WHERE dept_id = ?",
                [answer.departmentId],
                (err, results) => {
                    if (err) {
                        console.log("Error deleting department:", err.message);
                    } else {
                        console.log("Department deleted successfully.");
                    }
                    startApp();
                }
            );
        });
    });
}

// Function to delete a role
function deleteRole() {
    db.query("SELECT * FROM roles", (err, roles) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "roleId",
                message: "Select the role to delete:",
                choices: roles.map((role) => ({
                    name: role.title,
                    value: role.role_id,
                })),
            },
        ]).then((answer) => {
            db.query(
                "DELETE FROM roles WHERE role_id = ?",
                [answer.roleId],
                (err, results) => {
                    if (err) {
                        console.log("Error deleting role:", err.message);
                    } else {
                        console.log("Role deleted successfully.");
                    }
                    startApp();
                }
            );
        });
    });
}

// Function to delete an employee
function deleteEmployee() {
    db.query("SELECT * FROM employees", (err, employees) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Select the employee to delete:",
                choices: employees.map((employee) => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.employee_id,
                })),
            },
        ]).then((answer) => {
            db.query(
                "DELETE FROM employees WHERE employee_id = ?",
                [answer.employeeId],
                (err, results) => {
                    if (err) {
                        console.log("Error deleting employee:", err.message);
                    } else {
                        console.log("Employee deleted successfully.");
                    }
                    startApp();
                }
            );
        });
    });
}