/* eslint-disable */
import React, { Component } from 'react'

import './App.css'

import MovieList from '../movie-list'
import MoviedbService from '../../services/moviedbService'
import { Online, Offline } from 'react-detect-offline'
import ErrorAlert from '../error-alert/ErrorAlert'
import OfflineAlert from '../offline-alert/OfflineAlert'
import Spinner from '../spinner/Spinner'
import SearchArea from '../search-area/SearchArea'
import { debounce } from 'lodash'

class App extends Component {
  MoviedbService = new MoviedbService()

  state = {
    movies: [],
    loading: false,
    searchTerm: '',
    error: false,
    errorMessage: '',
  }

  debounceSearch = debounce((e) => {
    this.setState({
      searchTerm: e.target.value,
      loading: true,
    })
    if (this.state.searchTerm !== '') {
      this.MoviedbService.getMovies(this.state.searchTerm)
        .then((data) => {
          this.setState({
            movies: data.results,
            loading: false,
            searchTerm: '',
          })
        })
        .catch(this.onError)
    } else {
      this.debounceSearch(e)
    }
  }, 1000)

  handleKeyUp = (e) => {
    this.debounceSearch(e)
  }

  onError = (error) => {
    this.setState({
      error: true,
      loading: false,
      errorMessage: error.mesage,
    })
  }

  render() {
    const { movies, loading, error } = this.state
    const hasData = !(loading || error)
    const errorAlert = error ? <ErrorAlert /> : null
    const offlineAlert = <OfflineAlert />
    const spinner = loading ? (
      <>
        {/* <SearchArea handleSubmit={this.handleSubmit} handleKeyUp={this.handleKeyUp} /> */}
        <Spinner />
      </>
    ) : null
    const content = hasData ? (
      <>
        <SearchArea handleSubmit={this.handleSubmit} handleKeyUp={this.handleKeyUp} />
        <MovieList movies={movies} />
      </>
    ) : null

    return (
      <div className='app'>
        <Online>
          {errorAlert}
          {spinner}
          {content}
        </Online>
        <Offline>{offlineAlert}</Offline>
      </div>
    )
  }
}

export default App
