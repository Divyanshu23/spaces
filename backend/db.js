const dotenv = require("dotenv")
const mysql = require("mysql2/promise")

const result = dotenv.config({ path: __dirname + '/.env' })
if(result.error) {
    throw result.error
}

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
})

// function to check if a table exists in the database
async function tableExists(tableName) {
    const [rows, fields] = await pool.query(
        `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`,
        [process.env.MYSQL_DB, tableName]
    );
    return rows[0].count === 1;
}

// function to create a table
async function createTable(table_name) {
    try {
        if (table_name == "users") {
            await pool.execute(
                `CREATE TABLE users(userid INT NOT NULL, name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, dept varchar(50), dues float NOT NULL, user_type varchar(50) NOT NULL, PRIMARY KEY ( userid ));`
            );
        } else if (table_name == "admin") {
            await pool.execute(
                `CREATE TABLE admin( adminid INT NOT NULL, name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar (64) NOT NULL, PRIMARY KEY ( adminid ));`
            );
        } else if (table_name == "lhcs") {
            await pool.execute(
                `CREATE TABLE lhcs(lec_hall INT NOT NULL, capacity INT NOT NULL, projector bool NOT NULL, recording_camera bool NOT NULL, booking_rate float NOT NULL, PRIMARY KEY ( lec_hall ));`
            );
            await pool.execute(
                `
                INSERT INTO lhcs (lec_hall, capacity, projector, recording_camera, booking_rate) VALUES (1, 100, true, true, 300), (2, 150, true, false, 350), (3, 200, false, true, 400), (4, 250, true, false, 450), (5, 300, false, true, 500), (6, 350, false, false, 550), (7, 400, true, false, 600), (8, 450, false, false, 650), (9, 500, true, false, 700), (10, 550, true, true, 750), (11, 600, true, true, 800), (12, 650, false, true, 850), (13, 700, false, true, 900), (14, 750, false, false, 950), (15, 800, true, false, 1000), (16, 850, false, false, 1050), (17, 900, true, false, 1100), (18, 950, false, true, 1150), (19, 1100, true, true, 1300), (20, 1150, false, true, 1200);`
            );
        } else if (table_name == "labs") {
            await pool.execute(
                `CREATE TABLE labs(lab INT NOT NULL, capacity INT NOT NULL, OS varchar(50) NOT NULL, booking_rate float NOT NULL, PRIMARY KEY ( lab ));`
            );
            await pool.execute(
                `
                INSERT INTO labs (lab, capacity, OS, booking_rate) VALUES (1, 100, 'Windows', 300), (2, 150, 'Linux', 350), (3, 200, 'Windows', 400), (4, 250, 'Linux', 450), (5, 300, 'Windows', 500), (6, 350, 'Linux', 550), (7, 400, 'Windows', 600), (8, 450, 'Linux', 650), (9, 500, 'Windows', 700), (10, 550, 'Linux', 750);
`
            );
        } else if (table_name == "lhc_bookings") {
            await pool.execute(
                `CREATE TABLE lhc_bookings(lec_hall INT NOT NULL, userid INT NOT NULL, date DATE NOT NULL, start TIME NOT NULL, end TIME NOT NULL, amount float NOT NULL, PRIMARY KEY (lec_hall, date, start, end), FOREIGN KEY (lec_hall) REFERENCES lhcs(lec_hall), FOREIGN KEY (userid) REFERENCES users(userid));`
            );
        } else if (table_name == "lab_bookings") {
            await pool.execute(
                `CREATE TABLE lab_bookings(lab INT NOT NULL, userid INT NOT NULL, date DATE NOT NULL, start TIME NOT NULL, end TIME NOT NULL, amount float NOT NULL, PRIMARY KEY (lab, date, start, end), FOREIGN KEY (lab) REFERENCES labs(lab), FOREIGN KEY (userid) REFERENCES users(userid));`
            );
        }
    } catch (error) {
        console.log(error)
    }
}

// check if the required tables exist and create it if they dont
async function init() {
    try {
        let exists = await tableExists("users");
        if (!exists) {
            await createTable("users");
            console.log('Table created successfully.');
        }
        exists = await tableExists("admin");
        if (!exists) {
            await createTable("admin");
            console.log('Table created successfully.');
        }
        exists = await tableExists("lhcs");
        if (!exists) {
            await createTable("lhcs");
            console.log('Table created successfully.');
        }
        exists = await tableExists("labs");
        if (!exists) {
            await createTable("labs");
            console.log('Table created successfully.');
        }
        exists = await tableExists("lhc_bookings");
        if (!exists) {
            await createTable("lhc_bookings");
            console.log('Table created successfully.');
        }
        exists = await tableExists("lab_bookings");
        if (!exists) {
            await createTable("lab_bookings");
            console.log('Table created successfully.');
        }
    } catch (error) {
        console.error(error);
    }
}

// call the init function
init();

module.exports = pool