const EventoModel = require("../Models/EventoModel");

class EventoController {
  // criar
  async store(req, res) {
    try {
      const createdEvento = await EventoModel.create(req.body);
      return res.status(200).json(createdEvento);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao cadastrar evento." });
    }
  }

  // obter por id
  async index(req, res) {
    try {
      const { id } = req.params;
      const evento = await EventoModel.findById(id);

      if (!evento)
        return res.status(404).json({ message: "Evento não existe." });

      return res.status(200).json(evento);
    } catch (error) {
      return res.status(404).json({ message: "ID inválido." });
    }
  }

  // obter todos
  async show(req, res) {
    try {
      const eventos = await EventoModel.find();
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao obter eventos." });
    }
  }

  // atualizar
  async update(req, res) {
    try {
      const { id } = req.params;
      const evento = await EventoModel.findByIdAndUpdate(id, req.body);

      if (!evento)
        return res.status(404).json({ message: "Evento não existe." });

      return res
        .status(200)
        .json({ message: "Evento atualizado.", data: evento });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao atualizar evento." });
    }
  }

  // deletar
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const evento = await EventoModel.findByIdAndDelete(id);

      if (!evento)
        return res.status(404).json({ message: "Evento não existe." });

      return res.status(200).json({ message: "Evento deletado." });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao deletar evento." });
    }
  }
}

module.exports = new EventoController();
