const College = require("../model/collegeSchema");
const Teacher = require("../model/teacherSchema");
const Student  = require("../model/studentSchema");
const jwt = require("jsonwebtoken");

// authentication college
const AuthenticationCollege = (req, res, next) => {
  const authType = req.cookies.authType;
  if (authType !== "college") {
    res.status(401).send("Unauthorized access 1");
  } else {
    const token = req.cookies.authToken;
    const verifytoken = jwt.verify(token, process.env.jwtsecretkey);

    College.findOne({ _id: verifytoken._id, "tokens.token": token })
      .then((result) => {
        if (result) {
          req.User = result;
          next();
        } else {
          throw new Error("Not found");
        }
      })
      .catch((err) => {
        res.status(401).send("Unauthorized access 2");
      });
  }
}

const AuthenticationTeacher = (req, res, next) => {
  const authType = req.cookies.authType;
  if (authType !== "teacher") {
    return res.status(401).send("Unauthorized access");
  } else {
    const token = req.cookies.authToken;
    const verifytoken = jwt.verify(token, process.env.jwtsecretkey);

    Teacher.findOne({ _id: verifytoken._id, "tokens.token": token })
      .then((result) => {
        if (result) {
          req.User = result;
          next();
        } else {
          throw new Error("Not found");
        }
      })
      .catch((err) => {
        res.status(401).send("Unauthorized access");
      });
  }
}
const AuthenticationStudent = (req, res, next) => {
  const authType = req.cookies.authType;
  if (authType !== "student") {
    return res.status(401).send("Unauthorized access");
  } else {
    const token = req.cookies.authToken;
    const verifytoken = jwt.verify(token, process.env.jwtsecretkey);

    Student.findOne({ _id: verifytoken._id, "tokens.token": token })
      .then((result) => {
        if (result) {
          req.User = result;
          next();
        } else {
          throw new Error("Not found");
        }
      })
      .catch((err) => {
        res.status(401).send("Unauthorized access");
      });
  }
}


module.exports = { AuthenticationCollege, AuthenticationTeacher, AuthenticationStudent };
