const express = require("express");
const meetingRouter = express.Router();
const { v4: uuidv4 } = require('uuid')

meetingRouter.post("/getRoomId", (req, res) => {
  res.status(200).json({'roomId' : `${uuidv4()}`});
});

module.exports = meetingRouter;
