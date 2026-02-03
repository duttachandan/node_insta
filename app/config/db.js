const mongoose = require("mongoose");

const DBConnection = async () => {
  const conn = await mongoose.connect(`${process.env.MONGOD}`);
  if (!conn) {
    console.log("connection failed");
  } else {
    console.log("connection seccessfully");
  }
};

module.exports = DBConnection;
