const DiretoriaModel = require("../Models/DiretoriaModel");

class DiretoriaController {
  async store(req, res) {
    try {
      const createdDiretoria = await DiretoriaModel.create(req.body);
      return res.status(200).json(createdDiretoria);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao cadastrar diretoria." });
    }
  }

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

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const diretoria = await DiretoriaModel.findByIdAndDelete(id);

      if (!diretoria)
        return res.status(404).json({ message: "Diretoria não existe." });

      return res.status(200).json({ message: "Deletado" });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao deletar diretoria." });
    }
  }

  async pagination(req, res) {
    try {
      const { term } = req.query || "";
      const currentPage = +req.query.skip || 1;
      let itemsPerPage = +req.query.limit || 3;

      if (term != null && term !== "") {
        const eventos = await DiretoriaModel.find({ $or: [{ tipo: term }, { nome: term }] });
        const totalItems = eventos.length;
        itemsPerPage = totalItems;
        const skipValue = (+req.query.skip - 1) * itemsPerPage;
        const totalPages = Number(Math.ceil(totalItems / itemsPerPage));

        const posts = await DiretoriaModel.find({ $or: [{ tipo: term }, { nome: term }] })
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
        const totalItems = await DiretoriaModel.countDocuments();
        itemsPerPage = Number(req.query.limit) || 5;
        const skipValue =
          (+req.query.skip ? +req.query.skip - 1 : 0) * itemsPerPage;
        const totalPages = Number(Math.ceil(totalItems / itemsPerPage));
        const posts = await DiretoriaModel.find()
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
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar diretorias." });
    }
  }
}

module.exports = new DiretoriaController();