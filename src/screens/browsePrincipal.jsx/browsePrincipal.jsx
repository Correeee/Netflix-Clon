import React from 'react'
import './style.css'
import BrowseNavbar from '../../components/browseNavbar.jsx/browseNavbar'
import BrowseBanner from '../../components/browseBanner/browseBanner'
import Carousel from '../../components/carousel/carousel'
import { APITrendingMovies, APIGenreMovies, APIGeneresMovie, APITrendingSeries, APITrendingAll, APIGenreSeries } from '../../data/data'
import { useState } from 'react'
import { useEffect } from 'react'
import InfoFilm from '../../components/infoFilm/infoFilm'
import { useLocation, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollToTop from '../../components/scrollToTop/scrollToTop'



const BrowsePrincipal = () => {
    const ProfileName = 'Maxi'
    const { pathname } = useLocation()

    const { fid } = useParams()

    useEffect(() => {
        document.querySelector('body').classList.remove('hiddenBody')
    }, [])


    /* ------------------------------ TRENDINGLIST ------------------------------ */

    const [trending, setTrending] = useState([])
    const listingFilms = async () => {
        try {

            if (pathname.includes('browse') || pathname.includes('movies')) {
                const data = await APITrendingMovies()
                setTrending(data)
            }

            if (pathname.includes('series')) {
                const data = await APITrendingSeries()
                setTrending(data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        listingFilms()
    }, [pathname])

    /* ------------------------------- GENRE LIST ------------------------------- */

    const [genreList, setGenreList] = useState([])
    const genre = async () => {
        try {

            if (pathname.includes('browse') || pathname.includes('movies')) {
                const response = await APIGenreMovies()
                setGenreList(response.genres)
            }

            if (pathname.includes('series')) {
                const response = await APIGenreSeries()
                setGenreList(response.genres)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        genre()
    }, [pathname])

    useEffect(() => {

    }, [fid])



    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.2
            }}
            className='BrowsePrincipal' >
            <ScrollToTop />
            <BrowseNavbar />
            <BrowseBanner list={trending} />
            {
                pathname.includes('browse') || pathname.includes('movies') ?
                    <Carousel categoryTitle={`Trending Movies`} list={trending} genreList={genreList} id={9999999} />
                    :
                    <Carousel categoryTitle={`Trending Series`} list={trending} genreList={genreList} id={9999999} />
            }

            {
                genreList.map((genere, i) => {
                    const GENERE_ID = genere.id
                    return (
                        <Carousel categoryTitle={genere.name} genreList={genreList} id={i} GENERE_ID={GENERE_ID} key={i} />
                    )
                })
            }
            <InfoFilm fid={fid} />
        </motion.div>
    )
}

export default BrowsePrincipal