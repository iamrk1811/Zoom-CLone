const mongoose = require("mongoose");
mongoose
  .connect(process.env.teacherdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Teacher DATABASE Connection Successfull");
  })
  .catch((err) => {
    console.log("Teacher DATABASE Connection Failed : " + err);
  });
