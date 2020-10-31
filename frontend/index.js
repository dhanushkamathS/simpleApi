var findBook = document.getElementById("findBookbuton");
var addBook  = document.getElementById("addBookbuton");  
var deleteBook  = document.getElementById("deleteBookbuton");

findBook.addEventListener("click" ,async event =>{
    var bookName = document.getElementById("findBook").value;
    document.getElementById("findBook").value = null;
    var books = await fetch(`book/${bookName}`);
    var book_value = await books.json();
    if((book_value.bookname !="" && book_value.bookname != undefined) && 
    (book_value.bookprice !="" && book_value.bookprice != undefined)){
       
       var divBookName = `bookname : ${book_value.bookname}`;
       var divBookPrice = `bookprice : ${book_value.bookprice}`;
        document.getElementById("findbookname").textContent = divBookName;
        document.getElementById("findbookprice").textContent = divBookPrice;
        document.getElementById("bookNotFound").style.visibility = "hidden";
        document.getElementById("bookFound").style.visibility = "visible";
        console.log("found")

    }
    else{
        console.log("not found");
        document.getElementById("bookFound").style.visibility = "hidden";
        document.getElementById("bookNotFound").style.visibility = "visible";
    }
});


addBook.addEventListener("click" , async event =>{
    var booknameToAdd = document.getElementById("addBookName").value;
    var bookPriceToAdd = document.getElementById("addBookPrice").value;
     document.getElementById("addBookName").value = null;
    document.getElementById("addBookPrice").value = null;
    var data = {"book":{"bookname":booknameToAdd , "bookprice":bookPriceToAdd}};
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const response = await fetch('/addbook', options);
      const jsonresp = await response.json();
      document.getElementById("isBookAdded").textContent = jsonresp.book;
      document.getElementById("isBookAdded").style.visibility = "visible";
      console.log(jsonresp.book);
});


deleteBook.addEventListener("click" , async event =>{
            var booknameToDelete = document.getElementById("deleteBookName").value;
            document.getElementById("deleteBookName").value =null;
            const options = {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              };
              const response = await fetch(`/delete/${booknameToDelete}`, options);
              const json = await response.json();
              document.getElementById("isBookdeleted").textContent = json.book;
              document.getElementById("isBookdeleted").style.visibility = "visible";
              console.log(json)
});
