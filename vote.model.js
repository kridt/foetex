var { Schema, model, SchemaTypes } = require("mongoose");

var Vote = new Schema({
    vote: SchemaTypes.String,
    voter: SchemaTypes.Decimal128,
    message: SchemaTypes.String,
});



module.exports = model("Vote", Vote)