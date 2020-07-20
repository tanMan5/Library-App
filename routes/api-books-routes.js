const { Op } = require("sequelize");

const db = require("../models");

module.exports = function(app) {
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

  app.get("/api/members", (req, res) => {
    db.Books.findAll({}).then(dbBook => {
      res.json(dbBook);
    });
  });

  app.put("/api/members", (req, res) => {
    db.Books.update(req.body, {
      where: {
        id: req.body.id
      }
    });
  });

  // 7-19-20
  app.get("/api/readbook", (req, res) => {
    db.Books.findAll({
      where: {
        read: {
          [Op.eq]: true
        }
      }
    }).then(dbBook => {
      res.json(dbBook);
    });
  });
};
