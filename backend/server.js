const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.json({ limit: '50mb' }));

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

//Api route handlers
const instrumentSetsApi = require("./views/SetView.js");
const singleInstrumentsApi = require("./views/InstrumentsViews.js");
const userRoutes = require("./views/users.js");

instrumentSetsApi(app);
singleInstrumentsApi(app);
userRoutes(app);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

/*const express = require("express");
const session = require("express-session");
const app = express();
const singleInstrumentsApi = require("./views/InstrumentsViews"); 
const userRoutes = require("./views/users"); // Import the object of route handlers

app.use(express.json());
user
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

singleInstrumentsApi(app);

// Set up user routes directly on the app instance
app.post("/register", userRoutes.register);
app.post("/login", userRoutes.login);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});


//Dependencies
/*const express = require("express");
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
app.get("/singleInstruments", (req, res) => {
  const query = "SELECT * FROM instruments";
  dbconnection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({error: "Error fetching data from the database"});
    } else {
      res.json(results);
    }
  });
});

// to insert a new instrument into the table
app.post("/singleInstruments", (req, res) => {
  const instrumentName = req.body.instrumentName;
  const instrumentId = req.body.instrumentId;
  const instrumentQuantity = req.body.instrumentQuantity;
  const instrumentLocation = req.body.instrumentLocation;

  const insertInstrumentSql = "INSERT INTO instruments (instrument_name, instrument_id, instrument_quantity, instrument_location) VALUES (?, ?, ?, ?)";
  const insertInstrumentValues = [instrumentName, instrumentId, instrumentQuantity, instrumentLocation];

  dbconnection.query(insertInstrumentSql, insertInstrumentValues, (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log the error object
      res.status(500).json({ error: "Error inserting new instrument into the database" });
    } else {
      res.json({ message: "New instrument inserted successfully" });
    }
  });
});

// to update an exisiting instrument table.
app.put("/singleInstruments/:id", (req, res) => {
  const primaryKeyId = req.params.id;
  const instrumentName = req.body.instrumentName;
  const instrumentId = req.body.instrumentId;
  const instrumentQuantity = req.body.instrumentQuantity;
  const instrumentLocation = req.body.instrumentLocation;

  const updateInstrumentSql = "UPDATE instruments SET instrument_name = ?, instrument_id = ?, instrument_quantity = ?, instrument_location = ? WHERE id = ?";
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
app.delete("/singleInstruments/:id", (req, res) => {
  const primaryKeyId = req.params.id;

  const deleteInstrumentSql = "DELETE FROM instruments WHERE id = ?";
  const deleteInstrumentValues = [parseInt(primaryKeyId, 10)];

  dbconnection.query(deleteInstrumentSql, deleteInstrumentValues, (err, results) => {
    if (err) {
      console.log (err)
      res.status(500).json({error: "Error from deleting instrument from the database"});
    } else {
      res.json({message: "You have successully deleted an instrument!"})
    }
  });
});


app.listen(8000, () => {
  console.log("Server started on port 8000");
});
*/
