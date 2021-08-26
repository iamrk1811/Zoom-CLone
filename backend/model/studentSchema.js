const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    fullname: {
        type:String,
        required:true
    },
    mobile: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    cpassword: {
        type:String,
        required:true
    }
});


const Student = mongoose.model('STUDENT', studentSchema);

module.exports = Student;