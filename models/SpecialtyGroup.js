const { Schema, model, SchemaTypes } = require("mongoose");

const SpecialityGroup = new Schema({
    name: { type: SchemaTypes.String, required: true, unique: true, },
    description: { type: SchemaTypes.String, required: false, default: ""  },
    speciality: { type: SchemaTypes.String, ref: "Speciality", required: false },
});

module.exports = model("SpecialityGroup", SpecialityGroup);