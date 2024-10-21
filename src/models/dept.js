const mongoose = require('mongoose');

const deptSchema = mongoose.Schema({
    dept_name : {
        type : String,
        required : true
    },

    faculty : {
        type : String,
        required : true
    }
});

const Dept = mongoose.model('dept', deptSchema);
module.exports = Dept;