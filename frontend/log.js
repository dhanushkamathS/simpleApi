
async function dataPuller(){
    var data = await fetch("/allbooks");
    var json_data = await data.json();

   for (item in json_data){
       const book = document.createElement("pre");
       var bookname = json_data[item].book.bookname; 
       var bookprice = json_data[item].book.bookprice; 
       book.textContent = `bookname : ${bookname}   bookprice : ${bookprice}`;
       
       document.getElementById("main").append(book);
       console.log(json_data[item].book);  
   }
   
}

dataPuller();
