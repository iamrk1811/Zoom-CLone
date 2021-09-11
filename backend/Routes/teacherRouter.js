const express = require("express");
const teacherRouter = express.Router();
const { validateEmail, validateMobile } = require("../utils/util");
const Teacher = require("../model/teacherSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AuthenticationTeacher} = require("../utils/authentication");



// teacher login
teacherRouter.post("/teacherLoginBackend", (req, res) => {
  const {email, password} = req.body;
  Teacher.findOne({email: email}).then( (data) => {
    if(data) {
      bcrypt.compare(password, data.password, function(err, isPasswordMatched) {
        if(err || !isPasswordMatched) {
          res.status(400).json({err:"Invalid credentials"}); // password not matching
        } else {
          const token = jwt.sign({_id: data._id}, process.env.jwtsecretkey);
          // updating the teacher with token
          data.tokens = data.tokens.concat({ token: token });
          data.save();

          // setting cookie
          res.cookie("authType", "teacher", {
            maxAge: 30 * 24 * 3600 * 1000, // 30 days in miliseconds
          });
          res.cookie("authToken", token, {
            maxAge: 30 * 24 * 3600 * 1000, // 30 days in miliseconds
          })

          res.status(200).json({msg : "login successful"});
        }
      });
    } else {
      res.status(400).json({err:"Invalid credentials"});
    }
  }).catch((err) => {
    res.status(400).json({err:"Invalid credentials"});
  })
});

// verify teacher
teacherRouter.post('/teacherVerifyUser', AuthenticationTeacher, (req, res) => {
  res.status(200).send({
    msg: "user verified",
    email: req.User.email
  });
})
module.exports = teacherRouter;
