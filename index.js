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