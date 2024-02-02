let socket = io();
let oldRandomIndex = -1;


$(() => {
console.log("jQuery är redo!");

$("#generate").click(() => {
    getQuotes();
    console.log("clicked")
});

$("#send").click(() => {
    let quote = $("#send_quote").val();
    if("#send_quote" === "") return;
    else{
        $("#send_quote").val("");
    }
    postQuotes(quote);
})
getQuotes();
});

socket.on("quote", (quote) => {
    addQuotes(quote);
});

function addQuotes(quotes){
    $("#quote").html(quotes);
}

function getQuotes(){
    $.get("http://localhost:3000/quotes", (data) => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * data.length);
        } while (randomIndex === oldRandomIndex);
        
        let randomQuote = data[randomIndex];
        console.log("data",randomIndex, randomQuote.quote);
        addQuotes(randomQuote.quote);
        oldRandomIndex = randomIndex;
    });
}

//skickar meddelandet till servern
function postQuotes(quote){
    $.post("http://localhost:3000/quotes", {quote: quote});
}