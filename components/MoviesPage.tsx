import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Movie } from '../typings'
import { imageBuilder } from '../sanity.js'


interface Props {
    movies: [Movie];
}

function compare(a:any,b:any)
{
    if ( a < b ){
        return -1;
      }
      if ( a > b ){
        return 1;
      }
      return 0;
}

function Movies({movies}: Props) {
    const getDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    }



    

  return (
    <div className='space-y-10'>
        

        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {movies?.map((movie) => (
                <Link href={`/movie/${movie.slug.current}`} key={movie._id}>
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
                </Link>
            ))}
        </div>
        
    </div>
  )
}

export default Movies