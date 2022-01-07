const inquirer = require("inquirer");
const util = require('util');
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

        
        switch(response.Menu) {


            case "View All Employees":
                
                display("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department on role.department_id = department.id INNER JOIN employee manager on manager.id = employee.manager_id;");
                
                
                inquirer.prompt([
                    {
                        message: "Would you like to do something else?",
                        type: "list",
                        name: "returnHome",
                        choices: ["Yes", "No, Exit"]
                
                    }]).then(response => {
                        switch(response.returnHome) {
                            case "Yes":
                                init();
                                break;
                            case "No, Exit":
                                return;
                        }
                    });
                break;

            case "View All Roles":
                
                display("SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id; ");
                inquirer.prompt([
                    {
                        message: "Would you like to do something else?",
                        type: "list",
                        name: "returnHome",
                        choices: ["Yes", "No, Exit"]
                
                    }]).then(response => {
                        switch(response.returnHome) {
                            case "Yes":
                                init();
                                break;
                            case "No, Exit":
                                return;
                        }
                    });
                break;
                

            case "View All Departments":
                
                display("SELECT * FROM department");
                inquirer.prompt([
                    {
                        message: "Would you like to do something else?",
                        type: "list",
                        name: "returnHome",
                        choices: ["Yes", "No, Exit"]
                
                    }]).then(response => {
                        switch(response.returnHome) {
                            case "Yes":
                                init();
                                break;
                            case "No, Exit":
                                return;
                        }
                    });
                break;

            case "Add Department":
                inquirer.prompt({
                    type:'input',
                    message: 'Select the department to add. \n\n',
                    name: 'addDepartment'
                }).then((response) => {
                    query(`INSERT INTO department(name) VALUES ("${response.addDepartment}")`)
                    console.log(`${response.addDepartment} added to departments`);
                }).then(function(){
                    inquirer.prompt([
                        {
                            message: "Would you like to do something else?",
                            type: "list",
                            name: "returnHome",
                            choices: ["Yes", "No, Exit"]
                    
                        }]).then(response => {
                            switch(response.returnHome) {
                                case "Yes":
                                    init();
                                    break;
                                case "No, Exit":
                                    return;
                            }
                        });
                });
                
                break;


            case "Add Role":
                 inquirer.prompt([{
                     type:'input',
                     message: 'What is the name of the new role?',
                     name: 'addRole',
                 },
                 {
                     type:'number',
                     message: "What is the role salary?",
                     name: "addSalary",
                 },
                 {
                    type:'list',
                    message: 'Which department does the new role belong to? \n\n',
                    name: 'employeeDepartment',

                    choices: departments.map(item => ({name: item.name, value: item.id}))

                 }
                ]).then((response) => {
                    query(`INSERT INTO role(title,salary,department_id) VALUES ("${response.addRole}", "${response.addSalary}", "${response.employeeDepartment}")`);
                    console.log(`${response.addRole} has been added to roles`);
                    
            }).then(function(){
                inquirer.prompt([
                    {
                        message: "Would you like to do something else?",
                        type: "list",
                        name: "returnHome",
                        choices: ["Yes", "No, Exit"]
                
                    }]).then(response => {
                        switch(response.returnHome) {
                            case "Yes":
                                init();
                                break;
                            case "No, Exit":
                                return;
                        }
                    });
            });
                break;


            case "Add Employee":
                inquirer.prompt([{
                    type:'input',
                    message: 'Enter the first name. \n\n',
                    name: 'firstName'
                },

                 {
                    type:'input',
                    message: 'Enter the last name. \n\n',
                    name: 'lastName'
                 },
                 {
                    type:'list',
                    message: 'Select the employee role. \n\n',
                    name: 'employeeRole',
                    choices: roles.map(item => ({name: item.title, value: item.id}))

                 },

                 {
                    type:'list',
                    message: 'Select the manager of the employee. \n\n',
                    name: 'employeeManager',
                    choices: managers.map((item) => ({name: item.first_name + ' ' + item.last_name, value: item.id}))

                 }

            ]).then((response) => {
                    query(`INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ("${response.firstName}", "${response.lastName}", "${response.employeeRole}", "${response.employeeManager}")`);
                    console.log("New employee successfully added");
                }).then(function(){
                    inquirer.prompt([
                        {
                            message: "Would you like to do something else?",
                            type: "list",
                            name: "returnHome",
                            choices: ["Yes", "No, Exit"]
                    
                        }]).then(response => {
                            switch(response.returnHome) {
                                case "Yes":
                                    init();
                                    break;
                                case "No, Exit":
                                    return;
                            }
                        });
                });
                break;


            case "Update Employee Role":
                inquirer.prompt([{
                    type:'list',
                    message: 'Which employee do you want to update? \n\n',
                    name: 'updateEmployee',
                    choices: employees.map((item) => ({name: item.first_name + ' ' + item.last_name, value: item.id}))

                 },
                 {
                    type:'list',
                    message: 'Which role do you want to assign to the selected employee? \n\n',
                    name: 'updateEmployeeRole',

                    choices: roles.map(item => ({name: item.title, value: item.id}))
                 }]).then((response) => {
                    query(`UPDATE employee SET employee.role_id = ${response.updateEmployeeRole} WHERE employee.id = ${response.updateEmployee}`);
                    console.log("Successfully updated employee role.");
                 }).then(function(){
                    inquirer.prompt([
                        {
                            message: "Would you like to do something else?",
                            type: "list",
                            name: "returnHome",
                            choices: ["Yes", "No, Exit"]
                    
                        }]).then(response => {
                            switch(response.returnHome) {
                                case "Yes":
                                    init();
                                    break;
                                case "No, Exit":
                                    return;
                            }
                        });
                });
                break;
            case "Exit":
                return;
                

            
        }
    })
}


init();


const display = async (queryParams) => {
    const res = await query(queryParams);
    console.table(res);
}