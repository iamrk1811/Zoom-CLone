const express = require("express");
const studentRouter = express.Router();
const { validateMobile } = require("../utils/util");
const Student = require("../model/studentSchema");

studentRouter.post("/studentRegisterBackend", (req, res) => {
  let { fullname, mobile, password, cpassword } = req.body;

  // trim
  fullname = fullname.trim();
  mobile = mobile.trim();
  password = password.trim();
  cpassword = cpassword.trim();

  // check for blank input
  if (!fullname || !mobile || !password || !cpassword) {
    return res.status(400).json({ err: "Invalid Input" });
  }

  // validation
  if (!validateMobile(mobile)) {
    return res.status(400).json({ err: "Please Enter Valid Mobile" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ err: "Password length should be atleast 6 character" });
  }
  if (password != cpassword) {
    return res.status(400).json({ err: "Password not matching" });
  }

  // check if student is already registered
  Student.findOne({ mobile: mobile }).then((result) => {
    if (result) {
      return res.status(409).json({ err: "Student Already Exist" });
    } else {
      //   creating instance of student model then save it into DATABASE
      const student = new Student({
        fullname,
        mobile,
        password,
        cpassword,
      });

      student
        .save()
        .then(() => {
          res.status(200).json({ msg: "student registered" });
        })
        .catch((err) => {
            res.status(500).json({ err: "failed to register" });
        });
    }
  });
});

module.exports = studentRouter;
