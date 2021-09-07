const express = require('express');
const app = express();
const server = require('http').Server(app);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const meeting = require('./MeetingApp/meeting');
// socket.io and peer server creation
const io = require('socket.io')(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
})

const { ExpressPeerServer } = require('peer')

const peerServer = ExpressPeerServer(server, {
	debug: true,
})

// dotenv
require('dotenv').config({ path: './config.env' })
const PORT = process.env.PORT || 5000; 
 
// database connection
require("./database/conn");

// using peer server
app.use('/', peerServer)

// setting static file path
app.use(express.static('public'))

// using middleware
app.use(express.json()); // this middleware allows us to use JSON in our app
app.use(cookieParser());
app.use(cors());

// all codes related to socket
meeting(io);



// using all routes
app.use(require('./Routes/router')); // basic router
app.use(require('./Routes/collegeRouter')); // specific to only college
app.use(require('./Routes/teacherRouter')); // specific to only teachers
app.use(require('./Routes/studentRouter')); // specific to only students
app.use(require('./Routes/meetingRouter')); // specific to only meetings


// Start server
// app.listen(PORT, () => {
//     console.log(`Server listening on port : ${PORT}`);
// });

server.listen(PORT, () => {console.log(`Server listening on port : ${PORT}`)});