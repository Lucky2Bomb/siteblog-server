const { Schema, model, SchemaTypes } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Comment = new Schema({
    text: { type: SchemaTypes.String, required: true },
    author: { type: SchemaTypes.String, required: true },
    dateCreated: { type: SchemaTypes.Date, required: true, default: Date.now },
    user: { type: SchemaTypes.String, ref: "User", required: true },
    post: { type: SchemaTypes.String, ref: "Post", required: true },
});

Comment.plugin(mongoosePaginate);

module.exports = model("Comment", Comment);