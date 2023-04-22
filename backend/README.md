Database Name: spaces_db


Queries to create tables:

1. Student

CREATE TABLE student(roll INT NOT NULL,  name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, dept varchar(50), dues float NOT NULL, PRIMARY KEY ( roll ));

2. Faculty

CREATE TABLE faculty(    fid INT NOT NULL,    name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, dept varchar(50), dues float NOT NULL, PRIMARY KEY ( fid ));

3. Admin

CREATE TABLE admin(empid INT NOT NULL, name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, PRIMARY KEY ( empid ));

4. LHC

CREATE TABLE LHC(lec_hall varchar(50) NOT NULL,  capacity INT NOT NULL, projector bool NOT NULL, recording_camera bool NOT NULL, rate float NOT NULL, PRIMARY KEY ( lec_hall ));
 
5. Bookings

CREATE TABLE Bookings(lec_hall varchar(50) NOT NULL,  date DATE NOT NULL, start TIME NOT NULL, end TIME NOT NULL, email varchar(50) NOT NULL, user_type varchar(50) NOT NULL, lhc_or_lab varchar(50) NOT NULL, amount float NOT NULL, PRIMARY KEY ( lec_hall,date,start,end  ));

6. Labs

CREATE TABLE Labs(lab varchar(50) NOT NULL,  capacity INT NOT NULL, OS varchar(50) NOT NULL, rate float NOT NULL, PRIMARY KEY ( lab ));

Possible Queries:  

 1. "SELECT JSON_OBJECT('Lecture Hall', lec_hall, 'Capacity', capacity) FROM LH WHERE lec_hall NOT IN (SELECT lec_hall FROM BOOKINGS WHERE date = ? AND ((start>=?  AND start<? ) OR (?>=start AND end> ?) ) ) AND capacity>=? AND projector >= ? AND recording_camera >= ? ORDER BY capacity ", [date, from, to, from ,from, cap, proj, camera] 


2. booking
to book a particular lec hall/lab in a slot  
INSERT

3. cancel a booking  ---
to cancel a lec hall/lab by the user, faculty or admin
DELETE
 
4. to return bookings of a specific user (admin/ user profile)  
SELECT

5 all bookings on a date 

6. all bookings on a date and slot

7. all bookings in a slot in that week

8. all bookings of a lec hall/lab 

9. dues  (admin/ user profile)

10. email otp

11. priority ( when faculty overwrites student booking ) (notify through email only)
 
 
Potential Issues:

1. user type verification in signup (student/faculty) 




how to push

git add .

git commit -m "message"

git push origin branch_name