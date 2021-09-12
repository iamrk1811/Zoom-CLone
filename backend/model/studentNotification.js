const mongoose = require('mongoose');

const StudentNotificationSchema = mongoose.Schema({
    session:String,
    stream:string,
    notification: [{
        title:String,
        time:String,
        by:String
    }]
})

const StudentNotification = mongoose.model(StudentNotificationSchema);

module.exports = StudentNotification;