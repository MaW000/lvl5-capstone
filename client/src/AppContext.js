import React from "react";
import  { useState, useEffect } from "react";
import axios from "axios";
import Movies from "./components/Movies";
const AppContext = React.createContext()

const AppContextProvider = (props) => {
    const [inputs,setInputs] = useState({
        title: 'a',
        year: ''
      })
    
    const [movieData, setMovieData] = useState({
        
        Title:'',
        Year:'',
        Rated:'',
        imdbRating:'',
        Poster:'',
        Plot:''
    })

    const [savedMovies, setSavedMovies] = useState({movies: []})

    useEffect(() => {
        axios.get(`http://www.omdbapi.com/?t=${inputs.title}&y=${inputs.year}&apikey=c450e1a6`)
        .then((res) => {
            if (Object.keys(res.data).length > 3) {
                setMovieData({Title:res.data.Title,Year:res.data.Year,Rated:res.data.Rated,Released:res.data.Released,Poster:res.data.Poster,imdbRating:res.data.imdbRating,Plot:res.data.Plot})
            } return
    })
    }, [inputs])
    
    const List = savedMovies.movies.map(item => {
        return (
            <Movies
                Title = {item.Title}
                Year = {item.Year}
                Rated = {item.Rated}
                imdbRating = {item.imdbRating}
                Poster = {item.Poster}
                Plot = {item.Plot}
            />
        )
    })
    
    const HandleChange = (e) => {
        const { name, value } = e.target

        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const HandleSave = () => {
        setSavedMovies((prev) => ({
            movies: [...prev.movies, movieData]
        }))
    }
    
    return(
        <AppContext.Provider value={{
            HandleChange,
            HandleSave,
            inputs,
            List,
            savedMovies,
            Title: movieData.Title,
            Year: movieData.Year,
            Rated: movieData.Rated,
            Poster: movieData.Poster,
            imdbRating: movieData.imdbRating,
            Plot: movieData.Plot,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider}