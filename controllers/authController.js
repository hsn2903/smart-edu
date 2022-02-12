const User = require("./../models/userModel");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
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
          if (same) {
            // 1) Which user loogen in
            req.session.userId = user._id;
            res.status(200).redirect("/users/dashboard");
          }
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
  const user = await User.findById(req.session.userId);

  res.status(200).render("dashboard", {
    pageName: "dashboard",
    user,
  });
};
