const UserController = require("../controllers/UserController");

const userRoutes = (app) => {
  app.post("/register", UserController.register);
  app.post("/login", UserController.login);
};

module.exports = userRoutes;





