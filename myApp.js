require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

console.log("Hello World")


const logger = (req, res, next) => {
    let Client_Ip = req.ip
    let path = req.path
    let method = req.method

    console.log(method + " " + path + " - " + Client_Ip);
    next()
}
app.use(logger);

app.get(
    "/now",
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.send({
            time: req.time
        });
    }
);

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

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word
    });
});

app.get("/name", (req, res) => {
    res.json({ name: req.query.first + " " + req.query.last })
    console.log(req.query)
})


app.post("/name", function (req, res) {
    // Handle the data in the request
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
});































module.exports = app;
