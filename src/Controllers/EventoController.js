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

      return res.status(200).json({ message: "Deletado" });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao deletar evento." });
    }
  }

  // paginação
  async pagination(req, res) {
    try {
      const { term } = req.query || "";
      const currentPage = +req.query.skip || 1;
      let itemsPerPage = +req.query.limit || 3;

      if (term != null && term !== "") {
        const eventos = await EventoModel.find({ titulo: term });
        const totalItems = eventos.length;
        itemsPerPage = totalItems;
        const skipValue = (+req.query.skip - 1) * itemsPerPage;
        const totalPages = Number(Math.ceil(totalItems / itemsPerPage));

        const posts = await EventoModel.find({ titulo: term })
          .limit(itemsPerPage)
          .skip(skipValue);

        return res.status(200).json({
          data: posts,
          pagination: {
            totalItems,
            totalPages,
            currentPage,
            itemsPerPage,
          },
        });
      } else {
        const totalItems = await EventoModel.countDocuments();
        itemsPerPage = Number(req.query.limit) || 5;
        const skipValue =
          (+req.query.skip ? +req.query.skip - 1 : 0) * itemsPerPage;
        const totalPages = Number(Math.ceil(totalItems / itemsPerPage));
        const posts = await EventoModel.find()
          .limit(itemsPerPage)
          .skip(skipValue);

        return res.status(200).json({
          data: posts,
          pagination: {
            totalItems,
            totalPages,
            currentPage,
            itemsPerPage,
          },
        });
      }
    } catch (e) {
      res.status(500).json({ message: "Erro ao carregar eventos." });
    }
  }
}

module.exports = new EventoController();
