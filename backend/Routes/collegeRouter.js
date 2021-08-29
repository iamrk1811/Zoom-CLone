const express = require("express");
const collegeRouter = express.Router();
const { validateEmail } = require("../utils/util");
const College = require("../model/collegeSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthenticationCollege = require("../utils/authentication");
const Teacher = require("../model/teacherSchema");

// college register
collegeRouter.post("/collegeRegisterBackend", (req, res) => {
  let { collegeName, website, state, address, email, password, cpassword } =
    req.body;
  // trim all values to remove unwanted spaces
  collegeName = collegeName.trim();
  website = website.trim();
  state = state.trim();
  address = address.trim();
  email = email.trim();

  // check for blank input
  if (!collegeName || !state || !address || !email || !password || !cpassword) {
    return res.status(400).json({ err: "Invalid input" });
  }

  // validation
  if (!validateEmail(email)) {
    return res.status(400).json({ err: "Please Enter Valid Email" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ err: "Password length should be atleast 6 character" });
  }
  if (password != cpassword) {
    return res.status(400).json({ err: "Password not matching" });
  }

  //   save
  College.findOne({
    email: email,
  }).then(async (result) => {
    if (result) {
      return res.status(409).json({ err: "College Already Exist" });
    } else {
      const college = new College({
        collegeName,
        website,
        state,
        address,
        email,
        password,
      });

      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      college.password = await bcrypt.hash(college.password, salt);

      college
        .save()
        .then(() => {
          res.status(200).json({ msg: "College registered" });
        })
        .catch((err) => {
          res.status(500).json({ err: "Failed to register" + err });
        });
    }
  });
});

// college login
collegeRouter.post("/collegeLoginBackend", (req, res) => {
  let { email, password } = req.body;

  email = email.trim();

  if (!email || !password) {
    return res.status(400).json({ err: "Invalid Input" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ err: "Please Enter Valid Email" });
  }

  College.findOne({ email: email })
    .then((result) => {
      if (result) {
        // on successful login
        const token = jwt.sign({ _id: result._id }, process.env.jwtsecretkey);
        result.tokens = result.tokens.concat({ token: token });
        result.save();

        // setting cookie
        res.cookie("authType", "college", {
          maxAge: 24 * 3600 * 1000, // 24 hours in miliseconds
          // httpOnly: true,
        });

        res.cookie("authToken", token, {
          maxAge: 24 * 3600 * 1000, // 24 hours in miliseconds
          // httpOnly: true,
        });

        res.cookie();
        return res.status(200).json({ msg: "Login successful" });
      } else {
        return res
          .status(400)
          .json({ err: "Please enter correct credentials" });
      }
    })
    .catch((err) => {
      // SOMETHING WENT WRONG
      // TODO
    });
});

// college authentication
collegeRouter.post("/collegeVerifyUser", AuthenticationCollege, (req, res) => {
  res.status(200).send({
    msg: "user verified",
    email: req.User.email,
    collegeName: req.User.collegeName,
  });
});

// adding teacher to database
collegeRouter.post("/collegeAddTeacherBackend", (req, res) => {
  let { fullname, email, password, stream } = req.body;
  fullname = fullname.trim();
  email = email.trim();
  stream = stream.trim();

  // for blank input
  if (!fullname || !email || !password) {
    return res.status(400).json({ err: "Invalid Input" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ err: "Password length should be atleast 6 character" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ err: "Email is not valid" });
  }

  Teacher.findOne({ email: email }).then(async (result) => {
    if (result) {
      // teacher is already exist
      return res.status(409).json({ err: "Teacher is already added" });
    } else {
      const teacher = new Teacher({
        fullname,
        email,
        password,
        stream,
      });

      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(teacher.password, salt);

      const token = req.cookies.authToken;
      const jwtverifytoken = jwt.verify(token, process.env.jwtsecretkey);

      teacher
        .save()
        .then((teacherResult) => {

          // save to college database
          College.findOne({ _id: jwtverifytoken._id, "tokens.token": token }).then(
            (collegeResult) => {
              collegeResult.teachers = collegeResult.teachers.concat({teacherName: fullname, teacherEmail: email});
              collegeResult.save().then((r) => {console.log("Teacher added")});
            }
          );

          res.status(200).json({msg:"Teacher added successfully"})
        })
        .catch((err) => {
          res.status(500).json({err:"Server not responding"})
        });
    }
  });
});

module.exports = collegeRouter;
