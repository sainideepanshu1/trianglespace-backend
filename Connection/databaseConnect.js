const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connection Successfull");
  } catch (error) {
    console.log(`Connection Failed ${error}`);
  }
};

module.exports = dbConnect;
