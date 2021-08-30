const mongoose = require("mongoose");

const collegeSchema = mongoose.Schema({
    collegeName: {
        type: String, required: true
    },
    website: String,
    state: {
        type: String, required: true
    },
    address: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type:String, required: true
    },
    teachers: [{
        teacherName: String,
        teacherEmail: String,
        teacherStream: String
    }],
    tokens: [
        {
            token: String
        }
    ]
})

const College = mongoose.model("COLLEGE", collegeSchema);

module.exports = College;