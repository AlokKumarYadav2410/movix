const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    movieId: {
        type: String,
        required: true
    }
}, {timestamps: true});

const favouriteModel = mongoose.model('favourites', favouriteSchema);

module.exports = favouriteModel;