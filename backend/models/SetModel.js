const { query } = require("../db");

const SetModel = {

  //function to fetch the instruments that are associated with a particular set.
  async getInstrumentsInSet(setId) {
    return query(
      "SELECT instruments.* FROM instruments " +
        "INNER JOIN instruments_sets ON instruments.id = instruments_sets.instrument_id " +
        "WHERE instruments_sets.set_id = ?",
      [setId]
    );
  },

  //I have added to parameters which are representing IDs of the instrument and set. it inserts a new recordinto the instruments_sets table
  async addInstrumentToSetById(instrumentId, setId) {
    return query(
      "INSERT INTO instruments_sets (instrument_id, set_id) VALUES (?, ?)",
      [instrumentId, setId]
    );
  },

  // function to delete an instrument from the set while preserving the instrument itself in the instrument table
  async deleteInstrumentFromSetById(instrumentId, setId) {
    return query(
      "DELETE FROM instruments_sets WHERE instrument_id = ? AND set_id = ?", [instrumentId, setId]
    )
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
    const { setName, setId, setQuantity, setLocation } = updatedData;
    return query(
      "UPDATE sets SET set_name = ?, set_id = ?, set_quantity = ?, set_location = ? WHERE id = ?",
      [setName, setId, setQuantity, setLocation, setIdToUpdate]
    );
  },

  async deleteSet(setId) {
    return query("DELETE FROM sets WHERE id = ?", [setId]);
  },
};
module.exports = SetModel;
