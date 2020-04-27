const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const home = require("./home");

const secretKey = "secret";

const User = require("./model/User");

const app = express();

const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/user",
    { useUnifiedTopology: true, useNewUrlParser: true  },
    function (err) {
    if (err) throw err;
});

//registration
app.post("/registration", (request, response) => {
    console.log(request.url);
    let user = request.body;

    let newUser = new User({
        email: user.email,
        password: user.password,
        surname: user.surname,
        name: user.name,
        age: user.age,
        gender: user.gender,
    });

    User.findOne({email: newUser.email}, function(user) {
        if (user === null){
            newUser.save(function (err, user) {
                if (err) {
                    response.send({success:false, message: err});
                    throw err;
                }

                response.send({success:true, message: 'Пользователь зарегестрирован', user: user});
            });
        }else {
            response.send({success:false, message: "Такой пользователь уже есть"});
        }
        console.log(user);
    });

});



app.post("/authorization", (request, response) => {
    console.log(request.url);

    console.log(request.body);

    let email = request.body.email;
    let password = request.body.password;

    User.findOne({email: email}, function(err, user) {
        if (err) {
            response.send({success:false, message: err});
            throw err;
        }

        if (user === null){
            response.send({success:false, message: 'Такого пользователя нет'});
        }else {
            if (user.password === password){
                let token = jwt.sign(JSON.stringify(user), secretKey);
                response.send({success:true, message: 'Пользователь найден!!!', user: user, token: token});
            }else {
                response.send({success:false, message: 'Пароль не верен'});
            }
        }
    });
});


app.post("/editUser", async (request, response) => {
    console.log(request.url);
    console.log(request.body)

    //let user = request.body;
    let user = {
        _id: request.body._id,
        email: request.body.email,
        password: request.body.password,
        surname: request.body.surname,
        name: request.body.name,
        age: request.body.age,
        gender: request.body.gender,
    };
    console.log("user",user)

    User.findOne({_id: user._id}, (err, u) => {

        u.email = user.email;
        u.password = user.password;
        u.surname = user.surname;
        u.name = user.name;
        u.age = user.age;
        u.gender = user.gender;

        u.save((err, user) => {
            if (err) {
                response.send({success:false, message: err});
                throw err;
            }
            response.send({success:true, message: 'пользователь обновлён', user: user});
        });
    });
});






app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`);
});


