const { Schema, model } = require("mongoose");
const LikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article",
  },
});
module.exports = model("Likes", LikeSchema);
