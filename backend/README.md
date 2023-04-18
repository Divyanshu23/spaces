Queries:

CREATE TABLE student(roll INT NOT NULL,  name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, dept varchar(50), PRIMARY KEY ( roll ));

CREATE TABLE faculty(    fid INT NOT NULL,    name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, dept varchar(50), PRIMARY KEY ( fid ));

CREATE TABLE admin(empid INT NOT NULL, name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, PRIMARY KEY ( empid ));