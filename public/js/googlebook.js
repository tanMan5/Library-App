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
      title = $(
        '<p class = "test">' + response.items[i].volumeInfo.title + "</p>"
      );
      image = $(
        '<img class = "test"><br><a href' +
          response.items[i].volumeInfo.infoLink +
          '><button id = "imgButton" class = "btnWantRead"> Want to Read? </button></a>'
      );
      author = $(
        '<p class = "test"> By: ' +
          response.items[i].volumeInfo.authors +
          "</p>"
      );
      url = response.items[i].volumeInfo.imageLinks.thumbnail;

      image.attr("src", url);

      title.appendTo(".bookList");
      author.appendTo(".bookList");
      image.appendTo(".bookList");
    }
  });
}

// Book search button
$(".searchButton").on("click", e => {
  e.preventDefault();
  getBooks();
});
