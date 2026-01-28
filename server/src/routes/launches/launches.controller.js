const {
  getAllLaunches,

  existsWithLaunchId,
  abortLaunchById,
  scheduleNewLaunch,
} = require("../../models/launches.model");
const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);

  const launches = await getAllLaunches(skip, limit);

  return res.status(200).json(launches);
}
async function httpAddNewLaunch(req, res) {
  let launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({
      error: "missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  //if launch data is correct date formt isNan(date) would be false.

  //but if it valid date,,, isNan do this, it converts the date to a number, using this  date.valuesOf()
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch Date",
    });
  }

  await scheduleNewLaunch(launch);
  console.log(launch);
  return res.status(201).json(launch);
}
async function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;
  const existsLaunch = await existsWithLaunchId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId);

  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
