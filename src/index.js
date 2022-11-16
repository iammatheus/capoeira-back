require("dotenv/config");
const app = require("./app");
const Loaders = require("./loaders/index");

Loaders.start();
app.listen(process.env.PORT, () => console.log("Server is running..."));
