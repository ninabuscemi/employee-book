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