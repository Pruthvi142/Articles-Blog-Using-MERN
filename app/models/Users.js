const { Schema, model } = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");
// const comments = require('./comments')
const UserSchema = new Schema({
  profile: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "this filed  is required"],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        return isEmail(value);
      },
      message: function () {
        return { errors: "inavlid email format" };
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  role: {
    type: String,

    enum: ["user", "admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.genSalt().then((res) => {
    bcrypt.hash(user.password, res).then((encrypt) => {
      user.password = encrypt;
      // console.log(user.password)
      next();
    });
  });
});
module.exports = model("User", UserSchema);
