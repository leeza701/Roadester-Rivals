const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Roadster");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: String, 
    profilePic: { type: String, default: "default.png" }, 
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    bio: { type: String, default: "" }, 
    name : String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
