require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const Log = require("./models/log");
const { connect, connection } = require("mongoose");
const methodOverride = require("method-override");
// const logsController = require("./controllers/logsController");

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

//MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

// //Custom Middleware
// app.use((req, res, next) => {
//   console.log("Middleware running...");
//   next();
// });

// //Routes
// app.use("/", logsController);

//=======I.N.D.U.C.E.S. / 7 RESTFUL ROUTES ======

//Index Route
app.get("/", async (req, res) => {
  console.log("Index Controller Func. running...");
  try {
    const foundLog = await Log.find({});
    res.status(200).render("Index", { logs: foundLog });
  } catch (err) {
    res.status(400).send(err);
  }
});

//New Route
app.get("/logs/new", (req, res) => {
  res.render("New");
});

// //Create Route
app.post("/logs", async (req, res) => {
  try {
    req.body.shipIsBroken = req.body.shipIsBroken === "true";
    const newLog = await Log.create(req.body);
    console.log(newLog);
    res.redirect("/");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Show Route
app.get("/logs/:id", async (req, res) => {
  try {
    const foundLog = await Log.findById(req.params.id);
    res.render("Show", {
      log: foundLog,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
