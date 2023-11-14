const { query } = require("../db");

const SetModel = {

  //function to fetch the instruments that are associated with a particular set.
  async getInstrumentsInSet(setId) {
    console.log(setId); 
    return query(
      "SELECT instruments.* FROM instruments " +
      "INNER JOIN instruments_sets ON instruments.id = instruments_sets.instrument_id " +
      "WHERE instruments_sets.set_id = ?",
      [setId]
    );
  },

  //funnction to add existing instrument to set
  async attachInstrumentToSet(setId, instrumentId) {
    const result = await query("INSERT INTO instruments_sets (set_id, instrument_id) VALUES (?, ?)", [setId, instrumentId]);
    return result.insertId;
  },
  

//funnction to add new instrument to set
  /*async attachNewInstrumentToSet(setId, newInstrumentData) {
    const { instrumentName, instrumentId, instrumentQuantity, instrumentLocation } = newInstrumentData;
    const result = await query(
      "INSERT INTO instruments (instrument_name, instrument_id, instrument_quantity, instrument_location) VALUES (?, ?, ?, ?)",
      [instrumentName, instrumentId, instrumentQuantity, instrumentLocation]
    );

    const newInstrumentId = result.insertId;
    console.log(newInstrumentId)

    await query("INSERT INTO instruments_sets (set_id, instrument_id) VALUES (?, ?)", [setId, newInstrumentId]);
  
    return newInstrumentId;
  },*/


  // function to delete an instrument from the set
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
    const { setName, setId, setQuantity, setLocation, setSpecialty, setImage } = setData;
    return query(
      "INSERT INTO sets (set_name, set_id, set_quantity, set_location, select_specialty, set_image) VALUES (?, ?, ?, ?, ?, ?)",
      [setName, setId, setQuantity, setLocation, setSpecialty, setImage]
    );
  },

  async updateSet(setIdToUpdate, updatedData) {
    const { setName, setId, setQuantity, setLocation, setSpecialty, setImage} = updatedData;
    return query(
      "UPDATE sets SET set_name = ?, set_id = ?, set_quantity = ?, set_location = ?, set_specialty = ?, set_image = ? WHERE id = ?",
      [setName, setId, setQuantity, setLocation, setSpecialty, setImage, setIdToUpdate]
    );
  },

  async deleteSet(setId) {
    return query("DELETE FROM sets WHERE id = ?", [setId]);
  },
};

module.exports = SetModel;
