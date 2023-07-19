//Dependencies
const express = require("express");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Kazahstan_1',
  database : 'instrument_set_schema'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


//Running the server.
app.get("/",(req,res) => {
  res.send("Welcome to Surgitrack")
});

app.listen(8000, () => { console.log("Server started on port 8000")})