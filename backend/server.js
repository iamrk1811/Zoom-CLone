const express = require('express');
const app = express();

// dotenv
require('dotenv').config({ path: './config.env' })
const PORT = process.env.PORT; 
 
// database connection
require("./database/TeacherDBconn");


// using middleware
app.use(express.json()); // this middleware allows us to use JSON in our app


// using all routes
app.use(require('./Routes/router')); // basic router
app.use(require('./Routes/teacherRouter')); // specific to only teachers
app.use(require('./Routes/studentRouter')); // specific to only students



// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);
});