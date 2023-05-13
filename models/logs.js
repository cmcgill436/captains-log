const { Schema, model } = require("mongoose");

const logSchema = new Schema(
  {
    title: { type: String },
    entry: { type: String },
    shipIsBroken: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// creating a new model, same thing as mongoose.model
const Log = model("Log", logSchema);

module.exports = Log;
