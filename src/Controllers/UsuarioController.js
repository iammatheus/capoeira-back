const jwt = require('jsonwebtoken');
const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  // criar
  async store(req, res) {
    try {
      const createdUsuario = await UsuarioModel.create(req.body);
      return res.status(200).json(createdUsuario);
    } catch (error) {
      return res.status(404).json({ message: "Erro ao cadastrar usuário." });
    }
  }

  // obter por id
  async index(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findById(id);
      if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' });

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(404).json({ message: "ID inválido." });
    }
  }

  // atualizar
  async update(req, res) {
    try {
      const { id } = req.params;
      
      await UsuarioModel.findByIdAndUpdate(id, req.body);
      const { nome, email } = req.body;
      
      const token = jwt.sign(
      {
        userId: id,
        nome,
        email,
        },
        process.env.SECRET,
      );
      return res.status(200).json({ token, nome });
    } catch (error) {
        return res.status(404).json({ message: "Erro ao atualizar usuário."});
    }
  }

  // deletar
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findByIdAndDelete(id);

      if (!usuario)
        return res.status(404).json({ message: "Usuário não existe." });

      return res.status(200).json({ message: "Usuário deletado." });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao deletar usuário." });
    }
  }

  async requestLogin(req, res) {
    const { email, senha } = req.body;
    const usuario = await UsuarioModel.findOne({ email, senha })

    if (!usuario) return res.status(401).json({ message: 'Usuário não encontrado.' });

    const { _id, nome } = usuario;
    const token = jwt.sign(
      {
        userId: _id,
        nome,
        email,
      },
      process.env.SECRET,
    );
      return res.status(200).json({ token, nome, _id });
    }
}

module.exports = new UsuarioController();
