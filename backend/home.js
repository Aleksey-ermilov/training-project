const mongoose = require("mongoose");
const homeJson = require("./JsonOb");
const User = require("./model/User");
const Home = require("./model/Home");
const Room = require("./model/Room");

let arrHome = module.exports.arrHome = homeJson.map(h => ({
    name: h.homeName,
    id: h.id,
    rooms: h.rooms.map(a => ({id: a.id, roomName: a.roomName }))
    //rooms: h.rooms.map(a => JSON.stringify(({id: a.id, roomName: a.roomName })))
}));
//console.log(arrHome[0])



/*mongoose.connect("mongodb://localhost:27017/user",
    { useUnifiedTopology: true, useNewUrlParser: true  },
    function (err) {
        if (err) throw err;
        console.log("Всё ОК");

});*/



module.exports.createHome = function (user){
    for(let h of arrHome){
        let home = new Home({
            _id: new mongoose.Types.ObjectId(),
            id: h.id,
            name: h.name,
            rooms: []
        });

        for(let r of h.rooms){
            let room = new Room({
                _id: new mongoose.Types.ObjectId(),
                id: r.roomName,
                roomName: r.id
            });
            room.save();
            home.rooms.push(room._id)
        }

        home.save();
        user.home.push(home._id)
    }
};



module.exports.findHomeByIdUser = function (id) {
    User.findById(id).populate('home').exec((err,r) => {
        console.log(r)
    });
};





/*Home.findById("5ea1a2a0f746d67856653de5").populate('rooms').exec((err,r) => {
        console.log(r)
    });*/

/*User.findById("5ea1a90c5a4bdd03c558d065").populate('home').exec((err,r) => {
    console.log(r)
});*/

/*User.findById("5ea1a90c5a4bdd03c558d065").populate({path:'home', populate:{path: 'rooms'}}).exec((err,r) => {
    console.log(r)
});*/

