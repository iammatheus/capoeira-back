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
routes.post("/usuarios", UsuarioController.store);
routes.get("/usuarios/:id", VerifyToken, UsuarioController.index);
routes.delete("/usuarios/:id", VerifyToken, UsuarioController.destroy);
routes.put("/usuarios/update/:id", VerifyToken, UsuarioController.update);

// filiados
routes.post("/filiados", FiliadoController.store);
routes.get("/filiados", FiliadoController.show);
routes.get("/filiados/:id", FiliadoController.index);
routes.put("/filiados/:id", FiliadoController.update);
routes.delete("/filiados/:id", FiliadoController.destroy);

// eventos
routes.post("/eventos", EventoController.store);
routes.get("/eventos", EventoController.show);
routes.get("/eventos/paginacao", EventoController.paginatedEvent);
routes.get("/eventos/:id", EventoController.index);
routes.put("/eventos/:id", EventoController.update);
routes.delete("/eventos/:id", EventoController.destroy);

// diretorias
routes.post("/diretorias", DiretoriaController.store);
routes.get("/diretorias", DiretoriaController.show);
routes.get("/diretorias/:id", DiretoriaController.index);
routes.put("/diretorias/:id", DiretoriaController.update);
routes.delete("/diretorias/:id", DiretoriaController.destroy);

module.exports = routes;
