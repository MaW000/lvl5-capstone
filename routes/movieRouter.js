const express = require('express')
const movieRouter = express.Router()
const Movie = require('../models/movie.js')

movieRouter.get('/', (req, res, next) => {
    Movie.find((err, movies) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(movies)
    })
})

movieRouter.post("/", (req, res, next) => {
    const newMovie = new Movie(req.body)
    newMovie.save((err, movie) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(movie)
    })
  })

module.exports = movieRouter