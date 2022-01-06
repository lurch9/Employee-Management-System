const inquirer = require("inquirer");
const mysql = require("mysql2");

//connect to mysql database
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database: "employee_management_db"
});


const query = util.promisify(db.query).bind(db); 

const init = async () => {


    const managers = await query("SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS TITLE FROM employee INNER JOIN role ON employee.role_id = role.id WHERE role.title='Manager'");

    const roles = await query("SELECT * FROM role");

    const employees = await query("SELECT * FROM employee");

    const departments = await query("SELECT * FROM department");

    inquirer.prompt([
        {
            message: "Welcome! What do you want to do?",
            type: "list",
            name: "Menu",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Exit"]
    
        }
    ]).then(response => {
        
    })