USE employee_DB;
INSERT INTO department (dep_id, dep_name)
VALUES ("1","Sales");
INSERT INTO department (dep_id, dep_name)
VALUES ("2","Engineering");
INSERT INTO department (dep_id, dep_name)
VALUES ("3","Finance");
INSERT INTO department (dep_id, dep_name)
VALUES ("4","Legal");
INSERT INTO roles (role_id, title, salary, department_id)
VALUES ("1","Sales Lead", 100000, 1);
INSERT INTO roles (role_id, title, salary, department_id)
VALUES ("2","Lead Engineer", 150000, 2);
INSERT INTO roles (role_id, title, salary, department_id)
VALUES ("3","Sales Person", 45000, 1);
INSERT INTO roles (role_id, title, salary, department_id)
VALUES ("4","Software Engineer", 120000, 2);
INSERT INTO roles (role_id, title, salary, department_id)
VALUES ("5","Accountant", 125000, 3);
INSERT INTO roles (role_id, title, salary, department_id)
VALUES ("6","Account Manager", 120000, 3);
INSERT INTO roles (role_id, title, salary, department_id)
VALUES ("7","Legal Team Lead", 250000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Phillip", "Doe", 1, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Henry", "Chan", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Rodriguez", 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Laura", "Tupik", 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jessica", "Brown", 5, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Black", 2, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 4, 7);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Christian", "Low", 1, 2);