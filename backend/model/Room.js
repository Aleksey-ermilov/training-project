const mongoose = require("mongoose");

let SchemaRoom = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    roomName: String
});
let Room = mongoose.model("Room", SchemaRoom);

module.exports = Room;
