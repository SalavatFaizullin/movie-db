import React from 'react'
import nextId from 'react-id-generator'

import Movie from '../movie'
import './MovieList.css'

function MovieList(props) {
  const { movies } = props
  return (
    <div className='movie-list'>
      {movies.map((movie) => {
        const { original_title: title, poster_path: poster, release_date: date, overview } = movie
        return <Movie title={title} image={poster} date={date} overview={overview} key={nextId()} />
      })}
    </div>
  )
}

export default MovieList
