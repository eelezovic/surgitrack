const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const UserController = {
  //to register a user
  register: async (req, res) => {
    const { Email, UserName, Password } = req.body;

    try {
      const existingUser = await UserModel.getUserByEmail(Email);
      if (existingUser) {
        res.json({ message: "User with this email already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(Password, salt);

      const userData = {
        email: Email,
        username: UserName,
        password: hash,
        role: "VIEWER", // .. defaulttin role to "VIEWER"
      };

      await UserModel.createUser(userData);
      res.json({ message: "User Added!" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  },

  //login function
  login: async (req, res) => {
    const { LoginUserName, LoginPassword } = req.body;
    req.session.user = null;
    try { 
      const user = await UserModel.getUserByUsername(LoginUserName);

      console.log("User:", user, LoginUserName);
      if (!user) {
        res.status(400).json({ message: "Username not found." });
        return;
      }
      console.log("LoginPassword:", LoginPassword);
      console.log("User Password:", user.password);
      const isPasswordCorrect = bcrypt.compareSync(
        LoginPassword,
        user.password
      );

      console.log(isPasswordCorrect);
      if (!isPasswordCorrect) {
        res.status(400).json({ message: "Wrong Username or Password!" });
        return;
      }

      req.session.user = user;

      res.json({ message: "Login successful!", currentUser: user });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Error during login" });
    }
  },
  
  logout: (req, res) => {
    req.session.user = null;
    res.json({ message: "Logout successful" });
  },
};

module.exports = UserController;
