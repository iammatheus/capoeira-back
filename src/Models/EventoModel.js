const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EventoSchema = new Schema({
  id: ObjectId,
  titulo: {
    type: String,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
  dataEvento: {
    type: Date,
    required: true,
  },
  imagem: {
    type: String,
    required: false,
  },
  telefone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
});

const EventoModel = mongoose.model("eventos", EventoSchema);
module.exports = EventoModel;

