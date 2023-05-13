require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { connect, connection } = require("mongoose");
const methodOverride = require("method-override");
const logs = require("./models/logs");

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

// //Create Route
app.post("/logs", (req, res) => {
  if (req.body.shipIsBroken === "true") {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }
  logs.create(req.body);
  res.redirect("/logs");
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
