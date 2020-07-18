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
      const newDiv = $("<div></div>");
      newDiv.addClass("eachBook");
      title = $(
        "<p class = 'title'>" + response.items[i].volumeInfo.title + "</p>"
      );
      image = $(
        "<img class = 'image'><br><a href" +
        response.items[i].volumeInfo.infoLink +
        "><button id = 'imgButton' class = 'btnWantRead btn btn-warning'> Want to Read? </button></a>"
      );
      author = $(
        "<p class = 'author'>" + response.items[i].volumeInfo.authors + "</p>"
      );
      url = response.items[i].volumeInfo.imageLinks.thumbnail;

      image.attr("src", url);
      newDiv.append(title, author, image);
      newDiv.appendTo($(".bookList"));
    }
  });
}

// Book search button
$(".searchButton").on("click", e => {
  e.preventDefault();
  getBooks();
});

getBookList();

// Want to Read button event handler
$(document).on("click", ".btnWantRead", e => {
  e.preventDefault();
  const selectedBook = e.target.parentNode.parentNode;
  const title = selectedBook.children[0].textContent;
  console.log(title);
  const author = selectedBook.children[1].textContent;
  console.log(author);
  const url = selectedBook.children[2].src;
  console.log(url);

  const UserId = $(".member-id");
  console.log(UserId);

  // Constructing a book object to hand to the database
  const newBook = {
    title: title,
    author: author,
    url: url,
    UserId: UserId.text(),
    read: false
  };
  console.log(newBook);

  $.ajax("/api/members", {
    type: "POST",
    data: newBook
  }).then(() => {
    console.log("new book created");
    location.reload();
  });

  getBookList()

});


// Function for creating a new book div
function createBookDiv(bookData) {
  let newDiv = $("<div></div>");
  newDiv.data("book", bookData);
  let titlePara = $("<p>" + bookData.title + "</p>")
  newDiv.append(titlePara);

  titlePara.addClass("title");


  let authorPara = $("<p>" + bookData.title + "</p>")
  newDiv.append(authorPara);

  authorPara.addClass("author");


  let image = $("<img src='" + bookData.url + "'/>" + "<br>" +
    "<button id = 'imgButton' class = 'btnFinished btn btn-warning'> Finished? </button></a>");

  // <button id = 'imgButton' class = 'btnWantRead btn btn-warning'> Want to Read? </button>

  //   // *****************************
  //   var urlToImage = require('url-to-image');
  // urlToImage(bookData.url, 'google.png').then(function() {
  //     // now google.png exists and contains screenshot of google.com
  // }).catch(function(err) {
  //     console.error(err);
  // });

  // *****************************


  newDiv.append(image);
  return newDiv;
}


$(function () {
  $(".btnFinished").on("click", function (event) {
    const id = $(this).data("id");
    const finishedBook = $(this).data("finishedBook");

    const newReadStatus = {
      read: finishedBook
    };

    $.ajax("/api/members" + id, {
      type: "PUT",
      data: newReadStatus
    }).then(
      function () {
        console.log("changed read to", finishedBook);
        location.reload();
      }
    );

  });
});

  // Function for retrieving books and getting them ready to be rendered to the page
  function getBookList() {
    $.get("/api/members", function (data) {
      var rowsToAdd = [];
      for (let i = 0; i < data.length; i++) {
        rowsToAdd.push(createBookDiv(data[i]));
      }
      renderBookList(rowsToAdd);

    });
  }

  // A function for rendering the list of books to the page
  function renderBookList(rows) {
    let bookList = $(".bookSelected")
    if (rows.length) {
      console.log(rows);
      bookList.append(rows);
    }

  }

