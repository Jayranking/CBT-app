const mongoose = require('mongoose');

const course_assignmentSchema = mongoose.Schema({
    lecturer : {
        type : mongoose.Schema.ObjectId,
        ref : 'user'
    },

    course  : [{
        type : mongoose.Schema.ObjectId,
        ref : 'course'
    }],

    session: {
        type: mongoose.Schema.ObjectId,
        ref: 'session'
    },

    date : {
        type : Date,
        default : Date.now
    }
});

const Course_assignment = mongoose.model('course_assignment', course_assignmentSchema);
module.exports = Course_assignment;