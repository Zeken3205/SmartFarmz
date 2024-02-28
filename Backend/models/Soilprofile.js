const mongoose = require('mongoose');
const { Schema } = mongoose;

const SoilSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    nitrogen: {
        type: Number,
        required: true
    },
    potasium: {
        type: Number,
        required: true
    },
    phosphorous: {
        type: Number,
        required: true
    },
    tempreature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    ph: {
        type: Number,
        required: true
    },
    rainfall: {
        type: Number,
        required: true
    },
    moisture: {
        type: Number,
        required: true
    },
    soiltype: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('soilprofile', SoilSchema);