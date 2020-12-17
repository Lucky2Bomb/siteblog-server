const { Schema, model, SchemaTypes } = require("mongoose");

const UniversityPosition = new Schema({
    value: { type: SchemaTypes.String, unique: true, default: "студент", required: true },
    university: { type: SchemaTypes.String, ref: "University", required: true },
});

module.exports = model("UniversityPosition", UniversityPosition);