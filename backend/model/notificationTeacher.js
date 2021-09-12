const mongoose = require('mongoose');

const TeacherNotificationSchema = mongoose.Schema({
    notification: [{
        title:String,
        time:String,
        by:String
    }]
})

const TeacherNotification = mongoose.model(TeacherNotificationSchema);

module.exports = TeacherNotification;