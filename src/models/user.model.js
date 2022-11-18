const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please tell us your name"] },
    username: { type: String, required: [true, "Please enter your username"], lowercase: true, unique: true },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      trim: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    profileImage: {
      type: String,
      default: "https://res.cloudinary.com/glimpseapp/image/upload/v1645873330/avatar_g8lfgm.png",
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Check if email is taken
 * check if username is taken
 */

userSchema.statics.emailAlreadyExists = async function (email) {
  // Find email
  try {
    //lean() will strip the response data of any Mongoose Document data, which reduces the memory our Node.js process uses
    const Emailfound = await this.findOne({ email }).lean();

    return Emailfound ? true : false;
  } catch (error) {
    console.log(error);
    throw new AppError("unable to confirm if Email exists", 400);
  }
};

userSchema.statics.usernameAlreadyExists = async function (username) {
  // Find username
  try {
    const usernamefound = await this.findOne({ username }).lean();

    return usernamefound ? true : false;
    //
  } catch (error) {
    console.log(error);
    throw new AppError("unable to confirm if Username exists", 400);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
