const User = require("./../models/userModel");

module.exports = async (req, res, next) => {
  await User.findById(req.session.userId, (err, user) => {
    // Hata varsa veya öyle bir kullanıcı yoksa
    if (err || !user) {
      return res.redirect("/login");
    }
    next();
  });
};
