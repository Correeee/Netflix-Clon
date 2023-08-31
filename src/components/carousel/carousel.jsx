import React, { useRef } from 'react'
import './style.css'
import demo from './assets/demo.jpg'
import left from './assets/left.png'
import right from './assets/right.png'
import play from './assets/play.png'
import add from './assets/add.png'
import like from './assets/like.png'
import down from './assets/down.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { APIGeneresMovie, APIGeneresSeries, APITrendingMovies } from '../../data/data'
import PopUp from '../popUp/popUp'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import InfoFilm from '../infoFilm/infoFilm'


const Carousel = ({ categoryTitle, genreList, id, GENERE_ID, categoryList }) => {

    const [pages, setPages] = useState(1)
    const [actualPage, setActualPage] = useState(1)
    const [disabled, setDisabled] = useState(false)
    const [scrolling, setScrolling] = useState(false)
    const [list, setList] = useState([])

    const navigate = useNavigate()

    const { pathname } = useLocation()

    const visibleItems = 5

    const movieType = async () => { //BUSCAR POR PELICULA
        try {
            if (pathname.includes('browse') || pathname.includes('movies')) {
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

        if(list){
            const itemsLength = list.length
            const numberPages = Math.ceil(itemsLength / visibleItems)
            setPages(numberPages)
            movieType()
        }
        if(categoryList){
            const itemsLength = categoryList.length
            const numberPages = Math.ceil(itemsLength / visibleItems)
            setPages(numberPages)
            movieType()
        }


    }, [list.length, categoryList])


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
            if (film.media_type) {
                navigate(pathname + '/movies/' + film.id)
            } else {
                navigate(pathname + '/series/' + film.id)
            }
        }
        if (pathname.includes('browse') || pathname.includes('movies') || pathname.includes('series')) {
            navigate(`${pathname}/${film.id}`)
        }
    }

    const handlerPlay = (id) => {
        navigate(`/player/${id}`)
    }

    return (
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
                    list.length &&
                    list.map((li, i) => {
                        return (
                            <div className={`filmItem`} onMouseEnter={() => setDisabled(true)} onMouseLeave={() => setDisabled(false)} key={i}>
                                <div className='imgtitle'>
                                    <img src={`https://image.tmdb.org/t/p/w500${li.poster_path}`} className={`Carousel__item`} />
                                    <h3>{li.original_title || li.original_name}</h3>
                                </div>
                                <div className='Carousel__itemInfo'>
                                    <div className='Carousel__itemInfo-Btns'>
                                        <div className='Carousel__itemInfo-Btns1'>
                                            <button className='ItemButtons'>
                                                <img src={play} alt="Play" onClick={() => handlerPlay(li.id)} />
                                            </button>
                                            <button className='ItemButtons'>
                                                <img src={add} alt="AddList" />
                                                <PopUp text={'Add to My list'} />
                                            </button>
                                            <button className='ItemButtons'>
                                                <img src={like} alt="Like" />
                                                <PopUp text={'Like it'} />
                                            </button>
                                        </div>
                                        <div className='Carousel__itemInfo-Btns2'>
                                            <button className='ItemButtons' onClick={() => handlerInfo(li)}>
                                                <img src={down} alt="Down" />
                                                <PopUp text={'More information'} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='Carousel__itemInfo-Texts'>
                                        <h3>80% for you</h3>
                                        <h3>{li.adult ? '+18' : '+13'}</h3>
                                    </div>
                                    <div className='Carousel__itemInfo-Genere'>
                                        {
                                            li.genre_ids.slice(0, 3).map((gen, i) => {
                                                const title = genreList.map(genre => {
                                                    if (genre.id == gen) {
                                                        return genre.name
                                                    }
                                                })
                                                return (
                                                    <div className='titleContainer' key={i}>
                                                        <h3>{title}</h3>
                                                        <span></span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    categoryList &&
                    categoryList.map((li, i) => {
                        return (
                            <div className={`filmItem`} onMouseEnter={() => setDisabled(true)} onMouseLeave={() => setDisabled(false)} key={i}>
                                <div className='imgtitle'>
                                    <img src={`https://image.tmdb.org/t/p/w500${li.poster_path}`} className={`Carousel__item`} />
                                    <h3>{li.original_title || li.original_name}</h3>
                                </div>
                                <div className='Carousel__itemInfo'>
                                    <div className='Carousel__itemInfo-Btns'>
                                        <div className='Carousel__itemInfo-Btns1'>
                                            <button className='ItemButtons'>
                                                <img src={play} alt="Play" onClick={() => handlerPlay(li.id)} />
                                            </button>
                                            <button className='ItemButtons'>
                                                <img src={add} alt="AddList" />
                                                <PopUp text={'Add to My list'} />
                                            </button>
                                            <button className='ItemButtons'>
                                                <img src={like} alt="Like" />
                                                <PopUp text={'Like it'} />
                                            </button>
                                        </div>
                                        <div className='Carousel__itemInfo-Btns2'>
                                            <button className='ItemButtons' onClick={() => handlerInfo(li)}>
                                                <img src={down} alt="Down" />
                                                <PopUp text={'More information'} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='Carousel__itemInfo-Texts'>
                                        <h3>80% for you</h3>
                                        <h3>{li.adult ? '+18' : '+13'}</h3>
                                    </div>
                                    <div className='Carousel__itemInfo-Genere'>
                                        {
                                            li.genre_ids.slice(0, 3).map((gen, i) => {
                                                const title = genreList.map(genre => {
                                                    if (genre.id == gen) {
                                                        return genre.name
                                                    }
                                                })
                                                return (
                                                    <div className='titleContainer' key={i}>
                                                        <h3>{title}</h3>
                                                        <span></span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <button className='Carousel__arrow Carousel__arrow-left' id='arrowLeft' onClick={handlerArrowLeft} style={{ display: disabled ? 'none' : 'block' }} disabled={scrolling}><img src={left} alt="left" /></button>
            <button className='Carousel__arrow Carousel__arrow-right' id='arrowRight' onClick={handlerArrowRight} style={{ display: disabled ? 'none' : 'block' }} disabled={scrolling}><img src={right} alt="right" /></button>
        </div>
    )
}

export default Carousel