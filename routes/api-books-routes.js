const db = require("../models");

module.exports = function(app) {
  // Find all Books and return them to the user with res.json
  // app.get("/api/members", function(req, res) {
  //   db.Books.findAll({
  //     include:[db.User]
  //   }).then(function(dbBook) {
  //     res.json(dbBook);
  //     console.log(res.json(dbBook))
  //   });
  // });


  app.post("/api/members", (req, res) => {
    // Create an Book 
    console.log(req.body);
    db.Books.create({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      UserId: req.body.UserId
    })
      .then(function(dbBook) {
      res.json(dbBook);
    });
  });
}

