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
      author = $('<p class = "author"> By: ' + response.items[i].volumeInfo.authors + '</p>');
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
  const selectedBook = $(this).siblings(".title");
  console.log(selectedBook);
});



