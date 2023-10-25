const mongoose=require('mongoose');
const mongoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z]+$/,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z]+$/.test(value);
            },
            message: 'Name should contain alphabets only.'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9]+@[a-zA-Z]+\.com$/,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+@[a-zA-Z]+\.com$/.test(value);
            },
            message: 'Invalid email format. Example: abc123!@gmail.com'
        }
    },password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message: 'Password should contain at least 1 lowercase, 1 uppercase, 1 digit, 1 special character, and be at least 8 characters long.'
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^03\d{2}-\d{7}$/,
        validate: {
            validator: function(value) {
                return /^03\d{2}-\d{7}$/.test(value);
            },
            message: 'Invalid phone number format. Example: 0313-1234567'
        }
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return Number.isInteger(value) && value > 0 && value <= 110;
            },
            message: 'Age should be a positive integer between 1 and 110.'
        }
    },
    
    cnic: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{5}-\d{7}-\d$/,
        validate: {
            validator: function(value) {
                return /^\d{5}-\d{7}-\d$/.test(value);
            },
            message: 'Invalid CNIC format. Example: 36501-5009665-7'
        }
    },
    programingLang: {
        type:[String],
        required:true
    },
});

const Mongo=mongoose.model("User", mongoSchema)
module.exports = Mongo;