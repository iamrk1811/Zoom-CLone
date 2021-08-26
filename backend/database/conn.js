const mongoose = require("mongoose");
mongoose
  .connect(process.env.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE Connection Successfull");
  })
  .catch((err) => {
    console.log("DATABASE Connection Failed : " + err);
  });
