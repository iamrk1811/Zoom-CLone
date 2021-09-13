const emailValidator = require("email-validator");
const College = require("../model/collegeSchema");

// email validation
function validateEmail(email) {
  return emailValidator.validate(email);
}

// mobile validation
function validateMobile(mobile) {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(mobile);
}

// store notification for TEACHERS sent by college
function storeNotificationForTeachers(title, collegeId, college) {
  const time = getCurrentTimeAmPM();
  const date = getToDaydate();
  const notification = { title: title, time: date + " " + time, by: "College" };
  const newNotifications = college.teacherNotifications;
  newNotifications.push(notification);
  College.updateOne(
    { _id: collegeId },
    {
      $set: {
        teacherNotifications: newNotifications,
      },
    }
  )
    .then((r) => {
      return true;
    })
    .catch((e) => {
      return false;
    });
}

// store notification for STUDENT send by college or teachers
function storeNotificationForStudents() {

}

// get currentTime in AM/PM format
function getCurrentTimeAmPM() {
  const date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const currentTime = hours + ":" + minutes + " " + ampm;

  return currentTime;
}

function getToDaydate() {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const newdate = year + "/" + month + "/" + day;
  return newdate;
}

module.exports = {
  validateEmail,
  validateMobile,
  storeNotificationForTeachers,
  getCurrentTimeAmPM,
  storeNotificationForStudents,
};
