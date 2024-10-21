const mongoose = require('mongoose');

const durationSchema = mongoose.Schema({
    startTime: {
        type: Date
    },
    endTime: { 
        type: Date 
    },
    duration: { 
        type: Number 
    }, 
    
});
const Duration = mongoose.model('duration', durationSchema)
module.exports = Duration;
