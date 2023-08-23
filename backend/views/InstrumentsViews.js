const InstrumentController = require("../controllers/InstrumentController");

const singleInstrumentsApi = (app) => {
  app.get("/singleInstruments", InstrumentController.getAllInstruments);
  app.post("/singleInstruments", InstrumentController.addInstrument);
  app.put("/singleInstruments/:id", InstrumentController.updateInstrument);
  app.delete("/singleInstruments/:id", InstrumentController.deleteInstrument);
};

module.exports = singleInstrumentsApi;

