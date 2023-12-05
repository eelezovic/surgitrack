const isAuthenticated = require("../isAuthenticated");
const SetController = require("../controllers/SetController");

const instrumentSetsApi = (app) => {
  app.get("/api/instrumentSets", isAuthenticated, SetController.getAllSets);
  app.get("/api/instrumentSets/:id", isAuthenticated, SetController.getSet);
  app.post("/api/instrumentSets", isAuthenticated, SetController.addSet);
  app.put("/api/instrumentSets/:id", isAuthenticated, SetController.updateSet);
  app.delete(
    "/api/instrumentSets/:id",
    isAuthenticated,
    SetController.deleteSet
  );

  //  added a new route for fetching and displaying instruments in a set and deleting an instrument from the set
  app.get(
    "/api/instrumentSets/:setId/instruments",
    isAuthenticated,
    SetController.getInstrumentsInSet
  );
  app.post(
    "/api/instrumentSets/:setId/attachExistingInstrument",
    isAuthenticated,
    SetController.attachInstrumentToSet
  );
  app.delete(
    "/api/instrumentSets/:setId/deleteInstrument/:instrumentId",
    isAuthenticated,
    SetController.deleteInstrumentFromSetById
  );
};

module.exports = instrumentSetsApi;
