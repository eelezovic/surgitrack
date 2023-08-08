//Dependencies
const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const session = require("express-session");

app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      _expires: null,
      originalMaxAge: null,
      httpOnly: true,
      sameSite: true,
    },
  })
);

const dbconnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kazahstan_1",
  database: "surgitrack_schema",
});

dbconnection.connect();

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
          // If No existing user found, register
          const insertUserSql =
            "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
            const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.Password, salt);
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
  const values = [sentLoginUserName];
  dbconnection.query(sql, values, (err, results) => {
    if (err) {
      res.send({ error: err });
      return;
    }
    if (results.length > 0) {
      const isPasswordCorrect = bcrypt.compareSync(
        sentLoginPassword,
        results[0].password
      );
      if (!isPasswordCorrect) {
        res.status(400).json({ message: "Wrong Username or Password!" });
        return;
      }

      // Password is correct, store user data in the session
      req.session.userId = results[0].id;
      req.session.username = results[0].username;
      res.send(results);
    } else {
      res.status(400).json({ message: "Credentials Entered Don't Match!" });
    }
  });
});

//Single Instruments 
// to fetch all single instruments from the table
app.get("/api/single-instruments", (req, res) => {
  const query = "SELECT * FROM single_instruments_table";
  dbconnection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({error: "Error fetching data from the database"});
    } else {
      res.json(results);
    }
  });
});

// to isert a new instrument into the table
app.post("/api/single-instruments", (req, res) => {
  const instrumentName = req.body.instrument_name;
  const instrumentId = req.body.instrument_id;
  const instrumentQuantity = req.body.instrument_quantity;
  const instrumentLocation = req.body.instrument_location;

  const insertInstrumentSql = "INSERT INTO single_instruments_table (instrument_name, instrument_id, instrument_quantity, instrument_location) VALUES (?, ?, ?, ?)";
  const insertInstrumentValues = [instrumentName, instrumentId, instrumentQuantity, instrumentLocation];

  dbconnection.query(insertInstrumentSql, insertInstrumentValues, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error inserting new instrument into the database" });
    } else {
      res.json({ message: "New instrument inserted successfully" });
    }
  });
});

// to update an exisiting instrument table.
app.put("/api/single-instruments/:id", (req, res) => {
  const primaryKeyId = req.params.id;
  const instrumentName = req.body.instrument_name;
  const instrumentId = req.body.instrument_id;
  const instrumentQuantity = req.body.instrument_quantity;
  const instrumentLocation = req.body.instrument_location;

  const updateInstrumentSql = "UPDATE single_instruments_table SET instrument_name = ?, instrument_id = ?, instrument_quantity = ?, instrument_location = ? WHERE id = ?";
  const updateInstrumentValues = [instrumentName, instrumentId, instrumentQuantity, instrumentLocation, primaryKeyId];

  dbconnection.query(updateInstrumentSql, updateInstrumentValues, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error updating instrument in the database" });
    } else {
      res.json({ message: "Instrument updated successfully" });
    }
  });
});

// to delete an instrument from the database
app.delete("/api/single-instruments/:id", (req, res) => {
  const primaryKeyId = req.params.id;

  const deleteInstrumentSql = "DELETE FROM single_instruments_table WHERE id = ?";
  const deleteInstrumentValues = [primaryKeyId];

  dbconnection.query(deleteInstrumentSql, deleteInstrumentValues, (err, results) => {
    if (err) {
      res.status(500).json({error: "Error from deleting instrument from the database"});
    } else {
      res.json({message: "You have successully deleted an instrument!"})
    }
  });
});


app.listen(8000, () => {
  console.log("Server started on port 8000");
});



