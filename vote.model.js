var { Schema, model, SchemaTypes } = require("mongoose");

var Vote = new Schema({
    name: SchemaTypes.String,
    voter: SchemaTypes.Decimal128
});



module.exports = model("Vote", Vote)