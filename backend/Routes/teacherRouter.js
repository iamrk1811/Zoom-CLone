const express = require("express");
const teacherRouter = express.Router();
const { validateEmail, validateMobile } = require("../utils/util");
const Teacher = require("../model/teacherSchema");

teacherRouter.post("/teacherRegisterBackend", (req, res) => {
  let { fullname, email, mobile, password, cpassword } = req.body;

  // trim all input
  fullname = fullname.trim();
  email = email.trim();
  mobile = mobile.trim();
  password = password.trim();
  cpassword = cpassword.trim();

  // check for blank input
  if (!fullname || !email || !mobile || !password || !cpassword) {
    return res.status(400).json({ err: "Invalid Input" });
  }

  // validation
  if (!validateEmail(email)) {
    return res.status(400).json({ err: "Please Enter Valid Email" });
  }
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

  // check if already registered
  Teacher.findOne({ email: email }).then((result) => {
    if (result) {
      return res.status(409).json({ err: "Teacher Already Exist" });
    } else {
      //   creating instance of teacher model then save it into DATABASE
      const teacher = new Teacher({
        fullname,
        email,
        mobile,
        password,
        cpassword,
      });

      //   trying to save the data
      teacher
        .save()
        .then(() => {
          res.status(200).json({ msg: "teacher registered" });
        })
        .catch((err) => {
          res.status(500).json({ err: "failed to register" + err});
        });
    }
  });
});

module.exports = teacherRouter;
