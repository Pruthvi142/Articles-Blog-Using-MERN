const Article = require("../models/Article");
const Likes = require("../models/Likes");
const MyArticleLike = {};

MyArticleLike.create = async (req, res) => {
  console.log("user", req.user);
  const id = req.params.id;
  let art = await Article.findById({ _id: id });
  const userId = req.user._id;
  const likes = new Likes({
    userId: userId,
    articleId: art._id,
  });
  await likes
    .save()
    .then((like) => {
      //  res.json(like)
    })
    .catch((err) => {
      res.json(err);
    });

  console.log("like", art);
  art.likes.push(likes.userId);
  await art.save().then((arti) => {
    res.json(arti);
  });
};

MyArticleLike.destory = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  Article.findById({ _id: id }).then((art) => {
    // console.log(art)
    art.likes.pull(userId);

    art.save().then((art) => {
      res.json(art);
    });
  });
  Likes.findOne({ articleId: id }).then((like) => {
    console.log("like", like);
    Likes.findByIdAndDelete({ _id: like._id }).then((lke) => {
      lke.save();
    });
  });
};
module.exports = MyArticleLike;
