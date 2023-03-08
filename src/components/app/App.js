/* eslint-disable */
import React, { Component } from 'react'

import './App.css'

import MovieList from '../movie-list'
import MoviedbService from '../../services/moviedbService'
import { Online, Offline } from 'react-detect-offline'
import ErrorAlert from '../error-alert'
import OfflineAlert from '../offline-alert'
import Spinner from '../spinner'
import SearchArea from '../search-area'
import { debounce } from 'lodash'
import Pages from '../pages'

class App extends Component {
  MoviedbService = new MoviedbService()

  state = {
    movies: [],
    loading: false,
    searchTerm: '',
    error: false,
    currentPage: 1,
    totalResults: 0,
  }

  debounceSearch = debounce((e) => {
    this.setState({
      loading: true,
    })
    this.MoviedbService.getMovies(e.target.value, this.state.currentPage)
      .then((data) => {
        this.setState({
          movies: data.results,
          loading: false,
          searchTerm: e.target.value,
          totalResults: data.total_results,
          currentPage: 1
        })
      })
      .catch(this.onError)
  }, 2500)

  handleKeyUp = (e) => {
    this.debounceSearch(e)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  onPageChange = (page) => {
    this.setState({
      loading: true,
    })
    this.MoviedbService.getMovies(this.state.searchTerm, page)
      .then((data) => {
        this.setState({
          movies: data.results,
          loading: false,
          currentPage: page,
        })
      })
      .catch(this.onError)
  }

  render() {
    const { movies, loading, error, totalResults: totalPages, currentPage } = this.state
    const hasData = !(loading || error)
    const errorAlert = error ? <ErrorAlert /> : null
    const offlineAlert = <OfflineAlert />
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? (
      <>
        <Pages current={currentPage} totalPages={totalPages} onChange={this.onPageChange} />
        <MovieList movies={movies} />
        <Pages current={currentPage} totalPages={totalPages} onChange={this.onPageChange} />
      </>
    ) : null

    return (
      <div className='app'>
        <Online>
          <SearchArea handleSubmit={this.handleSubmit} handleKeyUp={this.handleKeyUp} />
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
