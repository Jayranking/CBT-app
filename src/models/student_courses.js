const mongoose = require('mongoose');

const student_courseSchema = mongoose.Schema({
    student : {
        type : mongoose.Schema.ObjectId, 
        ref : 'user'
    },

    course  : [{
        type : mongoose.Schema.ObjectId,
        ref : 'course'
    }],

   
});

const Student_course = mongoose.model('student_course', student_courseSchema);
module.exports = Student_course;