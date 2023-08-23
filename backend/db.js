const mysql = require("mysql");

const dbconnection = mysql.createConnection({
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

module.exports= { query, dbconnection };

