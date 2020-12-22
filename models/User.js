const { Schema, model, SchemaTypes } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const User = new Schema({
    email: { type: SchemaTypes.String, required: true, unique: true, },
    password: { type: SchemaTypes.String, required: true },
    firstname: { type: SchemaTypes.String, required: false },
    lastname: { type: SchemaTypes.String, required: false },
    patronymic: { type: SchemaTypes.String, required: false },
    dateOfBirth: { type: SchemaTypes.Date, required: false },
    avatarUrl: { type: SchemaTypes.String },
    // posts: [{ type: ObjectId, ref: "Post" }]
    specialityGroup: { type: SchemaTypes.String, ref: "SpecialtyGroup" },
    roles: [{ type: SchemaTypes.String, ref: "Role" }],
    position: [{ type: SchemaTypes.String, ref: "UniversityPosition" }]
});

User.plugin(mongoosePaginate);

module.exports = model("User", User);