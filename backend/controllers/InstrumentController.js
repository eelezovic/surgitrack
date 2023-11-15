const InstrumentModel = require("../models/InstrumentModel");
const sharp = require("sharp");

const InstrumentController = {
  getAllInstruments: async (req, res) => {
    try {
      const instruments = await InstrumentModel.getAllInstruments();
      res.json(instruments);
    } catch (error) {
      console.error("Error fetching instruments:", error);
      res
        .status(500)
        .json({ error: "Error fetching instruments from the database" });
    }
  },

  getInstrument: async (req, res) => {
    try {
      const { id } = req.params;
      const instruments = await InstrumentModel.getInstrument(id);
      res.json(instruments[0]);
    } catch (error) {
      console.error("Error fetching instruments:", error);
      res
        .status(500)
        .json({ error: "Error fetching instruments from the database" });
    }
  },


  addInstrument: async (req, res) => {
    const instrumentData = req.body;
    const currentUser = req.session.user;

    if (currentUser.role !== "ADMIN") {
      return res.status(403).json({ error: "Only Admin can add instruments." });
    }
    try {
      const base64Image = instrumentData.instrumentImage.replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      const imageBuffer = Buffer.from(base64Image, "base64");

      // Using sharp library to compress the image
      const compressedImageBuffer = await sharp(imageBuffer)
        .resize({ width: 400 })
        .jpeg({ quality: 100 })
        .toBuffer();

      // here the original image data is replaced with the compressed one
      instrumentData.instrumentImage = compressedImageBuffer.toString("base64");

      await InstrumentModel.addInstrument(instrumentData);
      res.json({ message: "New instrument added successfully" });
    } catch (error) {
      console.error("Error adding instrument:", error);
      res
        .status(500)
        .json({ error: "Error adding instrument to the database" });
    }
  },

  updateInstrument: async (req, res) => {
    const instrumentId = req.params.id;
    const updatedData = req.body;
    const currentUser = req.session.user;


    if (currentUser.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Only Admin can update instruments." });
    }

    try {
      const base64Image = updatedData.instrumentImage.replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      const imageBuffer = Buffer.from(base64Image, "base64");

      // Using sharp library to compress the image
      const compressedImageBuffer = await sharp(imageBuffer)
        .resize({ width: 400 })
        .jpeg({ quality: 100 })
        .toBuffer();

      // here the original image data is replaced with the compressed one
      updatedData.instrumentImage = compressedImageBuffer.toString("base64");

      await InstrumentModel.updateInstrument(
        instrumentId,
        updatedData,
        currentUser.id
      );
      res.json({ message: "Instrument updated successfully" });
    } catch (error) {
      console.error("Error updating instrument:", error);
      res
        .status(500)
        .json({ error: "Error updating instrument in the database" });
    }
  },

  deleteInstrument: async (req, res) => {
    const instrumentId = req.params.id;
    const currentUser = req.session.user;

    console.log(`DELETE request received for instrument ID: ${instrumentId}`);

    // Only admin can delete instruments
    if (currentUser.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Only Admin can delete instruments." });
    }
    console.log(currentUser.role);
    try {
      await InstrumentModel.deleteInstrument(instrumentId);
      res.json({ message: "Instrument deleted successfully" });
    } catch (error) {
      console.error("Error deleting instrument:", error);
      res
        .status(500)
        .json({ error: "Error deleting instrument from the database" });
    }
  },
};

module.exports = InstrumentController;
