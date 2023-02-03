const mysql = require('mysql2');
require('dotenv').config();
const inquirer = require('inquirer');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.PASSWORD,
        database: 'employeetracker_db'
    },
    console.log(`Connected to the employeetracker_db database.`)
);

function init(){
inquirer
    .prompt([
        {
        type: 'list',
        name: 'selection',
        message: 'Please select what you would like',
        choices: [
            "view all departments", 
            "view all roles", 
            "view all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee's role"]
        }
    ])
    .then((answer) => {

        switch(answer.selection){
            case "view all departments":
                showDepts();

            break;

            case "view all roles":
                showRoles();

            break;

            case "view all employees":
                showEmployees();

            break;
            
            case "Add a department":
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'deptName',
                        message: 'What is the new departments name?'

                    }
                ]).then((answer) => {
                    addDept(answer.deptName);
                })

            break;

            case "Add a role":
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'roleName',
                        message: 'What is the new role name?'
                    },
                    {
                        type: 'input',
                        name: 'roleSalary',
                        message: 'What is the salary for this role?'
                    },
                    
                    {
                        type: 'input',
                        name: 'roleDept',
                        message: 'What is their departments ID?',
                    }
                ]).then((answer) => {
                    addRole(answer.roleName, answer.roleSalary, answer.roleDept);
                })

            break;

            case "Add an employee":
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employeeFirstName',
                        message: 'What is the the first name?'
                    },
                    {
                        type: 'input',
                        name: 'employeeLastName',
                        message: 'What is the last name?'
                    },
                    {
                        type: 'input',
                        name: 'employeeRole',
                        message: 'What is their role ID?'
                    },
                    {
                        type: 'input',
                        name: 'employeeManager',
                        message: 'What is their managers ID?'
                    }
                ]).then((answer) => {
                    addEmployee(answer.employeeFirstName, answer.employeeLastName, answer.employeeRole, answer.employeeManager);
                })

            break;

            case "Update an employee's role":

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employeeId',
                        message: 'What is the ID of the employee you want to update?'
                    },
                    {
                        type: 'input',
                        name: 'roleId',
                        message: 'What is their new role ID?'
                    }
                ]).then((answer) => {
                    updateEmployee(answer.roleId, answer.employeeId);
                })

                

            break;


        }


    });
}


    //Database Queries

    //Show queries
    function showDepts(){
    db.query('SELECT name AS Dept_Name FROM department', function (err, results) {
        console.table(results);

        init();
      });
    }

    function showRoles(){
        db.query('SELECT title AS Roles, role.id, department.name, department.id AS dept_id, salary FROM role JOIN department ON role.department_id = department.id', function (err, results) {
            console.table(results);
            init();
          });
        }

    function showEmployees(){
        db.query('SELECT employee.id, first_name, last_name, role.title, role.salary, department.name  FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', function (err, results) {
            console.table(results);
            init();
        });
        }
// Adding and updating queries
    function addDept(name){
        db.query('INSERT INTO department (name) VALUES (?)', name,  function (err, results) {
            console.log(results);
            init();
        });
        }

    function addRole(name, salary, dept){
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [name, salary, dept],  function (err, results) {
            console.log(results);
            init();
        });
        }

    function addEmployee(firstName, lastName, role, manager){
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, role, manager],  function (err, results) {
            console.log(results);
            init();
        });
        }

    function updateEmployee(roleId, employeeId){
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId],  function (err, results) {
            console.log(results);
            init();
        });
        }



init();

