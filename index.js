const express = require('express')
const app = express()

app.use(express.json())

// in-memory db
const movies = [];

// let get all the movies
app.get('/movies', (req, res) => {
    res.json(movies)
    console.log(movies)
})

// get movie by id
app.get('/movies/:id', (req, res) => {
    const movie = movies.find((m) => m.id === parseInt(req.params.id))

    if (!movie) {
        return res.status(404).send('Movie list not found.')
    }

    return res.json(movie)
})

// add new movie.
app.post('/add-movie', (req, res) => {
    const movie = {
        id: movies.length + 1,
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
    };

    // now push this incoming movie object to our movies array...
    movies.push(movie)

    return res.status(200).send(movie)

})

// update a movie 
app.put('/movies/:id', (req, res) => {
    const movie = movies.find((m) => m.id === parseInt(req.params.id))

    // push this 
    movie.title = req.body.title;
    movie.genre = req.body.genre;
    movie.year = req.body.year;
        
    return res.status(200).send(movie)
})

// delete a movie
app.delete('/delete-movie/:id', (req, res) => {
    // now i have to delete a movie from the movies array which contains object.

    // I am storing some ids into them, whith the help of it. I may be able to get them.

    // but I have to remove the complete data of an particular movie with the given id, like their year, genre, etc. from the array.

    const findMovieIndex = movies.findIndex((m) => m.id === parseInt(req.params.id))

    if (findMovieIndex === -1) {
        return res.status(400).send("Movie not found in store.")
    }

    const deleteMovie = movies.splice(findMovieIndex, 1);
    return res.json(deleteMovie)
})

app.listen(8000, () => {
    console.log('Server is running on port 8000.')
})