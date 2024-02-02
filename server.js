const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require("mongoose");
const { error } = require('console');
app.use(express.static("./website"));
app.use(bodyParser.urlencoded({ extended: false }));
 
const dbURL = "mongodb+srv://carlerikssonskogh:avqis164wCdzBeSA@cluster0.hwtkxjp.mongodb.net/?retryWrites=true&w=majority";

let Quotes = mongoose.model("Quotes", {
    quote: String
});

app.get("/quotes", (req, res) => {
    Quotes.find()
    .then(item =>{
        io.emit("quote", item);
        res.send(item);
    })
});

app.post("/quotes", (req, res) => {
    Quotes.findOne({ quote: req.body.quote })
    .then(existingQuote => {
        if (existingQuote) {
            console.log("finns redan")
        } else {
            let newQuote = new Quotes(req.body);
            newQuote.save()
        }
    });
});

io.on("connection", (socket) => {
console.log("en användare anslöt")
});

try {
    mongoose.connect(dbURL);
    console.log("Ansluten till databasen");
}
catch{ 
    console.log(error)
}

http.listen(3000, () => {
    console.log("Servern körs, besök http://localhost:3000");
});