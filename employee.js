var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Andrea0223*",
  database: "employee_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
 
    inquirer.prompt({
        type: "list",
        name: "todos",
        message: "What would you likd to do ?",
        choices:[
            "Add Department",
            "Add Employee",
            "Add Role",
            "Delete Department",
            "Quit",
            "View All Employees",
            "View All Employees By Department",
            "View All Roles",
            "Update Employee Role",
            
        ]
        })
      .then(function(answer) {
        switch(answer.todos){
        case "Add Department":
          addDepartment()
          break;
        case "Delete Department":
          removeDepartment()
          break;
        case"View All Employees":
          viewAllEmployees()
          break;
        case "View All Employees By Department":
          viewAllDepartments()
          break;
        case "Add Employee":
          addEmployee()
          break;
        case "Add Role":
            addRole()
          break;
        case "Update Employee Role":
          updateEmployee()
          break;
        case "Update Employee Manager":
          updateEmployeeManger()
          break;
        case "View All Roles":
          viewAllRoles()
          break;
        case "Quit":
          connection.end();
          break;
        }
      });
  }

