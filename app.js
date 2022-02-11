const express = require("express");
const mongoose = require("mongoose");

const viewRouter = require("./routes/viewRoutes");
const courseRouter = require("./routes/courseRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Connect Db
// veritabanı yoksa oluşturur
mongoose.connect("mongodb://localhost/smart-edu-db").then(() => {
  console.log("Db connected succesfully");
});

// Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));

// Routes
app.use("/", viewRouter);
app.use("/courses", courseRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
