const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    code  : {
        type : String,
        required : true
    },

    unit : {
        type : String,
        required : true
    },

    dept : {
        type : String,
        required : true
    },

    faculty : {
        type : String,
        required : true
    },

    level : {
        type : String,
        required : true
    },

    semester  : {
        type : String,
        enum : ['1st Semester', '2nd Semester'],
        default : ''
    }
});

const Course = mongoose.model('course', courseSchema);
module.exports = Course;