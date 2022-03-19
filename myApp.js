require('dotenv').config()
var express = require('express');
var app = express();

console.log("Hello World")


const logger = (req, res, next) => {
    let Client_Ip = req.ip
    let path = req.path
    let method = req.method

    console.log(method + " " + path + " - " + Client_Ip);
    next()
}
app.use(logger);

// app.get("/", (req, res) => {
//     res.send("Hello Express");
// });

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

// app.get("/json", (req, res) => {
//     res.json({
//         message: "Hello json"
//     });
// });

app.get("/json", function (req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json(
            { "message": "HELLO JSON" }
        )
    } else {
        res.json(
            { "message": "Hello json" }
        )
    }
});





























module.exports = app;
