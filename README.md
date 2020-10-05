# Employee-Tracker Using MySQL
![badmath](https://img.shields.io/github/languages/top/llaraama/Employee-Tracker)

## Table of Contents:
  * [Description](#Description)
 
  * [User Story](#User-Story)
  
  * [Installation](#Installation)

  * [Usage](#Usage)

  * [License](#License)

  * [Contributing](#Contributing)

  * [Technology](#Technology)


## Description 
Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. My challenge was to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

Database schema containing three tables:

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  

## User Story 
```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

  * The command-line application allow users to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles
  
  
## Installation 
Clone this repo to your local machine using: https://github.com/llaraama/Employee-Tracker.git

## Usage
![Employee Tracker](Assets/employee-tracker.gif)

Video Functionality: https://drive.google.com/file/d/1z3hiMBjP2ii3ZuOWR4yV_jMXVkW6F0f_/view


## License 
MIT License 

## Technology 
Node.js, Inquirer, MySQL
