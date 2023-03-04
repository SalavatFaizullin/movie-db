import React from 'react'
import './Movie.css'
import { format } from 'date-fns'

function Movie(props) {
  const { title, date, image, overview } = props

  const formDate = date.split('-').join(', ')
  const finalDate = format(new Date('2020, 2, 2'), 'MMMM dd, yyyy')

  return (
    <div className='movie-card'>
      {image === null ? (
        <img
          className='movie-card__image'
          src='https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
          alt='movie poster'
        />
      ) : (
        <img className='movie-card__image' src={`https://image.tmdb.org/t/p/w185${image}`} alt='movie poster' />
      )}
      <div className='movie-card__info'>
        <h5 className='movie-card__title'>{title}</h5>
        <div className='movie-card__date'>{finalDate}</div>
        <div className='movie-card__genre'>
          <div>Action</div>
          <div>Drama</div>
        </div>
        <p className='movie-card__overview'>{overview}</p>
      </div>
    </div>
  )
}

export default Movie
