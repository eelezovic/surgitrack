//Dependencies
const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");

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
  const sentEmail = req.body.Email;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;

  // Checking if the user already exists in the database
  const checkUserSql = "SELECT * FROM users WHERE email = ? OR username = ?";
  const checkUserValues = [sentEmail, sentUserName];

  dbconnection.query(
    checkUserSql,
    checkUserValues,
    (checkErr, checkResults) => {
      if (checkErr) {
        res.send(checkErr);
      } else {
        if (checkResults.length > 0) {
          res.send({
            message: "User with this email or username already exists.",
          });
        } else {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.Password, salt);
          // If No existing user found, register
          const insertUserSql =
            "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
          const insertUserValues = [sentEmail, sentUserName, hash];

          dbconnection.query(
            insertUserSql,
            insertUserValues,
            (err, results) => {
              if (err) {
                res.send(err);
              } else {
                console.log("User entered successfully");
                res.send({ message: "User Added!" });
              }
            }
          );
        }
      }
    }
  );
});

app.post("/login", (req, res) => {
  const sentLoginUserName = req.body.LoginUserName;
  const sentLoginPassword = req.body.LoginPassword;

  const sql = "SELECT * FROM users WHERE username = ?";
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
/*app.get("/",(req,res) => {
  res.send("Welcome to Surgitrack")
});
*/
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
