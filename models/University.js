const { Schema, model, SchemaTypes } = require("mongoose");

const University = new Schema({
    name: { type: SchemaTypes.String, required: true, unique: true, },
    description: { type: SchemaTypes.String, required: false, default: "" },
});

module.exports = model("University", University);