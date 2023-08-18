const InstrumentController = require("../controllers/InstrumentController");

const singleInstrumentsApi = (app) => {
  app.get("/single-instruments", InstrumentController.getAllInstruments);
  app.post("/single-instruments", InstrumentController.addInstrument);
  app.put("/single-instruments/:id", InstrumentController.updateInstrument);
  app.delete("/single-instruments/:id", InstrumentController.deleteInstrument);
};

module.exports = singleInstrumentsApi;

