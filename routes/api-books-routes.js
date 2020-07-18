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
      UserId: req.body.UserId,
      read: req.body.read
    }).then(dbBook => {
      res.json(dbBook);
    });
  });


  app.get("/api/members", function(req, res) {
    db.Books.findAll({
      // include: [db.Post]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  app.put("/api/member/:id", function(req, res) {
    const condition = "id = " + req.params.id;
    books.updateOne({
      read: req.body.read
    }, condition, function(result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
        } else {
          res.status(200).end();
        }
    });
  });



};
