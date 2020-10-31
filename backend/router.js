const fs = require("fs");
const fileName = "./books.json";




exports.home = (req , res)=>{
    res.status(200).send("welcome friend");
}

exports.allBooks = (req , res)=>{
    fs.readFile(fileName , (err , data)=>{
        if (err){
          return  res.status(404).send("error occured");
        }

       const books = JSON.parse(data);
        res.send(books);
    })
    
}

exports.specificBook = (req,res)=>{
    fs.readFile(fileName , (err , data)=>{
        if (err){
          return  res.status(404).send("error occured");
        }

        var books = JSON.parse(data);

        for (let i = 0; i < books.length; i++) {
            if (books[i].book.bookname.toString() == req.params.name.toString()){
                return res.status(200).send(books[i].book);
            }
        }
        return res.status(200).json({"bookname":""});
    });
   
}

exports.addbook = (req , res)=>{
    //get books from req
    var inputBook = req.body;
   
    //validate the input 
    if((inputBook.book.bookname !="" && inputBook.book.bookname != undefined) && 
    (inputBook.book.bookprice !="" && inputBook.book.bookprice != undefined)){
        
        //reading the file 
        fs.readFile(fileName,(err,data)=>{
            if (err) throw err;
            var books = JSON.parse(data);
            // check if the file exists 
            for (var i = 0; i < books.length; i++) {
                
                if(books[i].book.bookname.toString() === inputBook.book.bookname.toString()){
                    console.log("exists")
                    return res.send({"book":"already exists"});
                }
            }
            
            //will be executed if the file does not already exist
            books.push(inputBook)
            fs.writeFile(fileName,JSON.stringify(books),(err)=>{if (err) throw err;});
            console.log("added");
            return res.send({"book":"book added to DB"});
           
            
        });
    }
}


exports.deletebook = (req , res)=>{
    var bookToDel = req.params.name;

    fs.readFile(fileName,(err,data)=>{
        if (err) throw err;
        var books = JSON.parse(data);
        var book1 = [];
        // check if the file exists 
        for (var i = 0; i < books.length; i++) {
            
            if(books[i].book.bookname.toString() === bookToDel.toString()){
                delete books[i];

                for(var j = 0 ; j < books.length ; j++){
                    if (books[j] == null){
                        continue;
                    }
                    book1.push(books[j]);
                }
                fs.writeFile(fileName,JSON.stringify(book1),(err)=>{if (err) throw err;});
                return res.send({"book":"book deleted"});
            }
        }
        return res.send({"book":"book not found"});
    });



}



