const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Roadster");

const PostSchema = new mongoose.Schema({
    imageText: {
        type: String, 
        trim: true,
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0,
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
