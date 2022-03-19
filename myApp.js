require('dotenv').config()
var express = require('express');
var app = express();

console.log("Hello World")

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
    let message = 'Hello json'
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        return res.status(200).json({ "message": message.toUpperCase() })
    }
    return res.status(200).json({ "message": message })
})































module.exports = app;
