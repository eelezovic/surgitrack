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

  getInstrument: async (req, res) => {
    try {
      const {id} = req.params
      const instruments = await InstrumentModel.getInstrument(id);
      res.json(instruments[0]);
    } catch (error) {
      console.error("Error fetching instruments:", error);
      res.status(500).json({ error: "Error fetching instruments from the database" });
    }
  },

  addInstrument: async (req, res) => {
    const instrumentData = req.body;
    const currentUser = req.session.user; 

    // function to check if the current user is the Admin and not Viewer.
    if (currentUser.role !== "ADMIN") {
      return res.status(403).json({error: "Only Admin can add instruments."});
    }
    console.log(currentUser.role);
    try {
      await InstrumentModel.addInstrument(instrumentData,currentUser.id);
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

        // Also checking if the current user is the Admin and not Viewer.
        if (currentUser.role !== "ADMIN") {
          return res.status(403).json({error: "Only Admin can update instruments."});
        }

    try {
      await InstrumentModel.updateInstrument(instrumentId, updatedData, currentUser.id);
      res.json({ message: "Instrument updated successfully" });
    } catch (error) {
      console.error("Error updating instrument:", error);
      res.status(500).json({ error: "Error updating instrument in the database" });
    }
  },

  deleteInstrument: async (req, res) => {
    const instrumentId = req.params.id;
    const currentUser = req.session.user;

    console.log(`DELETE request received for instrument ID: ${instrumentId}`);

    // Only admin can delete instruments
    if (currentUser.role !== "ADMIN") {
      return res.status(403).json({error: "Only Admin can delete instruments."});
    }
    console.log(currentUser.role);
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


