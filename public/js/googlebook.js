function getBooks() {
  const APIKey = "AIzaSyA6IRz2PfBZ2HyZlTjr0QD9_nZqZctgFKg";
  const searchedBook = $(".input").val();
  const queryURL =
    "https://www.googleapis.com/books/v1/volumes?q=intitle:" + searchedBook + "&key=" + APIKey;
    // "https://www.googleapis.com/books/v1/volumes?q=0262527359";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(response => {
    console.log(response);
  });
}

// Book search button
$(".searchButton").on("click", function (e) {
  e.preventDefault();
  getBooks();
})