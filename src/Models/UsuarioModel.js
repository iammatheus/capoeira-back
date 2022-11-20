const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsuarioSchema = new Schema({
  id: ObjectId,
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: false,
  }
});

const UsuarioModel = mongoose.model("usuarios", UsuarioSchema);
module.exports = UsuarioModel;