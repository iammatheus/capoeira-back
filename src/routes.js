const { Router } = require("express");
const routes = Router();

const FiliadoController = require("./Controllers/FiliadoController");

routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server is on..." });
});

routes.post("/filiados", FiliadoController.store);
routes.get("/filiados", FiliadoController.show);
routes.get("/filiados/:id", FiliadoController.index);
routes.put("/filiados/:id", FiliadoController.update);
routes.delete("/filiados/:id", FiliadoController.destroy);

module.exports = routes;
