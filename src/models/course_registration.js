const mongoose = require('mongoose');

const course_registrationSchema = mongoose.Schema({
    student : {
        type : mongoose.Schema.ObjectId,
        ref : 'user'
    },

    course  : [{
        type : mongoose.Schema.ObjectId,
        ref : 'course'
    }],

    session  : {
        type : mongoose.Schema.ObjectId,
        ref : 'session'
    },

    date : {
        type : Date,
        default : Date.now
    }
});

const Course_registration = mongoose.model('course_registration', course_registrationSchema);
module.exports = Course_registration;