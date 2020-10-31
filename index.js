
const express = require('express');
const app = express();
app.use(express.json());
const {home , allBooks,specificBook,addbook,deletebook} = require("./router")

//home route
//this is the second branch
app.get("/",home);

//all books route
app.get("/allbooks",allBooks);

//specific book route
app.get("/book/:name",specificBook);

app.post("/addbook",addbook);

app.delete("/delete/:name",deletebook);


app.listen(9000,()=>{

    console.log("running...");

})

