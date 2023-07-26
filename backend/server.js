//Dependencies
const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.json());

const dbconnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kazahstan_1",
  database: "surgitrack_schema",
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

  const sql = "INSERT INTO users (email, username, password) VALUES (?,?,?)";
  const values = [sentEmail, sentUserName, sentPassword];

  dbconnection.query(sql, values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log("User entered successfully");
      res.send({ message: "User Added!" });
    }
  });
});

app.post("/login", (req, res) => {
  const sentLoginUserName = req.body.LoginUserName;
  const sentLoginPassword = req.body.LoginPassword;

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  const values = [sentLoginUserName, sentLoginPassword];
  dbconnection.query(sql, values, (err, results) => {
    if (err) {
      res.send({ error: err });
    }
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send({ message: "Credentials Entered Don't Match!" });
    }
  });
});
//Running the server.
app.get("/",(req,res) => {
  res.send("Welcome to Surgitrack")
});

/*app.listen(8000, () => {
  console.log("Server started on port 8000");
});
*/