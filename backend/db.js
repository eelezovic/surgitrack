const mysql = require("mysql");

const dbconnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kazahstan_1",
  database: "surgitrack_schema",
});

dbconnection.connect();

module.exports=dbconnection;

