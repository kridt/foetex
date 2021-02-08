var { Schema, model, SchemaTypes } = require("mongoose");

var Coworker = new Schema({
    name: SchemaTypes.String,
    sallingID: SchemaTypes.String,
    department: SchemaTypes.String
});



module.exports = model("Coworker", Coworker)