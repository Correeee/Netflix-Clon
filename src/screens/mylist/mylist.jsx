import React, { useContext, useState } from 'react'
import './style.css'
import BrowseNavbar from '../../components/browseNavbar.jsx/browseNavbar'
import { motion } from 'framer-motion'
import ScrollToTop from '../../components/scrollToTop/scrollToTop'
import { AuthContext } from '../../context/authContext'
import Login from '../login/login'
import Profiles from '../profiles/profiles'
import { useEffect } from 'react'
import FilmItem from '../../components/filmItem/filmItem'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, getDocs, updateDoc } from '@firebase/firestore'
import { db } from '../../firebase/firebase'
import InfoFilm from '../../components/infoFilm/infoFilm'
import { APIGenreMovies, APIGenreSeries } from '../../data/data'
import { addToLike, addToList, getProfileData } from '../../data/userFn'


const MyList = () => {
    const { isLogin, setSelectedProfile, selectedProfile, userData } = useContext(AuthContext)
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate()

    const { pathname } = useLocation()
    const { fid } = useParams()

    useEffect(() => {
        getProfileData(userData, selectedProfile)
            .then(res => setSelectedProfile(res))
            .catch(error => console.log(error))
    }, [])


    useEffect(() => {

    }, [userData])




    const handlerInfo = (film) => {
        if (film.first_air_date) {
            navigate(`/mylist/series/${film.id}`)
        } else {
            navigate(`/mylist/movies/${film.id}`)
        }
    }

    const handlerPlay = (film) => {

        if (film.first_air_date) {
            navigate(`/mylist/series/player/${film.id}`)
        } else {
            navigate(`/mylist/movies/player/${film.id}`)
        }

    }


    const handlerList = async (film) => {
        try {
            await addToList(film, userData, selectedProfile)
            const response = await getProfileData(userData, selectedProfile)
            setSelectedProfile(response)
        } catch (error) {
            console.log(error)
        }
    }


    const handlerLike = async (film) => {
        try {
            await addToLike(film, userData, selectedProfile)
            const response = await getProfileData(userData, selectedProfile)
            setSelectedProfile(response)
        } catch (error) {
            console.log(error)
        }
    }

    const [genreMovies, setGenreMovies] = useState()
    const [genreSeries, setGenreSeries] = useState()

    const genre = async () => {
        try {

            const responseMovies = await APIGenreMovies()
            setGenreMovies(responseMovies.genres)

            const responseSeries = await APIGenreSeries()
            setGenreSeries(responseSeries.genres)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        genre()
    }, [])


    return (
        <>
            {
                isLogin ?
                    <>
                        {
                            !selectedProfile ?
                                <Profiles />
                                :
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.2
                                    }}
                                    className='MyList'>
                                    <BrowseNavbar />
                                    <div className='MyList__container'>
                                        <h1>My List</h1>
                                        <div className='MyList__containerFilms'>
                                            {
                                                selectedProfile.list.length && selectedProfile.list.map((film, i) => {
                                                    if (film.original_title) {
                                                        return (
                                                            <FilmItem film={film} key={i} setDisabled={setDisabled} genreList={genreMovies} handlerPlay={handlerPlay} handlerInfo={handlerInfo} handlerLike={() => handlerLike(film)} handlerList={() => handlerList(film)} position={"absolute"}/>
                                                        )
                                                    } else {
                                                        return (
                                                            <FilmItem film={film} key={i} setDisabled={setDisabled} genreList={genreSeries} handlerPlay={handlerPlay} handlerInfo={handlerInfo} handlerLike={() => handlerLike(film)} handlerList={() => handlerList(film)} position={"absolute"}/>
                                                        )
                                                    }

                                                })
                                            }
                                        </div>
                                    </div>
                                </motion.div>
                        }
                    </>
                    :
                    <Login />
            }
            <InfoFilm fid={fid} />
        </>
    )
}

export default MyList