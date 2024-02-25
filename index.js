const inquirer = require('inquirer');
const mysql = require("mysql12");
const cTable = require("console.table");

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
    
}
