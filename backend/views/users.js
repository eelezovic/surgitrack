const UserController = require("../controllers/UserController");
const currentUserHandler = require("./currentUser.js")


const userRoutes = (app) => {
  app.post("/register", UserController.register);
  app.post("/login", UserController.login);
  app.get("/user", currentUserHandler);
};

module.exports = userRoutes;





