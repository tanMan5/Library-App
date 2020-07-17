const db = require("../models");

module.exports = function(app) {
  // Find all Books and return them to the user with res.json
  app.get("/", function(req, res) {
    db.Books.findAll({
      include:[db.User]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });


  app.post("/", function(req, res) {
    // Create an Book with the data available to us in req.body
    console.log(req.body);
    db.Books.create(req.body).then(function(dbBook) {
      res.json(dbBook);
    });
  });
}

