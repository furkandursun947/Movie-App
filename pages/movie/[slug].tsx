import React, { useEffect, useState } from 'react'
import { client } from '../../sanity';
const BlockContent = require('@sanity/block-content-to-react')
import {useForm, SubmitHandler} from 'react-hook-form'

import { Comment, Movie, Person } from '../../typings'
import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import { imageBuilder } from '../../sanity.js'
import Movies from '../../components/MoviesPage';

interface Props {
    movie: Movie;
}

interface IFormInput {
    _id: string,
    name: string,
    comment: string,
}


function MovieDetails({movie}: Props) {
    const [submitted, setSubmitted] = useState(false);
    var crewMembers : Person[];
    var castMembers: Person[];
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>();
    console.log(movie)

    

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data),

        }).then(() => {setSubmitted(true)})
        .catch((err) => {
            console.log(err);
            setSubmitted(false);
        })
        
    }
    const getDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    }
  return (
    <main>
        <Header/>
        <div className='mx-auto max-w-screen-2xl px-3 py-5 md:py-16 md:px-16'>
            <div className='mt-10 h-auto p-4 sm:p-14 flex border shadow-md shadow-orange-700'>
                <img src={imageBuilder(movie.poster).url()!} alt="movieimage" className='w-64 rounded-lg'/>
                <div className=''>
                    <div className='text-center'>
                        <h3 className='font-extrabold text-2xl'>{movie.title}</h3>
                    </div>
                    <div className='p-10'>
                        <BlockContent
                            blocks={movie.overview}
                            />
                        <div className='flex justify-center space-x-10 py-5'>
                            <div className='flex'>
                                <h3 className='font-bold'>Popularity </h3> <span>: {movie.popularity}</span>
                            </div>
                            <div className='flex'>
                                <h3 className='font-bold'>Release Date </h3> <span>: { getDate(movie.releaseDate) }</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='mt-10 sm:p-14 p-4 border shadow-md shadow-orange-700'>
                <div className='block text-center'>
                    <h3 className=' font-extrabold text-2xl '> Cast Members </h3>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-6 sm:grid-cols-3 lg:grid-cols-8 relative mt-10'>
                    {movie.castMembers.map((member) => (
                        <div className='m-1 border rounded-lg overflow-hidden group'>
                            <img className='h-28 w-full rounded-lg object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={member.person.image ? imageBuilder(member.person.image).url()!:'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'} alt="personImage"/> 
                            <div className='px-5 py-3'>
                                {member.person.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-10 sm:p-14 p-4 border shadow-md shadow-orange-700'>
                <div className='block text-center'>
                    <h3 className=' font-extrabold text-2xl '> Crew Members </h3>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-6 sm:grid-cols-3 lg:grid-cols-8 relative mt-10'>
                    {movie.crewMembers.map((member) => (
                        <div className='m-1 border rounded-lg overflow-hidden group'>
                            <img className='h-28 w-full rounded-lg object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={member.person.image ? imageBuilder(member.person.image).url()!:'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'} alt="personImage"/> 
                            <div className='px-5 py-3'>
                                {member.person.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-10 sm:p-14 p-4 border shadow-md shadow-orange-700'>
                {/* Comment Section */}
                <div className='block text-center'>
                    <h3 className=' font-extrabold text-2xl '> Comments </h3>
                </div>
                <hr className='max-w-lg my-5 mx-auto border border-orange-700'/>
                <div className=''>
                    {movie.comment.length == 0 ? (
                        <div className='text-orange-700 font-bold'>
                            - There is no comment to show.
                        </div>
                    ):(
                        movie.comment.map((comment: Comment) => (
                            <div className='flex space-x-2 mt-3 justify-between'>
                                <div>
                                <span className='text-orange-700'>{comment.name}: </span>
                                <span> {comment.comment}</span>
                                </div>
                                <div className='text-xs items-center flex text-gray-600'>
                                    {getDate(comment._createdAt)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <hr className='max-w-screen-xl my-5 mx-auto border border-orange-700'/>
                {submitted ? (
                    <div className='flex flex-col p-10 my-10 bg-orange-700 text-white max-w-screen-xl mx-auto'>
                        <h3 className='text-3xl font-bold'>
                            Thank you for submitting.
                        </h3>
                        <p>
                            Once it has been approved, it will appear above!
                        </p>
                    </div>
                ):(
                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col p-5 max-w-2xl mx-auto mb-10">
                    <h4 className='text-xl font-bold'>Leave a comment below!</h4>
                    <input
                        {...register("_id")}
                        type="hidden"
                        name="_id"
                        value={movie._id}
                        />
                    <label className='block mb-5'>
                    <span className='text-gray-700'>
                        Name
                    </span>
                    <input {...register("name", {required: true})} className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring ' placeholder='John Appleseed' type="text" />
                    </label>
                    <label className='block mb-5'>
                        <span className='text-gray-700'>
                            Comment
                        </span>
                        <textarea {...register("comment", {required: true})} className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring ' placeholder='John Appleseed' rows={8} />
                    </label>

                    <div className='flex flex-col p-5'>
                        {errors.name && (<span className='text-red-500'>- The Name Field is required</span>)}
                        {errors.comment && (<span className='text-red-500'>- The Comment Field is required</span>)}

                    </div>
                    <input type="submit" className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer' />
                </form>
                )}
                
            </div>
        </div>
    </main>
  )
}


export default MovieDetails;



export const getStaticPaths =async () => {
    const query = `
        *[_type == 'post']{
            _id,
            slug {
                current
            }
        }
    `
    const movies = await client.fetch(query);
    const paths = movies.map((movie:Movie) => ({
        params: {
            slug: movie.slug.current,
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps =async ({params}) => {
    const query = `
    *[_type == 'movie' && slug.current == $slug][0]{
        _id,
        title,
        releaseDate,
        popularity,
        "crewMembers": crewMembers[]{
            department,
            externalId,
            job,
            "person": person->
        },
        "castMembers": castMembers[]{
            characterName,
            externalId,
            "person": person->
        },
        'comment': *[_type == "comment" && movie._ref == ^._id && approved==true],
        overview,
        poster,
        slug,
        body
    }
    `
    const movie: Movie = await client.fetch(query, {
        slug: params?.slug,
    });


    


    console.log(movie)

    if(!movie){
        return{
            notFound: true
        }
    }

    return {
        props:{
            movie,
        },
        revalidate: 60, // after 60 sec update old cached version
    }

}

