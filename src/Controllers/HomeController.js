const EventoModel = require("../Models/EventoModel");
const DiretoriaModel = require("../Models/DiretoriaModel");
const FiliadoModel = require("../Models/FiliadoModel");

class HomeController {
  async showEventos(req, res) {
    try {
      const diretorias = await EventoModel.find();
      return res.status(200).json(diretorias);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao obter diretorias." });
    }
  }

  async showDiretorias(req, res) {
    try {
      const diretorias = await DiretoriaModel.find();
      return res.status(200).json(diretorias);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao obter diretorias." });
    }
  }

  async showFiliados(req, res) {
    try {
      const filiados = await FiliadoModel.find();
      return res.status(200).json(filiados);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao obter filiados." });
    }
  }

}

module.exports = new HomeController();
