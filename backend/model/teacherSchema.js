const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  fullname: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  password: {
      type: String,
      required: true,
  },
  cpassword: {
      type: String,
      required: true
  },
  bio: String,
  Rating: Number,
  star1: Number,
  star2: Number,
  star3: Number,
  star4: Number,
  star5: Number,
  site: String,
  twiter: String,
  facebook: String,
  instagram: String,
  linkedin: String,
  github: String
})


const Teacher = mongoose.model("TEACHER", teacherSchema);

module.exports = Teacher;