INSERT INTO department (name) VALUES ("Engineering");

INSERT INTO department (name) VALUES ("Legal Services");

INSERT INTO department (name) VALUES ("Sales");

INSERT INTO department (name) VALUES ("Human Resources");

INSERT INTO department (name) VALUES ("Executives");

INSERT INTO role (title, salary, department_id) VALUES ("Lead Software Engineer","165000","1");

INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer","82000","1");

INSERT INTO role (title, salary, department_id) VALUES ("Head Technical Engineer","150000","1");

INSERT INTO role (title, salary, department_id) VALUES ("Technical Engineer","76000","1");

INSERT INTO role (title, salary, department_id) VALUES ("Senior Legal Partner","225000","2");

INSERT INTO role (title, salary, department_id) VALUES ("Junior Legal Associate","145000","2");

INSERT INTO role (title, salary, department_id) VALUES ("Paralegal","95000","2");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Manager","140000","3");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Associate","120000","3");

INSERT INTO role (title, salary, department_id) VALUES ("HR Rep","65000","4");

INSERT INTO role (title, salary, department_id) VALUES ("HR Manager","95000","4");

INSERT INTO role (title, salary, department_id) VALUES ("CEO", "350000", "5");

INSERT INTO role (title, salary, department_id) VALUES ("CFO", "330000", "5");

INSERT INTO role (title, salary, department_id) VALUES ("COO", "250000", "5");

INSERT INTO Employee (first_name, last_name, role_id) VALUES ("Ben","Solo","1");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Poe","Dameron","2","1");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Shmi","Skywalker","3","1");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Slim","Aloo","4","1");

INSERT INTO Employee (first_name, last_name, role_id) VALUES ("Lando","Calrissian","5");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Kendal","Ozzel","6","5");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Rampart","Up","7","5");

INSERT INTO Employee (first_name, last_name, role_id) VALUES ("Anakin","Skywalker","8");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Qui-Gon","Jinn","9","8");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Padme","Amidala","9","8");

INSERT INTO Employee (first_name, last_name, role_id) VALUES ("Darth","Maul","10");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Chancellor","Palpatine","11","11");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Boba","Fett","11","11");

INSERT INTO Employee (first_name, last_name, role_id) VALUES ("Obi-Wan","Kenobi","12");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Luke","Skywalker","13","14");

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Princess","Leia","14","14");
