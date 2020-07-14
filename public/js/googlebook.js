
function getBooks() {
 
  const APIKey = "AIzaSyA6IRz2PfBZ2HyZlTjr0QD9_nZqZctgFKg";

  const queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + "&key=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    
    console.log(response);
  });
}