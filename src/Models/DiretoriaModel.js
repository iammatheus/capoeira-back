const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DiretoriaSchema = new Schema({
  id: ObjectId,
  nome: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  imagemUrl: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  }
});

const DiretoriaModel = mongoose.model("diretorias", DiretoriaSchema);
module.exports = DiretoriaModel;