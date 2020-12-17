const { Schema, model, SchemaTypes } = require("mongoose");

const Speciality = new Schema({
    name: { type: SchemaTypes.String, required: true, unique: true, },
    description: { type: SchemaTypes.String, required: false, default: "" },
    faculty: { type: SchemaTypes.String, ref: "Faculty", required: true },
});

module.exports = model("Speciality", Speciality);