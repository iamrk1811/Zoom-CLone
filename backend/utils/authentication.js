const College = require("../model/collegeSchema");
const jwt = require("jsonwebtoken");

// authentication college
const AuthenticationCollege = (req, res, next) => {
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
        res.status(401).send("Unauthorized access");
    });
};

module.exports = AuthenticationCollege;
