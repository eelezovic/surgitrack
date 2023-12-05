const InstrumentController = require("../controllers/InstrumentController");
const isAuthenticated = require("../isAuthenticated");

const singleInstrumentsApi = (app) => {
  app.get("/api/singleInstruments", isAuthenticated, InstrumentController.getAllInstruments); 
  app.get("/api/singleInstruments/:id", isAuthenticated, InstrumentController.getInstrument); 
  app.post("/api/singleInstruments", isAuthenticated, InstrumentController.addInstrument); 
  app.put("/api/singleInstruments/:id", isAuthenticated, InstrumentController.updateInstrument);
  app.delete("/api/singleInstruments/:id", isAuthenticated, InstrumentController.deleteInstrument);
};

module.exports = singleInstrumentsApi;

