const { Router } = require("express");
const routes = Router();

const VerifyToken = require('./middleware/usuario.middleware');
const HomeController = require("./Controllers/HomeController");
const UsuarioController = require("./Controllers/UsuarioController");
const FiliadoController = require("./Controllers/FiliadoController");
const EventoController = require("./Controllers/EventoController");
const DiretoriaController = require("./Controllers/DiretoriaController");

routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server is on..." });
});

// home
routes.get("/home/eventos", HomeController.showEventos);
routes.get("/home/diretorias", HomeController.showDiretorias);
routes.get("/home/filiados", HomeController.showFiliados);

// usuarios
routes.post("/login", UsuarioController.requestLogin);
routes.post("/usuarios", VerifyToken, UsuarioController.store);
routes.get("/usuarios/:id", VerifyToken, UsuarioController.index);
routes.delete("/usuarios/:id", VerifyToken, UsuarioController.destroy);
routes.put("/usuarios/update/:id", VerifyToken, UsuarioController.update);

// filiados
routes.post("/filiados", VerifyToken, FiliadoController.store);
routes.get("/filiados", VerifyToken, FiliadoController.pagination);
routes.get("/filiados/:id", VerifyToken, FiliadoController.index);
routes.put("/filiados/:id", VerifyToken, FiliadoController.update);
routes.delete("/filiados/:id", VerifyToken, FiliadoController.destroy);

// eventos
routes.post("/eventos", VerifyToken, EventoController.store);
routes.get("/eventos", VerifyToken, EventoController.pagination);
routes.get("/eventos/:id", VerifyToken, EventoController.index);
routes.put("/eventos/:id", VerifyToken, EventoController.update);
routes.delete("/eventos/:id", VerifyToken, EventoController.destroy);

// diretorias
routes.post("/diretorias", VerifyToken, DiretoriaController.store);
routes.get("/diretorias", VerifyToken, DiretoriaController.pagination);
routes.get("/diretorias/:id", VerifyToken, DiretoriaController.index);
routes.put("/diretorias/:id", VerifyToken, DiretoriaController.update);
routes.delete("/diretorias/:id", VerifyToken, DiretoriaController.destroy);

module.exports = routes;