const isAuthenticated = require("../isAuthenticated");
const SetController = require("../controllers/SetController");


const instrumentSetsApi = (app) => {
  app.get("/instrumentSets", isAuthenticated, SetController.getAllSets);
  app.get("/instrumentSets/:id", isAuthenticated, SetController.getSet);
  app.post("/instrumentSets", isAuthenticated, SetController.addSet);
  app.put("/instrumentSets/:id", isAuthenticated, SetController.updateSet);
  app.delete("/instrumentSets/:id", isAuthenticated, SetController.deleteSet);

  app.post("/instrumentSets/:setId/instruments", isAuthenticated, SetController.addInstrumentToSet);
  app.delete("/instrumentSets/:setId/instruments/:instrumentId", isAuthenticated, SetController.deleteInstrumentFromSet);

}

module.exports = instrumentSetsApi;