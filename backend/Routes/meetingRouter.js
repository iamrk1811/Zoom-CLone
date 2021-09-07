const express = require("express");
const meetingRouter = express.Router();
const { v4: uuidv4 } = require('uuid')

meetingRouter.post("/generateMeetingId", (req, res) => {
  const { teacher } = req.body;
  //   verify teacher or not TODO
  res.status(200).json({'meetingId' : `${uuidv4()}`});
});

module.exports = meetingRouter;
