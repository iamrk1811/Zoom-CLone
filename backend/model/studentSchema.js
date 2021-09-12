const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cred: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  session: {
    type: String,
  },
  stream: {
    type: String,
  },
  tokens: [
    {
      token: String,
    },
  ],
});

const Student = mongoose.model("STUDENT", studentSchema);

module.exports = Student;
