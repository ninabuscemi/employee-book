const inquirer = require('inquirer');
const mysql = require("mysql12");
const cTable = require("console.table");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_tracker";
})