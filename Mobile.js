const mongoose = require('mongoose');

const MobileSchema = new mongoose.Schema({
    brand: String,
    model: String,
    screenSize: Number,     // in inches
    operatingSystem: String
});

module.exports = mongoose.model('mobiles', MobileSchema);
