const UserController = require("../controllers/UserController");
const currentUserHandler = require("./currentUser.js");

const userRoutes = (app) => {
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  app.post("/api/logout", UserController.logout);
  app.get("/api/user", currentUserHandler);
};

module.exports = userRoutes;
