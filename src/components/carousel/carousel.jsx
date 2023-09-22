import React, { useContext, useRef } from 'react'
import './style.css'
import left from './assets/left.png'
import right from './assets/right.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { APIGeneresMovie, APIGeneresSeries, APITrendingMovies } from '../../data/data'
import PopUp from '../popUp/popUp'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { doc, getDoc, getDocs, updateDoc } from '@firebase/firestore'
import { db } from '../../firebase/firebase'
import FilmItem from '../filmItem/filmItem'
import { addToLike, addToList, getProfileData } from '../../data/userFn'


const Carousel = ({ categoryTitle, genreList, id, GENERE_ID, categoryList }) => {

    const { userData, selectedProfile, setSelectedProfile, setUserData } = useContext(AuthContext)


    const [pages, setPages] = useState(1)
    const [actualPage, setActualPage] = useState(1)
    const [disabled, setDisabled] = useState(false)
    const [scrolling, setScrolling] = useState(false)
    const [list, setList] = useState([])

    const navigate = useNavigate()

    const { pathname } = useLocation()

    const visibleItems = 5

    useEffect(() => {

    }, [list, categoryList])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const movieType = async () => { //BUSCAR POR PELICULA
        try {
            if (pathname.includes('browse')) {
                let responseMovies = await APIGeneresMovie(GENERE_ID)
                let responseSeries = await APIGeneresSeries(GENERE_ID)
                responseMovies = responseMovies.results
                responseSeries = responseSeries.results
                const allTypeFilm = responseMovies.concat(responseSeries)
                setList(allTypeFilm)
            }
            if (pathname.includes('movies')) {
                const response = await APIGeneresMovie(GENERE_ID)
                setList(response.results)
            }
            if (pathname.includes('series')) {
                const response = await APIGeneresSeries(GENERE_ID)
                setList(response.results)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        movieType()
    }, [])



    useEffect(() => {

        if (list) {
            const itemsLength = list.length
            const numberPages = Math.ceil(itemsLength / visibleItems)
            setPages(numberPages)
            movieType()
        }
        if (categoryList) {
            const itemsLength = categoryList.length
            const numberPages = Math.ceil(itemsLength / visibleItems)
            setPages(numberPages)
            movieType()
        }

    }, [list.length, categoryList, pathname])


    useEffect(() => {
        const carouselId = document.getElementsByClassName(`Carousel__page-id${id}`)
        if (carouselId) {
            for (let i = 0; i < carouselId.length; i++) {
                const pageElement = carouselId[i];
                if (pageElement.classList[2].includes(actualPage)) {
                    pageElement.style.backgroundColor = 'var(--color-text)'
                } else {
                    pageElement.style.backgroundColor = 'var(--color-grey)'
                }
            }
        }

    }, [actualPage, pages])


    const handlerArrowLeft = (e) => {
        setScrolling(true)
        const slider = document.getElementById(`slider-${id}`)
        const offsetWidth = slider.offsetWidth

        if (actualPage != 1) {
            slider.scrollLeft -= offsetWidth
            setActualPage(actualPage - 1)
        }

        if (actualPage == 1) {
            slider.scrollTo(slider.scrollWidth, 0)
            setActualPage(pages)
        }

        setTimeout(() => {
            setScrolling(false)
        }, 1000);

    }

    const handlerArrowRight = () => {
        setScrolling(true)
        const slider = document.getElementById(`slider-${id}`)
        const offsetWidth = slider.offsetWidth

        if (actualPage != pages) {
            slider.scrollLeft += offsetWidth
            setActualPage(actualPage + 1)
        }

        if (actualPage == pages) {
            slider.scrollTo(0, 0)
            setActualPage(1)
        }
        setTimeout(() => {
            setScrolling(false)
        }, 1000);
    }

    const handlerInfo = (film) => {

        if (pathname.includes('news')) {
            if (film.media_type == "movie" || !film.first_air_date) {
                navigate(pathname + '/movies/' + film.id)
            } else {
                navigate(pathname + '/series/' + film.id)
            }
        }
        
        if (pathname.includes('browse') || pathname.includes('movies') || pathname.includes('series')) {
            navigate(`${pathname}/${film.id}`)
        }

    }

    const handlerPlay = (film) => {
        if (pathname.includes('browse') || pathname.includes('movies')) {
            navigate(`/movies/player/${film.id}`)
        }
        if (pathname.includes('series')) {
            navigate(`/series/player/${film.id}`)
        }
        if (pathname.includes('news')) {
            if (film.media_type == "movie" || !film.first_air_date) {
                navigate(`/news/movies/player/${film.id}`)
            }
            if (film.first_air_date || film.media_type == "tv") {
                navigate(`/news/series/player/${film.id}`)
            }
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

    return (
        <>
            {
                list &&
                <div className='Carousel'>
                    <div className='Carousel__container' id={`slider-${id}`} >
                        <div className='Carousel__pages'>
                            <div className='Carousel__title'>
                                <h2>{categoryTitle}<span>Explorar todos</span></h2>
                            </div>
                            {
                                Array.from({ length: pages }).map((_, i) => (
                                    <div key={i} className={`Carousel__page Carousel__page-id${id} Carousel__page-${i + 1}`}></div>
                                ))
                            }
                        </div>

                        {
                            list.length && !pathname.includes('news') ?
                                list.map((li, i) => {
                                    return (
                                        <FilmItem film={li} key={i} setDisabled={setDisabled} genreList={genreList} handlerPlay={handlerPlay} handlerInfo={handlerInfo} handlerLike={() => handlerLike(li)} handlerList={() => handlerList(li)} />
                                    )
                                })
                                :
                                null
                        }
                        {
                            categoryList ?
                                categoryList.map((li, i) => {
                                    return (
                                        <FilmItem film={li} key={i} setDisabled={setDisabled} genreList={genreList} handlerPlay={handlerPlay} handlerInfo={handlerInfo} handlerLike={() => handlerLike(li)} handlerList={() => handlerList(li)} />
                                    )
                                })
                                :
                                null
                        }
                    </div>
                    <button className='Carousel__arrow Carousel__arrow-left' id='arrowLeft' onClick={handlerArrowLeft} style={{ display: disabled ? 'none' : 'block' }} disabled={scrolling}><img src={left} alt="left" /></button>
                    <button className='Carousel__arrow Carousel__arrow-right' id='arrowRight' onClick={handlerArrowRight} style={{ display: disabled ? 'none' : 'block' }} disabled={scrolling}><img src={right} alt="right" /></button>
                </div>
            }
        </>
    )
}

export default Carousel