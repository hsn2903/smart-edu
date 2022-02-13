const Course = require("./../models/courseModel");
const Category = require("./../models/categoryModel");
const User = require("../models/userModel");

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userId,
    });

    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    // req.query üzerinden categories sorgusu gelirse
    // 1) önce o kategoriyi bul
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      // _id'isne göre filtrele
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort("-createdAt");
    const categories = await Category.find();

    // res.status(200).json({
    //   status: "success",
    //   results: courses.length,
    //   data: {
    //     courses: courses,
    //   },
    // });

    res.status(200).render("courses", {
      courses,
      categories,
      pageName: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );

    res.status(200).render("course", {
      course: course,
      pageName: "course",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    await user.courses.push(req.body.courseId);
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    await user.courses.pull(req.body.courseId);
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
