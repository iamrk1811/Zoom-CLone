const express = require("express");
const collegeRouter = express.Router();
const { validateEmail, validateMobile } = require("../utils/util");
const College = require("../model/collegeSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {AuthenticationCollege} = require("../utils/authentication");
const Teacher = require("../model/teacherSchema");
const Student = require("../model/studentSchema");

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
        // matching password
        bcrypt.compare(
          password,
          result.password,
          function (err, isPassMatched) {
            if (err || !isPassMatched) {
              return res.status(400).json({ err: "Invalid Credentials" });
            } else {
              // on successful login
              const token = jwt.sign(
                { _id: result._id },
                process.env.jwtsecretkey
              );
              result.tokens = result.tokens.concat({ token: token });
              result.save();

              // setting cookie
              res.cookie("authType", "college", {
                maxAge: 30 * 24 * 3600 * 1000, // 30 Days in miliseconds
                // httpOnly: true,
              });

              res.cookie("authToken", token, {
                maxAge: 30 * 24 * 3600 * 1000, // 30 Days in miliseconds
                // httpOnly: true,
              });

              res.cookie();
              return res.status(200).json({ msg: "Login successful" });
            }
          }
        );
      } else {
        return res
          .status(400)
          .json({ err: "Please enter correct credentials" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ err: "Please enter correct credentials" });
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
  let { fullname, email, password, collegeName, stream } = req.body;
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
        collegeName,
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
          College.findOne({
            _id: jwtverifytoken._id,
            "tokens.token": token,
          }).then((collegeResult) => {
            collegeResult.teachers = collegeResult.teachers.concat({
              teacherName: fullname,
              teacherEmail: email,
              teacherStream: stream,
            });
            collegeResult.save().then((r) => {
              console.log("Teacher added");
            });
          });

          res.status(200).json({ msg: "Teacher added successfully" });
        })
        .catch((err) => {
          res.status(500).json({ err: "Server not responding" });
        });
    }
  });
});

// get all teachers from database based on which college
collegeRouter.post("/collegeGetTeachersBackend", (req, res) => {
  const token = req.cookies.authToken;
  const jwtverifytoken = jwt.verify(token, process.env.jwtsecretkey);

  College.findOne({ _id: jwtverifytoken._id, "tokens.token": token })
    .then((result) => {
      if (result) {
        const teachers = result.teachers;
        res.status(200).json({ Teachers: teachers });
      } else {
        throw new Error("College Not Found");
      }
    })
    .catch((err) => {
      res.status(200).json({ err: "Bad request" });
    });
});

// delete teacher from college database as well as teacher database
collegeRouter.post("/collegeDeleteTeacherBackend", (req, res) => {
  const { email } = req.body;
  const token = req.cookies.authToken;
  const jwtverifytoken = jwt.verify(token, process.env.jwtsecretkey);

  Teacher.deleteOne({ email: email })
    .then((result) => {
      College.findOne({ _id: jwtverifytoken._id }).then((college) => {
        const newTeachers = college.teachers.filter((obj) => {
          return obj.teacherEmail !== email;
        });
        College.updateOne(
          { _id: jwtverifytoken._id },
          {
            $set: {
              teachers: newTeachers,
            },
          }
        )
          .then((r) => {
            res.status(200).json({ msg: "Deleted" });
          })
          .catch((err) => {
            throw new Error("Not Working");
          });
      });
    })
    .catch((err) => {
      res.status(500).json({ err: "Server error" });
    });
});

// adding new stream
collegeRouter.post("/collegeAddStreamBackend", (req, res) => {
  const { stream } = req.body;
  const token = req.cookies.authToken;
  const jwtverifytoken = jwt.verify(token, process.env.jwtsecretkey);

  College.findOne({ _id: jwtverifytoken._id }).then((college) => {
    if (!college) {
      res.status(401).json({ err: "Unauthorized College" });
    } else {
      const streams = college.streams;
      if (streams.includes(stream)) {
        res.status(401).json({ err: "Stream Already Added" });
      } else {
        streams.push(stream);
        College.updateOne(
          { _id: jwtverifytoken._id },
          {
            $set: {
              streams: streams,
            },
          }
        )
          .then((r) => {
            res.status(200).json({ msg: "Successfully Added" });
          })
          .catch((e) => {
            res.status(401).json({ err: "Failed to add" });
          });
      }
    }
  });
});

// getting all available streams of a college
collegeRouter.post("/collegeGetAvailableStreamBackend", (req, res) => {
  const token = req.cookies.authToken;
  const jwtverifytoken = jwt.verify(token, process.env.jwtsecretkey);
  College.findOne({ _id: jwtverifytoken._id }).then((college) => {
    if (college) {
      res.status(200).json({
        streams: college.streams,
      });
    }
  });
});

// college adding student
collegeRouter.post("/collegeAddStudentBackend", (req, res) => {
  const token = req.cookies.authToken;
  const jwtverifytoken = jwt.verify(token, process.env.jwtsecretkey);
  College.findOne({ _id: jwtverifytoken._id }).then((college) => {
    if (college) {
      let { name, cred, password, session, stream } = req.body;
      cred.trim();
      name = name.trim();
      session = session.trim();
      stream = stream.trim();

      // check for blank input
      if (!name || !cred || !password || !session || !stream) {
        return res.status(400).json({ err: "Invalid input" });
      }

      // validation
      if (!validateEmail(cred) && !validateMobile(cred)) {
        return res.status(400).json({ err: "Enter Valid Email / Mobile" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ err: "Password length should be atleast 6 character" });
      }

      
      // check if this student already exist
      Student.findOne({cred}).then( async (result) => {
        if (result) {
          // student already exist
          res.status(409).json({ err: "Student Already Exist" });
        } else {
          const student = new Student({
            name,
            cred,
            password,
            session,
            stream,
          });
          // generate salt to hash password
          const salt = await bcrypt.genSalt(10);
          student.password = await bcrypt.hash(student.password, salt);

          student
            .save()
            .then(() => {
              res.status(200).json({ msg: "Student Successfully Registered" });
            })
            .catch((err) => {
              res.status(500).json({ err: "Failed to register" + err });
            });
        }
      });
    } else {
      res.status(401).json({ err: "Unauthorized College" });
    }
  });
});
module.exports = collegeRouter;
