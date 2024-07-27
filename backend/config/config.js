const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sam9910333:sameer1234@cluster0.leekpdy.mongodb.net/keep-notes?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connectToDB,
};
