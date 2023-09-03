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
    const currentUser = req.session.user; 
    
    try {
      await InstrumentModel.addInstrument(instrumentData,currentUser.id); //should i add currentUser here?
      res.json({ message: "New instrument added successfully" });
    } catch (error) {
      console.error("Error adding instrument:", error);
      res.status(500).json({ error: "Error adding instrument to the database" });
    }
  },

  updateInstrument: async (req, res) => {
    const instrumentId = req.params.id;
    const updatedData = req.body;
    const currentUser = req.session.user;
    
    try {
      await InstrumentModel.updateInstrument(instrumentId, updatedData, currentUser); //should i add currentUser here?
      res.json({ message: "Instrument updated successfully" });
    } catch (error) {
      console.error("Error updating instrument:", error);
      res.status(500).json({ error: "Error updating instrument in the database" });
    }
  },

  deleteInstrument: async (req, res) => {
    const instrumentId = req.params.id;
    const currentUser = req.session.user.id;

    try {
      //const instrument =  await InstrumentModel.getInstrumentById(instrumentId);
      //if(!instrument) { return res.status(404)}
      await InstrumentModel.deleteInstrument(instrumentId, currentUser);
      [instrumentId,currentUser]
      console.log(currentUser);
      res.json({ message: "Instrument deleted successfully" });
    } catch (error) {
      console.error("Error deleting instrument:", error);
      res.status(500).json({ error: "Error deleting instrument from the database" });
    }
  },
};

module.exports = InstrumentController;
