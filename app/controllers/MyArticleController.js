const Article = require("../models/Article");
const Likes = require("../models/Likes");
const MyArticle = {};

MyArticle.allArticle = (req, res) => {
  Article.find()
    .populate("comments")
    .then((article) => {
      let sort = article.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      console.log("sort", sort);
      res.json(sort);
    })
    .catch((err) => {
      res.json(err);
    });
};

MyArticle.create = (req, res) => {
  const body = req.body;

  const article = new Article(body);
  article.userId = req.user._id;
  // console.log("task",req.body)
  article
    .save()
    .then((article) => {
      res.json(article);
    })
    .catch((err) => {
      res.json(err);
    });
};
MyArticle.list = (req, res) => {
  const id = req.user._id;
  // console.log(req.user._id)
  Article.find({ userId: req.user._id })
    .then((article) => {
      console.log(article);
      res.json(article);
    })
    .catch((err) => {
      res.json(err);
    });
};
MyArticle.destory = (req, res) => {
  const id = req.params.id;
  Article.findByIdAndDelete({ _id: id })
    .then((article) => {
      res.json(article);
    })
    .catch((err) => {
      console.log(err);
    });
};

MyArticle.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Article.findByIdAndUpdate(
    { user: req.user._id, _id: id },
    { $set: body },
    { new: true, runValidators: true }
  )
    .then((article) => {
      res.json(article);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = MyArticle;
