const bcrypt = require("bcrypt");
const User = require("./../models/userModel");
const Category = require("./../models/categoryModel");
const Course = require("../models/courseModel");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).redirect("/login");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          // 1) Which user loogen in
          req.session.userId = user._id;
          res.status(200).redirect("/users/dashboard");
        });
      }
    }).clone(); // Yeni versiyon için clone gerekli
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboard = async (req, res) => {
  const user = await User.findById(req.session.userId).populate("courses");
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userId });
  res.status(200).render("dashboard", {
    pageName: "dashboard",
    user,
    categories,
    courses,
  });
};
