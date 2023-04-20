Queries:

CREATE TABLE student(roll INT NOT NULL,  name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, dept varchar(50), PRIMARY KEY ( roll ));

CREATE TABLE faculty(    fid INT NOT NULL,    name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, dept varchar(50), PRIMARY KEY ( fid ));

CREATE TABLE admin(empid INT NOT NULL, name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, PRIMARY KEY ( empid ));

CREATE TABLE LHC(lec_hall varchar(50) NOT NULL,  capacity INT NOT NULL, projector bool NOT NULL, recording_camera bool NOT NULL, rate float NOT NULL, PRIMARY KEY ( lec_hall ));
 
CREATE TABLE Bookings(lec_hall varchar(50) NOT NULL,  date DATE NOT NULL, start TIME NOT NULL, end TIME NOT NULL, email varchar(50) NOT NULL, PRIMARY KEY ( lec_hall,date,start,end ));