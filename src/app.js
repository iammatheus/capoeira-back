const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(routes);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

module.exports = app;
