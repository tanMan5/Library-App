function getBooks() {
  const APIKey = "AIzaSyA6IRz2PfBZ2HyZlTjr0QD9_nZqZctgFKg";
  const searchedBook = $(".input").val();
  const queryURL =
    "https://www.googleapis.com/books/v1/volumes?q=intitle:" +
    searchedBook +
    "&key=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(response => {
    console.log(response);
    let title = "";
    let author = "";
    let image = "";
    let url = "";

    
    for (let i = 0; i < response.items.length; i++) {
      let newDiv = $("<div></div>")
      newDiv.addClass("eachBook");
      title = $('<p class = "title">' + response.items[i].volumeInfo.title + '</p>');
      image = $('<img class = "image"><br><a href' + response.items[i].volumeInfo.infoLink + '><button id = "imgButton" class = "btnWantRead"> Want to Read? </button></a>');
      author = $('<p class = "author">' + response.items[i].volumeInfo.authors + '</p>');
      url =  response.items[i].volumeInfo.imageLinks.thumbnail;

      image.attr('src',url);
      newDiv.append(title,author,image);
      newDiv.appendTo($(".bookList"));
    }
  });
}

// Book search button
$(".searchButton").on("click", function (e) {
  e.preventDefault();  
    getBooks();  
});

// Want to Read button event handler
$(document).on("click", ".btnWantRead" ,function (e) {
  e.preventDefault();  
  const selectedBook = e.target.parentNode.parentNode;
  const title = selectedBook.children[0].textContent
  console.log(title)
  const author = selectedBook.children[1].textContent
  console.log(author)
  const url = selectedBook.children[2].src;
  console.log(url)

var UserId = $(".member-id");
console.log(UserId)
// Constructing a book object to hand to the database
const newBook = {
  title: title,
  author: author,
  url: url,
  UserId: UserId.text()
};
console.log(newBook)
// submitBook(newBook);


// Submits a new book 
// function submitBook(book) {
// $.post("/api/members", book, function() {
//   // window.location.href = "/";
// });
// }
$.ajax("/api/members", {
  type: "POST",
  data: newBook
}).then(function() {
  console.log("new book created")
  location.reload();
})


});



