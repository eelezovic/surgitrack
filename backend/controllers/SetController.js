const SetModel = require("../models/SetModel");

const SetController = {

  getInstrumentsInSet: async(req, res) => {
    try {
      const setId = req.params.setId
      const instruments = await SetModel.getInstrumentsInSet(setId);
      res.json(instruments);
    } catch (error) {
      console.error("Error fetching instruments in the set:", error);
      res.status(500).json({error:" Error fetching instruments from the database"});
    }

  },

  addInstrumentToSetById: async (req, res) => {
    const { instrumentId, setId } = req.body; 
    const currentUser = req.session.user;
  
    if (currentUser.role !== "ADMIN") {
      return res.status(403).json({ error: "Only Admin can add instruments to sets." });
    }
  
    try {
      await SetModel.addInstrumentToSetById(instrumentId, setId);
      res.json({ message: "Instrument added to the set successfully" });
    } catch (error) {
      console.error("Error adding instrument to set:", error);
      res.status(500).json({ error: "Error adding instrument to the set in the database" });
    }
  },
  
  
  deleteInstrumentFromSetById: async(req, res) => {
    const setId = req.params.setId;
    const instrumentId = req.params.instrumentId;
    const currentUser = req.session.user;

    console.log(setId);
    console.log(instrumentId);



    if (currentUser.role !== "ADMIN") {
      return res.status(403).json({error: "Only Admin can delete instrument from the set."});
    }
    try {
      await SetModel.deleteInstrumentFromSetById(setId, instrumentId)
      res.json ({ message: " Instrument deleted from Set successfully"});
    } catch(error) {
      console.error("Error deleting instrument from set:", error);
      res.status(500).json({error: "Error deleting instrument from the set in the database"});
    }
  },

  getAllSets: async (req, res) => {
    try {
      const sets = await SetModel.getAllSets();
      res.json(sets);
  } catch (error) {
    console.error("Error fetching sets:", error);
    res.status(500).json({ error: "Error fetching sets from the database"});
  }
},

getSet: async (req, res) => {
  try {
    const {id} = req.params
    const sets = await SetModel.getSet(id);
    res.json(sets[0]);

  } catch (error) {
    console.error("Error fetching sets:", error);
    res.status(500).json({ error: "Error fetching sets from the database" });
  }
},

addSet: async (req, res) => {
  const setData =  req.body;
  const currentUser = req.session.user;

  if (currentUser.role !== "ADMIN") {
    return res.status(403).json({error: "Only Admin can add sets."});
  }

  try {
    await SetModel.addSet(setData, currentUser.id);
    res.json({ message: "New set added successfully"});
  } catch (error) {
    console.error("Error adding set:", error);
    res.status(500).json({ error: " Error adding set to the database"});
  }
}, 

updateSet: async (req, res) => {
  const setId = req.params.id;
  const updatedData = req.body;
  const currentUser = req.session.user;
 
  console.log("Received data in updateSet:", updatedData);
  console.log("setId:", setId);


  if (currentUser.role !== "ADMIN") {
    return res.status(403).json({error: "Only Admin can update sets."});
  }
  try {
    await SetModel.updateSet(setId, updatedData, currentUser.id);
    res.json({ message: "Set updated successfully"});
  } catch (error) {
    console.error("Error updating set:". error);
    res.status(500).json({error: " Error updating set in the database"});
  }
},

deleteSet: async (req, res) => {
  const setId = req.params.id;
  const currentUser = req.session.user;

  if (currentUser.role !== "ADMIN") {
    return res.status(403).json({error: "Only Admin can delete instruments."});
  }
  try {
    await SetModel.deleteSet(setId, currentUser.id);
    res.json ({ message: " Set deleted successfully"});
  } catch (error) {
    console.error("Error deleting set:", error);
    res.status(500).json( { error: "Error deleting set from the database"})
  }
},

};

module.exports = SetController; 