-- view all depts
SELECT name AS Dept_Name, id FROM department;
-- view all roles
SELECT title AS Roles, role.id, department.name, salary FROM role
JOIN department ON role.department_id = department.id;
-- view all employess
SELECT employee.id, first_name, last_name, role.title, role.salary, department.name  FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;

-- add a department
INSERT INTO department (name) VALUES ("test");
-- add a role

-- add an employee

-- update employee role

UPDATE employee SET role_id = ? WHERE id = ?