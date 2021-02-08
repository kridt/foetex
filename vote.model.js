var { Schema, model, SchemaTypes } = require("mongoose");

var Vote = new Schema({
    vote: SchemaTypes.String,
    voter: SchemaTypes.String,
    message: SchemaTypes.String,
});



module.exports = model("Vote", Vote)