const express = require('express')
const mongoose = require('mongoose')
const app = express()
const morgan = require('morgan')
const port = 9000
app.use(morgan('dev'))
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/movies',{useNewUrlParser: true})
.then(()=> console.log("Connected to MongoDB"))
.catch(err => console.error(err));

app.use('/bounty', require("./routes/movieRouter.js"))

app.listen(port, () => {
    console.log('This server is working')
})