const express = require("express");
const studentRouter = express.Router();
const { validateMobile } = require("../utils/util");
const Student = require("../model/studentSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// login backend logic for student
studentRouter.post('/studentLoginBackend', (req, res) => {
  let {cred, password} = req.body;
  cred = cred.trim();

  Student.findOne({cred}).then((result) => {
    if(result) {
      bcrypt.compare(password, result.password, (error, isPasswordMatched) => {
        if(error || !isPasswordMatched) {
          res.status(400).json({err:"Invalid Credentials"})
        } else {
          const token = jwt.sign({_id: result._id}, process.env.jwtsecretkey);
          // updating the teacher with token
          result.tokens = result.tokens.concat({ token: token });
          result.save();

          // setting cookie
          res.cookie("authType", "student", {
            maxAge: 30 * 24 * 3600 * 1000, // 30 days in miliseconds
          });
          res.cookie("authToken", token, {
            maxAge: 30 * 24 * 3600 * 1000, // 30 days in miliseconds
          })

          res.status(200).json({msg : "login successful"});
        }
      })
    } else {
      res.status(400).json({err:"Invalid Credentials"})
    }
  }).catch((err) => {
    res.status(400).json({err:"Invalid Credentials"})
  })

})

module.exports = studentRouter;
