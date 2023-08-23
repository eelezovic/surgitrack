const {query, dbconnection } = require("../db");

const UserModel = {
  async getUserByEmail(email) {
    return query("SELECT * FROM users WHERE email = ?", [email]);
  },

  async createUser({email, username, password}) {
    return query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, password]);
  },

  async  getUserByUsername(username) {
    return query("SELECT * FROM users WHERE username = ?", [username])
  }
};

module.exports = UserModel;



/*const dbconnection = require("../db"); 

const UserModel = {
  getUserByEmail: async (email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      dbconnection.query(query, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]); 
        }
      });
    });
  },

  createUser: async (userData) => {
    return new Promise((resolve, reject) => {
      const { email, username, password } = userData;
      const insertUserSql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
      dbconnection.query(insertUserSql, [email, username, password], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getUserByUsername: async (username) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE username = ?";
      //console.log("Executing query:", query);
      dbconnection.query(query, [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          //console.log("Query results:", results); 
          resolve(results[0]);
        }
      });
    });
  },

  
};

module.exports = UserModel;
*/