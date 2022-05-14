const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: String,
    year: String,
    rated: String,
    imdbRating: String,
    poster: String,
    plot: String
})

module.exports = mongoose.model('Movie', movieSchema)