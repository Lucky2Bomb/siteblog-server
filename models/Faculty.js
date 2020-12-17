const { Schema, model, SchemaTypes } = require("mongoose");

const Faculty = new Schema({
    name: { type: SchemaTypes.String, required: true, unique: true, },
    description: { type: SchemaTypes.String, required: false, default: ""  },
    university: { type: SchemaTypes.String, ref: "University", required: true },
});

module.exports = model("Faculty", Faculty);