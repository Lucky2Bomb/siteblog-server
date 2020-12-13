const { Schema, model, SchemaTypes } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Post = new Schema({
    title: { type: SchemaTypes.String, required: true, },
    text: { type: SchemaTypes.String, required: false },
    dateCreated: { type: SchemaTypes.Date, required: true, default: Date.now },
    user: {type: SchemaTypes.String, ref: "User"},
    fileName: { type: SchemaTypes.String, required: false },
});

Post.plugin(mongoosePaginate);

module.exports = model("Post", Post);