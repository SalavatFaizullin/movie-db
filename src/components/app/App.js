import React, { Component } from 'react'

import MovieList from '../movie-list'
import MoviedbService from '../../services/moviedbService'

class App extends Component {
  MoviedbService = new MoviedbService()

  constructor() {
    super()
    this.state = {
      movies: [],
    }
    this.getMovies()
  }

  getMovies = () => {
    this.MoviedbService.getMovies('superman').then((data) => {
      this.setState({
        movies: data.results,
      })
    })
  }

  render() {
    const { movies } = this.state
    return <MovieList movies={movies} />
  }
}

export default App
