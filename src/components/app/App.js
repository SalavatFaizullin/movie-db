/* eslint-disable */
import React, { Component } from 'react'

import './App.css'

import MovieList from '../movie-list'
import MoviedbService from '../../services/moviedbService'
import { Online, Offline } from 'react-detect-offline'
import { Alert } from 'antd'
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
    totalResults: 0,
    currentPage: 1,
    isFound: true
  }

  search = debounce((e) => {
    this.setState({
      loading: true,
    })
    this.MoviedbService.getMovies(e.target.value, 1)
      .then((data) => {
        const isFound = data.results.length
        this.setState({
          movies: data.results,
          loading: false,
          searchTerm: e.target.value,
          totalResults: data.total_results,
          currentPage: 1,
          isFound: isFound
        })
      })
      .catch(this.onError)
  }, 2500)

  handleKeyUp = (e) => {
    this.search(e)
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
    const { movies, loading, error, totalResults: totalPages, currentPage, isFound } = this.state

    const hasData = !(loading || error)

    const nothingFoundAlert = isFound ? null : (
      <div className='alert-message'>
        <Alert message='Sorry, nothing was found on your request. Please, try again.' type='info' showIcon />
      </div>
    )
    const errorAlert = error ? (
      <div className='alert-message'>
        <Alert
          message={`Sorry, something went wrong. We're working on it right now. Please, come back later.`}
          type='error'
          showIcon
        />
      </div>
    ) : null
    const offlineAlert = (
      <div className='alert-message'>
        <Alert message="You're offline. Please, check your connection." type='error' showIcon />
      </div>
    )

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
          <SearchArea handleKeyUp={this.handleKeyUp} />
          {nothingFoundAlert}
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
