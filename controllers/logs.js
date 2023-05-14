const express = require("express");
const router = express.Router();
const Log = require("../models/log");

//Seed Route
router.get("/seed", async (req, res) => {
  try {
    await Log.create([
      {
        title: "New Frontier",
        Entry:
          "We've discovered an unexplored territory. After repairs are done, we'll set out to explore it",
        shipIsBroken: true,
      },
      {
        title: "Go Forth",
        Entry:
          "We have begun exploration on the new territory. We are gathering samples and running tests.",
        shipIsBroken: false,
      },
      {
        title: "Return",
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

//=======I.N.D.U.C.E.S. / 7 RESTFUL ROUTES ======

//Index Route
router.get("/", async (req, res) => {
  console.log("Index Controller Func. running...");
  try {
    const foundLog = await Log.find({});
    res.status(200).render("Index", { logs: foundLog });
  } catch (err) {
    res.status(400).send(err);
  }
});

//New Route
router.get("/new", (req, res) => {
  res.render("New");
});

router.delete("/:id", async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.status(200).redirect("/logs");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Update/Put
router.put("/:id", async (req, res) => {
  try {
    req.body.shipIsBroken = req.body.shipIsBroken === "true";
    const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(updatedLog);
    res.redirect(`/logs/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

// //Create Route
router.post("/", async (req, res) => {
  try {
    req.body.shipIsBroken = req.body.shipIsBroken === "true";
    const newLog = await Log.create(req.body);
    console.log(newLog);
    res.redirect("/logs");
  } catch (err) {
    res.status(400).send(err);
  }
});

// Edit Route
router.get("/:id/edit", async (req, res) => {
  try {
    const foundLog = await Log.findById(req.params.id);
    res.render("Edit", {
      log: foundLog,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Show Route
router.get("/:id", async (req, res) => {
  try {
    const foundLog = await Log.findById(req.params.id);
    res.render("Show", {
      log: foundLog,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
