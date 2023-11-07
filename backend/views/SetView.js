const isAuthenticated = require("../isAuthenticated");
const SetController = require("../controllers/SetController");

const instrumentSetsApi = (app) => {
  app.get("/instrumentSets", isAuthenticated, SetController.getAllSets);
  app.get("/instrumentSets/:id", isAuthenticated, SetController.getSet);
  app.post("/instrumentSets", isAuthenticated, SetController.addSet);
  app.put("/instrumentSets/:id", isAuthenticated, SetController.updateSet);
  app.delete("/instrumentSets/:id", isAuthenticated, SetController.deleteSet);

  //  added a new route for fetching and displaying instruments in a set and deleting an instrument from the set
  app.get("/instrumentSets/:setId/instruments", isAuthenticated, SetController.getInstrumentsInSet);
  app.post("/instrumentSets/:setId/addNewInstrument", isAuthenticated, SetController.addNewInstrumentToSet);
  app.delete("/instrumentSets/:setId/deleteInstrument/:instrumentId",isAuthenticated,SetController.deleteInstrumentFromSetById);
};

module.exports = instrumentSetsApi;
