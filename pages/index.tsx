import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header';
import MoviesPage from '../components/MoviesPage'
import {client} from '../sanity.js'
import { Movie } from '../typings';



interface Props {
    movies: [Movie];
}


export default function Home ({movies}: Props){
    if (typeof window === 'undefined') {
        return <></>;
    }
    else{
        return (
        <div className="">
            <Head>
            <title>Movies</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='mx-auto max-w-screen-2xl flex px-3 py-5 md:py-16 md:px-16 '>
                <MoviesPage movies={movies}/>
            </div>
            
        </div>
        )
    }

}


export const getServerSideProps = async () => {
    const query = `
    *[_type == 'movie']{
        _id,
        title,
        releaseDate,
        popularity,
        'comment': *[_type == "comment" && movie._ref == ^._id && approved==true],
        poster,
        slug
    }
    `
    const movies = await client.fetch(query);
    return {
        props:{
            movies
        }
    }
}


