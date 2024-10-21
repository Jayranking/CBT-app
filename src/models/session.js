const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    session : {
        type : String,
        required : true
    }

    // semester  : {
    //     type : String,
    //     enum : ['1st Semester', '2nd Semester'],
    //     default : ''
    // }
});

const Session = mongoose.model('session', sessionSchema);
module.exports = Session;