const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  }
);

userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign(
      { username: this.username, isAdmin: this.isAdmin },
      config.get("jwtPrivateKey")
    );
    return token;
  } catch (ex) {
    console.log("Failed to generate auth token: ", ex);
    return null;
  }
};

const User = mongoose.model("User", userSchema, "User");

exports.User = User;
