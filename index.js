const inquirer = require('inquirer');
const mysql = require("mysql2");

// Create a connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tralala101*',
    database: 'employee_tracker'

        },
    console.log(`Welcome! You are connected to the employee_tracker database.`)
);

// Connects to the database
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database.");
    startApp();
});


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
    db.query("SELECT * FROM roles", (err, roles) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "role_id",
                type: "list",
                message: "What is the employee's role id?",
                choices: roles.map((role) => ({
                    name: role.title,
                    value: role.role_id,
                })),
            },
        ])
        .then((answer) => {
            const { first_name, last_name, role_id } = answer;
            db.query("INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)",
                [first_name, last_name, role_id],
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
            "INSERT INTO departments (dept_name) VALUES (?)", // Corrected column name here
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

                    const isValid = /^\d+(\.\d+)?$/.test(value);
                    return isValid || 'Please enter a valid number';
                }
            },
            {
                type: "list",
                name: "department",
                message: "Select the department for this role:",
               choices: results.map((dept) => ({
                name: dept.dept_name, // Corrected column name here
                value: dept.id, // Corrected column name here
                })),
            },
        ]).then((answer) => {
            // Converts salary to a number before inserting into the database
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
                        value: employee.id, // Corrected column name here
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
                    "UPDATE employees SET role_id = ? WHERE id = ?",
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
            case "Exit":
                console.log("Exiting the application.");
                // Drop the database before exiting
                dropDatabase();
                break;
        }
    });
}