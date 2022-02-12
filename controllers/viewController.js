exports.getIndex = (req, res) => {
  // test
  console.log(req.session.userId);

  res.status(200).render("index", {
    pageName: "index",
  });
};

exports.getAbout = (req, res) => {
  res.status(200).render("about", {
    pageName: "about",
  });
};

exports.getRegister = (req, res) => {
  res.status(200).render("register", {
    pageName: "register",
  });
};

exports.getLogin = (req, res) => {
  res.status(200).render("login", {
    pageName: "login",
  });
};
