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

      return res.status(200).json({ message: "Deletado" });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao deletar filiado." });
    }
  }

  async pagination(req, res) {
    try {
      const { term } = req.query || "";
      const currentPage = +req.query.skip || 1;
      let itemsPerPage = +req.query.limit || 3;

      if (term != null && term !== "") {
        const eventos = await FiliadoModel.find({ nome: term });
        const totalItems = eventos.length;
        itemsPerPage = totalItems;
        const skipValue = (+req.query.skip - 1) * itemsPerPage;
        const totalPages = Number(Math.ceil(totalItems / itemsPerPage));

        const posts = await FiliadoModel.find({ nome: term })
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
        const totalItems = await FiliadoModel.countDocuments();
        itemsPerPage = Number(req.query.limit) || 5;
        const skipValue =
          (+req.query.skip ? +req.query.skip - 1 : 0) * itemsPerPage;
        const totalPages = Number(Math.ceil(totalItems / itemsPerPage));
        const posts = await FiliadoModel.find()
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
      res.status(500).json({ message: "Erro ao carregar filiados." });
    }
  }
}

module.exports = new FiliadoController();
