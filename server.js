var express = require("express");
var path = require("path");
var fs = require("fs");
const db = require("./db.json");
const { v4: uuidv4 } = require('uuid');


var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// FRONT-END ROUTES_______________________________________
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})

// API ROUTES_____________________________________________
// GET ___________________________________________________
app.get("/api/notes", (req, res) => {
    res.json(db);
})


// POST ______________________________________________

app.post("/api/notes", (req, res) => {

    let noteId = uuidv4();
    let newNote = {
        id: noteId,
        title: req.body.title,
        text: req.body.text
    };

    fs.readFile("./db.json", "utf8", (err, data) => {
        if (err) throw err;

        const allNotes = JSON.parse(data);

        allNotes.push(newNote);

        fs.writeFile("./db.json", JSON.stringify(allNotes, null, 2), err => {
            if (err) throw err;
            res.send(db);
            console.log("Note created!")
        });
    });
});

// DELETE ______________________________________________

app.delete("/api/notes/:id", (req, res) => {

    let noteId = req.params.id;

    fs.readFile("./db.json", "utf8", (err, data) => {
        if (err) throw err;

        const allNotes = JSON.parse(data);
        const newAllNotes = allNotes.filter(note => note.id != noteId);

        fs.writeFile("./db.json", JSON.stringify(newAllNotes, null, 2), err => {
            if (err) throw err;
            res.send(db);
            console.log("Note deleted!")
        });
    });
});




// SERVER LISTEN_________________________________________
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});