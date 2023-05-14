const express = require("express");
const router = express.Router();
const Log = require("../models/log");

//Seed Route
router.get("/seed", async (req, res) => {
  try {
    await Log.create([
      {
        Title: "New Frontier",
        Entry:
          "We've discovered an unexplored territory. After repairs are done, we'll set out to explore it",
        shipIsBroken: true,
      },
      {
        Title: "Go Forth",
        Entry:
          "We have begun exploration on the new territory. We are gathering samples and running tests.",
        shipIsBroken: false,
      },
      {
        Title: "Return",
        Entry:
          "We have have returned with the samples and test data. The ship is in need of repairs, but it'll give us time before out next trip",
        shipIsBroken: true,
      },
    ]);
    res.redirect("/logs");
  } catch (err) {
    res.status(400).send(err);
  }
});
