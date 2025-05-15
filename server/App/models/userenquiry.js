let mongoose = require('mongoose');

let userEnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

let UserEnquiry = mongoose.model('UserEnquiry', userEnquirySchema);
module.exports = UserEnquiry;