const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(`${process.env.MONGOD}`);
}

main()
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((error) => {
    console.log(error);
  });

  
module.exports = main;
