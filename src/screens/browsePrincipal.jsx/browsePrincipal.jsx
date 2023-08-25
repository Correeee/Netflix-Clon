import React from 'react'
import './style.css'
import BrowseNavbar from '../../components/browseNavbar.jsx/browseNavbar'
import BrowseBanner from '../../components/browseBanner/browseBanner'
import Carousel from '../../components/carousel/carousel'
import { APITrending, APIGenre } from '../../data/data'
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

    const [genreList, setGenreList] = useState([])
    const genre = async () => {
        try {
            const response = await APIGenre()
            setGenreList(response.genres)
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
            <BrowseBanner />
            <Carousel categoryTitle={`Películas en tendencia`} list={trending} genreList={genreList} id={1}/>
            <Carousel categoryTitle={`Películas en tendencia`} list={trending} genreList={genreList} id={2}/>
        </div>
    )
}

export default BrowsePrincipal