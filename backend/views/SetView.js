const isAuthenticated = require("../isAuthenticated");
const SetController = require("../controllers/SetController");


const instrumentSetsApi = (app) => {
  app.get("/instrumentSets", isAuthenticated, SetController.getAllSets);
  app.post("/instrumentSets", isAuthenticated, SetController.addSet);
  app.put("/instrumentSets/:id", isAuthenticated, SetController.updateSet);
  app.delete("/instrumentSets/:id", isAuthenticated, SetController.deleteSet);
}

module.exports = instrumentSetsApi;