const mongoose = require("mongoose");

async function startDB() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Conectado ao banco");
    })
    .catch((err) => {
      console.log("Erro conexão banco: " + err);
    });
}

module.exports = startDB;
