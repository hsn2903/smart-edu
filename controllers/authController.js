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
        console.log(password);
        console.log(user);
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // User Session
            res.status(200).send("LOGGED IN");
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
