const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
    // lecturer : {
    //     type : mongoose.Schema.ObjectId,
    //     ref : 'user'
    // },

    // course: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'course'
    // },

    // session : {
    //     type : String,
    //     required : true
    // },

    // question : {
    //     type : mongoose.Schema.ObjectId,
    //     ref : 'question'
    // },

    durationInMinutes : {
        type: Number,
        required: true
    },

    // mark : {
    //     type : String,
    //     required : true
    // },

    // exam_date : {
    //     type : Date,
    //     default : null
    // }
});

const Exam = mongoose.model('exam', examSchema);
module.exports = Exam;