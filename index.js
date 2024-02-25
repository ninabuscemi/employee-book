const inquirer = require('inquirer');
const mysql = require("mysql12");
const cTable = require("console.table");

// Creates a connection to MySQL database

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_tracker",
});

// Connects to the database
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the databade.");
    startApp();
});

// Function to start the application
function startApp() {
    inquirer
    .prompt([
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
    ])

    .then((answer) => {
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
    db.query("SELECT * FROM roles", (err, results) =>{
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

// Function to add department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the name of the department",
            },
        ])
        .then((answer) => {
            db.query(
                "INSERT INTO departments (name) VALUES (?)",
                [answer.name],
                (err, results) => {
                    if (err) throw err;
                    console.log("Department added successfully.");
                    startApp();
                }
            );
        });
}

// Function to add a role
function addRole() {
  // Query to get department names for choices
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary for this role:",
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
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)",
          [answer.title, answer.salary, answer.department],
          (err, results) => {
            if (err) throw err;
            console.log("Role added successfully.");
            startApp();
          }
        );
      });
  });
}

// Function to update an employee's role
function updateEmployeeRole() {
  // Query to get employee names and role titles for choices
  db.query("SELECT * FROM employees", (err, employees) => {
    if (err) throw err;

    db.query("SELECT * FROM roles", (err, roles) => {
      if (err) throw err;

      inquirer
        .prompt([
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
        ])
        .then((answer) => {
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

// Function to update an employee's role
function updateEmployeeRole() {
  // Query to get employee names and role titles for choices
  db.query("SELECT * FROM employees", (err, employees) => {
    if (err) throw err;

    db.query("SELECT * FROM roles", (err, roles) => {
      if (err) throw err;

      inquirer
        .prompt([
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
        ])
        .then((answer) => {
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