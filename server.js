require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { connect, connection } = require("mongoose");
const methodOverride = require("method-override");

// Database connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.once("open", () => {
  console.log("connected to mongo");
});

// View Engine Middleware Configure
const reactViewsEngine = require("jsx-view-engine").createEngine();
app.engine("jsx", reactViewsEngine);
app.set("view engine", "jsx");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

//=======I.N.D.U.C.E.S. / 7 RESTFUL ROUTES ======

//Index Route
app.get("/logs", (req, res) => {
  res.render("Index");
});

//New Route
app.get("/logs/new", (req, res) => {
  res.render("New");
});

//Destroy
app.delete("/:id", async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.status(200).redirect("/logs");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Update
app.put("/:id", async (req, res) => {
  try {
    req.body.shipIsBroken = req.body.shipIsBroken === "on";
    const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(updatedLog);
    res.redirect(`/logs/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Create Route
app.post("/logs", async (req, res) => {
  try {
    req.body.shipIsBroken = req.body.shipIsBroken === "on";
    const newLog = await Log.create(req.body);
    console.log(newLog);
    res.redirect("/logs");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Edit
router.get("/:id/edit", async (req, res) => {
  try {
    const foundLog = await Log.findById(req.params.id);
    res.render("logs/Edit", {
      log: foundLog,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Show Route
app.get("/logs/:id", (req, res) => {
  res.render("Show");
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
