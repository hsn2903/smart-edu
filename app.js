const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const viewRouter = require("./routes/viewRoutes");
const courseRouter = require("./routes/courseRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Global variables
global.userIn = null;

// Middlewares
app.use(express.static("public"));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// express-session
app.use(
  session({
    secret: "my-keyboard-cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/smart-edu-db",
    }),
  })
);

// Connect Db
// veritabanı yoksa oluşturur
mongoose.connect("mongodb://localhost/smart-edu-db").then(() => {
  console.log("Db connected succesfully");
});

// Template Engine
app.set("view engine", "ejs");

// Routes
app.use("*", (req, res, next) => {
  userIn = req.session.userId;
  next();
});
app.use("/", viewRouter);
app.use("/courses", courseRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
