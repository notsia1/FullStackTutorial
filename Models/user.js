const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please fill a valid email address']

    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'JWT_PRIVATE_KEY', { expiresIn: '1h' }); // Replace 'your_jwt_private_key' with your actual private key
    return token;
};

module.exports = mongoose.model('User', userSchema);