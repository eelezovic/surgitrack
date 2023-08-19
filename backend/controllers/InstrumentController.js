const InstrumentModel = require("../models/InstrumentModel");

const InstrumentController = {

  getAllInstruments: async (req, res) => {
    try {
      const instruments = await InstrumentModel.getAllInstruments();
      res.json(instruments);
    } catch (error) {
      console.error("Error fetching instruments:", error);
      res.status(500).json({ error: "Error fetching instruments from the database" });
    }
  },

  addInstrument: async (req, res) => {
    const instrumentData = req.body;
    try {
      await InstrumentModel.addInstrument(instrumentData);
      res.json({ message: "New instrument added successfully" });
    } catch (error) {
      console.error("Error adding instrument:", error);
      res.status(500).json({ error: "Error adding instrument to the database" });
    }
  },

  updateInstrument: async (req, res) => {
    const instrumentId = req.params.id;
    const updatedData = req.body;
    try {
      await InstrumentModel.updateInstrument(instrumentId, updatedData);
      res.json({ message: "Instrument updated successfully" });
    } catch (error) {
      console.error("Error updating instrument:", error);
      res.status(500).json({ error: "Error updating instrument in the database" });
    }
  },

  deleteInstrument: async (req, res) => {
    const instrumentId = req.params.id;
    try {
      await InstrumentModel.deleteInstrument(instrumentId);
      res.json({ message: "Instrument deleted successfully" });
    } catch (error) {
      console.error("Error deleting instrument:", error);
      res.status(500).json({ error: "Error deleting instrument from the database" });
    }
  },
};

module.exports = InstrumentController;
