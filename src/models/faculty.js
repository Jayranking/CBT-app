const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
    faculty_name : {
        type : String,
        required : true
    }
});

const Faculty = mongoose.model('faculty', facultySchema);
module.exports = Faculty;