const SetModel = require("../models/SetModel");

const SetController = {

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

  console.log("Current user:", currentUser); 
  if (currentUser.role !== "ADMIN") {

    return res.status(403).json({error: "Only Admin can add sets."});
  }
  console.log(currentUser.role);
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