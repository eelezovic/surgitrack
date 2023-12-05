const mysql = require("mysql");

require('dotenv').config();

const dbconnection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "Kazahstan_1",
  database: process.env.MYSQL_DATABASE || "surgitrack_schema",
});


dbconnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

const query = async (query, params) => {
  return new Promise((resolve, reject) => {
    dbconnection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { query, dbconnection };


/*const mysql = require("mysql");


//const dbconnection = mysql.createConnection(process.env.MYSQL_URL || "mysql://root:Kazahstan_1@localhost:3306/surgitrack_schema");


const dbconnection = mysql.createConnection(process.env.MYSQL_URL || {
  host: "localhost",
  user: "root",
  password: "Kazahstan_1",
  database: "surgitrack_schema",
});

dbconnection.connect();

const query = async (query, params) => {
  return new Promise((resolve, reject) => {
    dbconnection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports= { query, dbconnection };*/




