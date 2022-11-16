const FiliadoModel = require("../Models/FiliadoModel");

class FiliadoController {
  // criar
  async store(req, res) {
    try {
      const createdFiliado = await FiliadoModel.create(req.body);
      return res.status(200).json(createdFiliado);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao cadastrar filiado." });
    }
  }

  // obter por id
  async index(req, res) {
    try {
      const { id } = req.params;
      const filiado = await FiliadoModel.findById(id);

      if (!filiado)
        return res.status(404).json({ message: "Filiado não existe." });

      return res.status(200).json(filiado);
    } catch (error) {
      return res.status(404).json({ message: "ID inválido." });
    }
  }

  // obter todos
  async show(req, res) {
    try {
      const filiados = await FiliadoModel.find();
      return res.status(200).json(filiados);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao obter filiados." });
    }
  }

  // atualizar
  async update(req, res) {
    try {
      const { id } = req.params;
      const filiado = await FiliadoModel.findByIdAndUpdate(id, req.body);

      return res
        .status(200)
        .json({ message: "Filiado atualizado.", data: filiado });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao atualizar filiado." });
    }
  }

  // deletar
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const filiado = await FiliadoModel.findByIdAndDelete(id);

      if (!filiado)
        return res.status(404).json({ message: "Filiado não existe." });

      return res.status(200).json({ message: "Filiado deletado." });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao deletar filiado." });
    }
  }
}

module.exports = new FiliadoController();
