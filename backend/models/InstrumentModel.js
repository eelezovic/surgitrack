const dbconnection = require("../db"); 

const InstrumentModel = {
  getAllInstruments: async () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM single_instruments_table";
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
      const insertInstrumentSql = "INSERT INTO single_instruments_table (instrument_name, instrument_id, instrument_quantity, instrument_location) VALUES (?, ?, ?, ?)";
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
      const updateInstrumentSql = "UPDATE single_instruments_table SET instrument_name = ?, instrument_id = ?, instrument_quantity = ?, instrument_location = ? WHERE id = ?";
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
      const deleteInstrumentSql = "DELETE FROM single_instruments_table WHERE id = ?";
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

