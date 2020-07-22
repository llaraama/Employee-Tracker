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

  function viewAllEmployees() {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.dep_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on roles.role_id = employees.role_id INNER JOIN department on dep_id = roles.department_id left join employees e on employees.manager_id = e.emp_id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      start()
    })
  }
  
  function viewAllRoles() {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title AS Title FROM employees JOIN roles ON employees.role_id = roles.role_id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      start()
    })
  }
  
  function viewAllDepartments() {
    connection.query("SELECT employees.first_name, employees.last_name, department.dep_name AS Department FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN department ON roles.department_id = department.dep_id ORDER BY employees.emp_id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      start()
    })
  }
  


  var roleArray = [];
  function selectRole() {
    connection.query("SELECT * FROM roles", function(err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        roleArray.push(res[i].title);
      }
    })
    return roleArray;
  }
  
  var managersArray = [];
  function selectManager() {
    connection.query("SELECT first_name, last_name FROM employees WHERE manager_id IS NULL", function(err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        managersArray.push(res[i].first_name);
      }
    })
    return managersArray;
  }
  
  