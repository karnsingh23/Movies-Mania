const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
    },
    movieId: {
        type: Number, 
        required: true,
    }
});

module.exports = mongoose.model('Favourite', favoriteSchema);
