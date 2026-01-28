const http = require("http");
require("dotenv").config();

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { mongoConnect } = require("./services/mongo");
const { loadLaunchData } = require("./models/launches.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  try {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT, console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
}

startServer();
// const express = require("express");

// const PORT = process.env.PORT || 8000;
// const app = express();

// app.listen(PORT, () => {
//   console.log(`Server is running on port  ${PORT}`);
// });
