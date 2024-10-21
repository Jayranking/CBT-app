
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'course'
    },
    
    session: {
        type: mongoose.Schema.ObjectId,
        ref: 'session'
    },

    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone_no: {
        type: String,
        required: true
    },

    reg_no: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: true
    },

    faculty: {
        type: String,
        required: true
    },

    dept: {
        type: String,
        required: true
    },
    
    session: {
        type: String,
        required: true
    },

    level: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        enum: ['lecturer', 'student'],
        required: true
    },
    
    password: {
        type: String,
        required: true
    }
    
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Login
userSchema.statics.login = async function (reg_no, password) {
    const user = await this.findOne({reg_no});
    if (user) {
        // compare password 
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw new Error('Incorrect Password')
    }
    throw new Error('Incorrect Credentials')
}

const User = mongoose.model('user', userSchema);
module.exports = User;