const Course = require("./../models/courseModel");
const Category = require("./../models/categoryModel");

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        course: newCourse,
      },
    });
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

    const courses = await Course.find(filter);
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
    const course = await Course.findOne({ slug: req.params.slug });

    res.status(200).render("course", {
      course: course,
      pageName: "course",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
