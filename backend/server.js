//Dependencies
const express = require("express");
const app = express();
const mysql = require("mysql");

const dbconnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Kazahstan_1',
  database : 'surgitrack_schema'
});
 
dbconnection.connect();
 
/*dbconnection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
}); */

app.post("/register", (req, res) => {
  const sentEmail = req.body.sentEmail;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;


const sql = "INSERT INTO User (email, username, password) VALUES (?,?,?)"
const values = [sentEmail,sentUserName,sentPassword];

dbconnection.query(sql, values, (err, results) => {
  if(err){
    res.send(err)
  } else{
    console.log("User entered successfully")
  }
})
})
//Running the server.
/*app.get("/",(req,res) => {
  res.send("Welcome to Surgitrack")
});
*/
app.listen(8000, () => { console.log("Server started on port 8000")})