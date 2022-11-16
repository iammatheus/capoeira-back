const DiretoriaModel = require("../Models/DiretoriaModel");

class DiretoriaController {
  // criar
  async store(req, res) {
    try {
      const createdDiretoria = await DiretoriaModel.create(req.body);
      return res.status(200).json(createdDiretoria);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao cadastrar diretoria." });
    }
  }

  // obter por id
  async index(req, res) {
    try {
      const { id } = req.params;
      const diretoria = await DiretoriaModel.findById(id);

      if (!diretoria)
        return res.status(404).json({ message: "Diretoria não existe." });

      return res.status(200).json(diretoria);
    } catch (error) {
      return res.status(404).json({ message: "ID inválido." });
    }
  }

  // obter todos
  async show(req, res) {
    try {
      const diretorias = await DiretoriaModel.find();
      return res.status(200).json(diretorias);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao obter diretorias." });
    }
  }

  // atualizar
  async update(req, res) {
    try {
      const { id } = req.params;
      const diretoria = await DiretoriaModel.findByIdAndUpdate(id, req.body);
      console.log(diretoria)

      if (!diretoria)
        return res.status(404).json({ message: "Diretoria não existe." });

      return res
        .status(200)
        .json({ message: "Diretoria atualizado.", data: diretoria });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao atualizar diretoria." });
    }
  }

  // deletar
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const diretoria = await DiretoriaModel.findByIdAndDelete(id);

      if (!diretoria)
        return res.status(404).json({ message: "Diretoria não existe." });

      return res.status(200).json({ message: "Diretoria deletado." });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao deletar diretoria." });
    }
  }
}

module.exports = new DiretoriaController();
