var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
require('dotenv').config();

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.dbpassword,
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
            "Add Employee",
            "Add Department",
            "Add Role",
            "Delete Department",
            "View All Employees",
            "View All Employees By Department",
            "View All Roles",
            "Update Employee Role",
            "Quit",
            
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

// function to handle posting new items up for auction
function addEmployee() { 
  inquirer.prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter employee's first name:"
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter employee's last name:"
      },
      {
        name: "role",
        type: "list",
        message: "What is their role?",
        choices: selectRole()
      },
      {
        name: "choice",
        type: "rawlist",
        message: "What is their manager's name?",
        choices: selectManager()
      }
  ]).then(function (answer) {
    var roleId = selectRole().indexOf(answer.role)
    var managerId = selectManager().indexOf(answer.choice)
    connection.query("INSERT INTO employees SET ?", 
    {
        first_name: answer.firstname,
        last_name: answer.lastname,
        manager_id: managerId,
        role_id: roleId
        
    }, function(err){
        if (err) throw err
        console.table(answer)
        viewAllEmployees()
        start()
    })
})
}
function addRole() { 
  connection.query("SELECT roles.title AS Title, roles.salary AS Salary FROM roles",   
  function(err, res) {
    inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the new title?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary?"

      } 
    ])
    .then(function(answer) {
      connection.query(
          "INSERT INTO roles SET ?", 
          {
            title: answer.title,
            salary: answer.salary,
          },
          function(err) {
            if (err) throw err
            console.table(answer);
            start();
          }
        )
    });
  });
  }
function addDepartment() {
  inquirer.prompt([
    {
      name:"department",
      type:"input",
      message: "What is the department name?"

    }
  ]).then(function(answer){
    connection.query(
      "INSERT INTO department SET ?",
      {
        
           dep_name:answer.department

      },
      function(err){
        if (err) throw err;
        console.log("successfully added department")
        start();
      }
    )
  });
}

function removeDepartment() {
  connection.query("SELECT * FROM department", function(err, results) {
    if (err) throw err;
  inquirer.prompt([
    {
      name: "deldepartment",
      type: "rawlist",
      choices: function() {
        var depArray = [];
        for (var i = 0; i < results.length; i++) {
          depArray.push(results[i].dep_name);
        }
        return depArray;
      },
      message: "What department would you like to delete"
    },

  ]).then(function(answer){

    var chosenItem;
    for (var i = 0; i < results.length; i++) {
      if (results[i].dep_name === answer.deldepartment) {
        chosenItem = results[i];
      }
    }
    

      connection.query(
        "DELETE FROM department WHERE ?",
        [
          {
            dep_name: answer.deldepartment
          }
        ],
        function(error) {
          if (error) throw err;
          console.log("Department deleted successfully!");
          start();
        }
      );

  });
});
}
   
function updateEmployee() {
  connection.query("SELECT employees.last_name, roles.title FROM employees JOIN roles ON employees.role_id = roles.role_id;", function(err, res) {
    if (err) throw err
    console.log(res)
      inquirer.prompt([
        {
          name: "lastName",
          type: "rawlist",
          choices: function() {
            var lastName = [];
            for (var i = 0; i < res.length; i++) {
              lastName.push(res[i].last_name);
            }
            return lastName;
          },
          message: "What is the employee's last name?",
        },
        {
          name: "role",
          type: "rawlist",
          message: "What is the employees new title?",
          choices: selectRole()
        },
    ])
    .then(function(answer) {
      var roleId = selectRole().indexOf(answer.role)
      connection.query("UPDATE employees SET ? WHERE ?", 
      [
        {
          last_name: answer.lastName
        }, 
        {
          role_id: roleId
        } 
      ],
      function(err){
          if (err) throw err
          console.table(answer)
          start()
      })
    });
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


