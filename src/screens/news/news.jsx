import React, { useState } from 'react'
import './style.css'
import Carousel from '../../components/carousel/carousel'
import BrowseNavbar from '../../components/browseNavbar.jsx/browseNavbar'
import { useEffect } from 'react'
import { APIGenreMovies, APIGenreSeries, APITopMovies, APITrendingMovies, APITrendingSeries, APITopSeries, APIMoviesToday, APISeriesToday } from '../../data/data'
import InfoFilm from '../../components/infoFilm/infoFilm'
import { useLocation, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'


const News = () => {

    const [newToday, setNewToday] = useState([])
    const [categoryTopMovie, setCategoryTopMovie] = useState([])
    const [categoryTopSeries, setCategoryTopSeries] = useState([])
    const [genreListMovies, setGenreListMovies] = useState([])
    const [genreListSeries, setGenreListSeries] = useState([])

    const [movieToday, setMovieToday] = useState([])
    const [serieToday, setSerieToday] = useState([])

    const { fid } = useParams()

    useEffect(() => {

        APITrendingMovies()
            .then(res => setNewToday(res))
            .catch(error => console.log(error))

        APITopMovies()
            .then(res => setCategoryTopMovie(res.results.slice(0, 10)))
            .catch(error => console.log(error))

        APIGenreMovies()
            .then(res => setGenreListMovies(res.genres))
            .catch(error => console.log(error))

        APIGenreSeries()
            .then(res => setGenreListSeries(res.genres))
            .catch(error => console.log(error))

        APITopSeries()
            .then(res => setCategoryTopSeries(res.results.slice(0, 10)))
            .catch(error => console.log(error))

        APIMoviesToday()
            .then(res => setMovieToday(res.results))
            .catch(error => console.log(error))

        APISeriesToday()
            .then(res => setSerieToday(res.results))
            .catch(error => console.log(error))

    }, [])



    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.2
            }}
            className='News'>
            <BrowseNavbar />
            <div className='News__carousels'>
                <Carousel categoryTitle={`What's new on Netflix`} id={1} categoryList={newToday} genreList={genreListMovies} />
                <Carousel categoryTitle={'10 Most Popular Movies'} id={2} categoryList={categoryTopMovie} genreList={genreListMovies} />
                <Carousel categoryTitle={'Movies released today'} id={3} categoryList={movieToday} genreList={genreListMovies} />
                <Carousel categoryTitle={'10 Most Popular Series'} id={4} categoryList={categoryTopSeries} genreList={genreListSeries} />
                <Carousel categoryTitle={'Series released today'} id={5} categoryList={serieToday} genreList={genreListSeries} />
            </div>
            <InfoFilm fid={fid} />
        </motion.div>
    )
}

export default News