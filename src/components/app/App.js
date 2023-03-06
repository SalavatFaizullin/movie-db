/* eslint-disable */
import React, { Component } from 'react'

import MovieList from '../movie-list'
import MoviedbService from '../../services/moviedbService'
import { Online, Offline } from 'react-detect-offline'
import ErrorAlert from '../error-alert/ErrorAlert'
import OfflineAlert from '../offline-alert/OfflineAlert'
import Spinner from '../spinner/Spinner'

class App extends Component {
  MoviedbService = new MoviedbService()

  constructor() {
    super()
    this.state = {
      movies: [],
      loading: true,
      error: false,
    }
    this.getMovies()
  }

  getMovies = () => {
    this.MoviedbService.getMovies('return')
      .then((data) => {
        this.setState({
          movies: data.results,
          loading: false,
        })
      })
      .catch(this.onError)
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  render() {
    const { movies, loading, error } = this.state
    const hasData = !(loading || error)
    const errorAlert = error ? <ErrorAlert /> : null
    const offlineAlert = <OfflineAlert />
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <MovieList movies={movies} /> : null

    return (
      <>
        <Online>
          {errorAlert}
          {spinner}
          {content}
        </Online>
        <Offline>{offlineAlert}</Offline>
      </>
    )
  }
}

export default App
