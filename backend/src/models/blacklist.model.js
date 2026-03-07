const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'Token is required']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 
    }
});

const blackListModel = mongoose.model('blacklist', blackListSchema);

module.exports = blackListModel;