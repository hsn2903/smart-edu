const mongoose = require("mongoose");
const slugify = require("slugify");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A course must have a name!"],
  },
  description: {
    type: String,
    required: [true, "A course must have a description!"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  // Kurs ve Kategori arsaında ilişki kuruyoruz
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

courseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
