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

const Carousel = ({ categoryTitle, list, genreList, id }) => {

    const [pages, setPages] = useState(1)
    const [actualPage, setActualPage] = useState(1)
    const [disabled, setDisabled] = useState(false)

    const visibleItems = 5

    useEffect(() => {
        const itemsLength = list.length
        const numberPages = Math.ceil(itemsLength / visibleItems)
        setPages(numberPages)
    }, [list])

    useEffect(() => {

        const carouselPage = document.getElementsByClassName('Carousel__page');

        if (carouselPage) {
            for (let i = 0; i < carouselPage.length; i++) {
                const pageElement = carouselPage[i];
                if (pageElement.className.includes(actualPage)) {
                    pageElement.style.backgroundColor = 'var(--color-text)'
                } else {
                    pageElement.style.backgroundColor = 'var(--color-grey)'
                }
            }
        }
    }, [actualPage, list, genreList])


    const handlerArrowLeft = () => {
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

    }

    const handlerArrowRight = () => {

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
                            <div key={i} className={`Carousel__page Carousel__page-${i + 1}`}></div>
                        ))
                    }
                </div>

                {
                    list.map((li, i) => {
                        return (
                            <div className={`filmItem`} onMouseEnter={() => setDisabled(true)} onMouseLeave={() => setDisabled(false)} key={i}>
                                <div className='imgtitle'>
                                    <img src={`https://image.tmdb.org/t/p/w500${li.poster_path}`} className={`Carousel__item`} />
                                    <h3>{li.original_title}</h3>
                                </div>
                                <div className='Carousel__itemInfo'>
                                    <div className='Carousel__itemInfo-Btns'>
                                        <div className='Carousel__itemInfo-Btns1'>
                                            <button><img src={play} alt="Play" /></button>
                                            <button><img src={add} alt="AddList" /></button>
                                            <button><img src={like} alt="Like" /></button>
                                        </div>
                                        <div className='Carousel__itemInfo-Btns2'>
                                            <button><img src={down} alt="Down" /></button>
                                        </div>
                                    </div>
                                    <div className='Carousel__itemInfo-Texts'>
                                        <h3>80% para ti</h3>
                                        <h3>{li.adult ? '+18' : '+13'}</h3>
                                        <h3>{1}h {30} min</h3>
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
                                                    <div key={i}>
                                                        <h3>{title}</h3>
                                                        <span ></span>
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
            <button className='Carousel__arrow Carousel__arrow-left' id='arrowLeft' onClick={handlerArrowLeft} style={{ display: disabled ? 'none' : 'block' }}><img src={left} alt="left" /></button>
            <button className='Carousel__arrow Carousel__arrow-right' id='arrowRight' onClick={handlerArrowRight} style={{ display: disabled ? 'none' : 'block' }}><img src={right} alt="right" /></button>
        </div>
    )
}

export default Carousel