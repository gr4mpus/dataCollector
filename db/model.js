const mongoose = require('mongoose');

const particleModelSchema = mongoose.Schema({
    city_id: Number,
    country: String,
    city: String,
    station: String,
    last_update: String,
    pollutant_id: String,
    pollutant_min: Number,
    pollutant_max: Number,
    pollutant_avg: Number,
    pollutant_unit: String
});

module.exports = mongoose.model('ParticleModel',particleModelSchema);