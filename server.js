var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;
let notes = [];
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/about.html"))
})

app.get("/api/notes", (req, res) => {
    res.json({ notes: notes });
})

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    notes.push(req.body)
    res.json({ notes: req.body })

})

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})

// SERVER LISTEN_________________________________________
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});