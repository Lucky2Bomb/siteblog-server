const { Schema, model, SchemaTypes } = require("mongoose");

const User = new Schema({
    email: { type: SchemaTypes.String, required: true, unique: true, },
    password: { type: SchemaTypes.String, required: true },
    firstname: { type: SchemaTypes.String, required: false },
    lastname: { type: SchemaTypes.String, required: false },
    dateOfBirth: { type: SchemaTypes.Date, required: false },
    avatar: { type: SchemaTypes.String },
    // posts: [{ type: ObjectId, ref: "Post" }]
    roles: [{type: SchemaTypes.String, ref: "Role"}]
});

module.exports = model("User", User);