const { query } = require("../db");

const SetModel = {

  async addInstrumentToSetById(instrumentId, setId) { 
  //I have added to parameters which are representing IDs of the instrument and set. it inserts a new recordinto the instruments_sets table
    return query(
      "INSERT INTO instruments_sets (instrument_id, set_id) VALUES (?, ?)",
      [instrumentId, setId]
    );
  },

  async getInstrumentById(instrumentId) {
    return query("SELECT * FROM instruments WHERE id = ?", [instrumentId]);
  },

  async getAllSets() {
    return query("SELECT * FROM sets");
  },

  async getSet(id) {
    return query("SELECT * FROM sets WHERE id=?", [id]);
   },

  async addSet(setData) {
    const { setName, setId, setQuantity, setLocation } = setData;
    return query(
      "INSERT INTO sets (set_name, set_id, set_quantity, set_location) VALUES (?, ?, ?, ?)",
      [setName, setId, setQuantity, setLocation]
    );
  },
  

  async updateSet(setIdToUpdate, updatedData) {
    const {
      setName,
      setId,
      setQuantity,
      setLocation,
    } = updatedData;
    return query(
      "UPDATE sets SET set_name = ?, set_id = ?, set_quantity = ?, set_location = ? WHERE id = ?",
      [
        setName,
        setId,
        setQuantity,
        setLocation,
        setIdToUpdate,
      ]
    );
  },
  
  async deleteSet(setId) {
    return query("DELETE FROM sets WHERE id = ?", [setId]);
  },
};
module.exports = SetModel;
