const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    courseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'course',
        required: true
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.ObjectId,
            ref: 'question',
            required: true
        },
        selectedOption: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }],
    score: {
        type: Number,
        required: true
    }
});

const Result = mongoose.model('Result', resultSchema); 
module.exports = Result;
