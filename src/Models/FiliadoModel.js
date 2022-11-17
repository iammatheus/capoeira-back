const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FiliadoSchema = new Schema({
  id: ObjectId,
  nome: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: false,
  },
  userId: { 
    type: String,
    required: false,
  }
});

const FiliadoModel = mongoose.model("filiados", FiliadoSchema);
module.exports = FiliadoModel;
