const UserController = require("../controllers/UserController");
const currentUserHandler = require("../views/currentUser");


const userRoutes = (app) => {
  app.post("/register", UserController.register);
  app.post("/login", UserController.login);
  app.get("/currentUser", currentUserHandler);
};

module.exports = userRoutes;





