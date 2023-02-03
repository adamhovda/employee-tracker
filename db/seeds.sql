INSERT INTO department(name)
VALUES ("Sales"),
       ("HR"),
       ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 80000, 1),
        ("Rep", 60000, 3),
        ("Analyst", 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE   ("John", "Smith", 1, 1),
        ("Bill", "Johnson", 2, 2),
        ("Fred", "Jones", 3, 3),
        ("Sarah", "Lewis", 3, 3);



