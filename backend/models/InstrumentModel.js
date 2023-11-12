const { query } = require("../db");

const InstrumentModel = {
  async getAllInstruments() {
    return query("SELECT * FROM instruments");
  },

 async getInstrument(id) {
  return query("SELECT * FROM instruments WHERE id=?", [id]);
 },
 
//here I am adding image to the db
  async addInstrument(instrumentData) {
    const {
      instrumentName,
      instrumentId,
      instrumentQuantity,
      instrumentLocation,
      instrumentImage,
    } = instrumentData;

    return query(
      "INSERT INTO instruments (instrument_name, instrument_id, instrument_quantity, instrument_location, instrument_image) VALUES (?, ?, ?, ?, ?)",
      [instrumentName, instrumentId, instrumentQuantity, instrumentLocation, instrumentImage]
    );
  },

  async updateInstrument(instrumentIdToUpdate, updatedData) {
    const {
      instrumentName,
      instrumentId,
      instrumentQuantity,
      instrumentLocation,
      instrumentImage,
    } = updatedData;

    return query(
      "UPDATE instruments SET instrument_name = ?, instrument_id = ?, instrument_quantity = ?, instrument_location = ?, instrument_image = ? WHERE id = ?",
      [
        instrumentName,
        instrumentId,
        instrumentQuantity,
        instrumentLocation,
        instrumentImage,
        instrumentIdToUpdate,
      ]
    );
  },

  async deleteInstrument(instrumentId) {
    return query("DELETE FROM instruments WHERE id = ?", [instrumentId]);
  },
};

module.exports = InstrumentModel;

/*const dbconnection = require("../db"); 

const InstrumentModel = {
  getAllInstruments: async () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM instruments";
      dbconnection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  addInstrument: async (instrumentData) => {
    return new Promise((resolve, reject) => {
      const { instrumentName, instrumentId, instrumentQuantity, instrumentLocation } = instrumentData;
      const insertInstrumentSql = "INSERT INTO instruments (instrument_name, instrument_id, instrument_quantity, instrument_location) VALUES (?, ?, ?, ?)";
      const insertInstrumentValues = [instrumentName, instrumentId, instrumentQuantity, instrumentLocation];

      dbconnection.query(insertInstrumentSql, insertInstrumentValues, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  updateInstrument: async (instrumentIdToUpdate, updatedData) => {
    return new Promise((resolve, reject) => {
      const { instrumentName, instrumentId, instrumentQuantity, instrumentLocation } = updatedData;
      const updateInstrumentSql = "UPDATE instruments SET instrument_name = ?, instrument_id = ?, instrument_quantity = ?, instrument_location = ? WHERE id = ?";
      const updateInstrumentValues = [instrumentName, instrumentId, instrumentQuantity, instrumentLocation, instrumentIdToUpdate];

      dbconnection.query(updateInstrumentSql, updateInstrumentValues, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  deleteInstrument: async (instrumentId) => {
    return new Promise((resolve, reject) => {
      const deleteInstrumentSql = "DELETE FROM instruments WHERE id = ?";
      const deleteInstrumentValues = [instrumentId];

      dbconnection.query(deleteInstrumentSql, deleteInstrumentValues, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = InstrumentModel;
*/
