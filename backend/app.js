const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const user = require("./routes/user");
const config = require("./config/config");


const app = express();

const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
    config.db,
    { useUnifiedTopology: true, useNewUrlParser: true  },
    (err) => {
        if (err) throw err;
        console.log("БД подключена")
});

app.use("/user", user);

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`);
});


