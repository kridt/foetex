var { Schema, model, SchemaTypes } = require("mongoose");

var Vote = new Schema({
    vote: SchemaTypes.String,
    voter: SchemaTypes.String,
    message: SchemaTypes.String,
    count: SchemaTypes.Decimal128,
});



module.exports = model("Vote", Vote)