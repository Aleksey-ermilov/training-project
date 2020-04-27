const mongoose = require("mongoose");

const SchemaHome = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    id: String,
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }]
});
let Home = mongoose.model("Home", SchemaHome);

module.exports = Home;

