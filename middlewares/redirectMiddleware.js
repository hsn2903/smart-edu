// Zaten giriş yapmış kullanıcının login, register gibi sayfalara erişmesine gerek yok
module.exports = async (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/");
  }
  next();
};
