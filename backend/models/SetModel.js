const { query } = require("../db");

const SetModel = {

    //I have added to parameters which are representing IDs of the instrument and set. it inserts a new recordinto the instruments_sets table
    async addInstrumentToSetById(instrumentId, setId) { 
      return query(
        "INSERT INTO instruments_sets (instrument_id, set_id) VALUES (?, ?)",
        [instrumentId, setId]
      );
    },

  //function to fetch the instruments that are associated with a particular set.
  async getInstrumentsInSet(setId) {
    return query(
      "SELECT instruments.* FROM instruments " +
      "INNER JOIN instruments_sets ON instruments.id = instruments_sets.instrument_id " +
      "WHERE instruments_sets.set_id = ?",
      [setId]
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
