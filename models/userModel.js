const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A user must have a name!"],
  },
  email: {
    type: String,
    required: [true, "A user must have a description!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password!"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// kullanıcı şifresini db de açık bir şekilde görünmemesi için kripte ediyoruz
userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
