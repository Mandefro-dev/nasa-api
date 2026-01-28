const express = require("express");
const { httpGetAllPlanets } = require("./planets.controller");

const plantesRouter = express.Router();

plantesRouter.get("/", httpGetAllPlanets);

module.exports = plantesRouter;
