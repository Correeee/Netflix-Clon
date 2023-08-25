import React from 'react'
import './style.css'
import BrowseNavbar from '../../components/browseNavbar.jsx/browseNavbar'
import BrowseBanner from '../../components/browseBanner/browseBanner'
import Carousel from '../../components/carousel/carousel'
import { APITrending, APIGenre, APIGeneresMovie } from '../../data/data'
import { useState } from 'react'
import { useEffect } from 'react'

const BrowsePrincipal = () => {
    const ProfileName = 'Maxi'

    /* ------------------------------ TRENDINGLIST ------------------------------ */

    const [trending, setTrending] = useState([])
    const trendingList = async () => {
        try {
            const data = await APITrending()
            setTrending(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        trendingList()
    }, [])

    /* ------------------------------- GENRE LIST ------------------------------- */

    const [genreListMovie, setGenreListMovie] = useState([])
    const genre = async () => {
        try {
            const response = await APIGenre()
            setGenreListMovie(response.genres)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        genre()
    }, [])

    return (
        <div className='BrowsePrincipal'>
            <BrowseNavbar />
            <BrowseBanner list={trending}/>
            <Carousel categoryTitle={`Películas en tendencia`} list={trending} genreListMovie={genreListMovie} id={9999999} />
            {
                genreListMovie.map((genere, i) => {
                    const GENERE_ID = genere.id
                    return (
                        <Carousel categoryTitle={genere.name} genreListMovie={genreListMovie} id={i} GENERE_ID={GENERE_ID} key={i}/>
                    )
                })
            }
        </div>
    )
}

export default BrowsePrincipal