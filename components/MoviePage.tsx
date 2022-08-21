import React from 'react'
import { Movie } from '../typings'
import { imageBuilder } from '../sanity.js'


interface Props {
    movie: Movie;
}



function Movie({movie}: Props) { // eslint-disable-line
    const getDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    }
    return (
    <div className='border cursor-pointer rounded-lg overflow-hidden group'>
        <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={imageBuilder(movie.poster).url()!} alt="movieImage"/>
        <div className='flex justify-between items-center p-5'>
            <h3 className='font-bold'>
                {movie.title}
            </h3>
            <h4 className='font-light'>
                { getDate(movie.releaseDate) }
            </h4>
        </div>
    </div>
  )
}

export default Movie