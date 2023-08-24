import React, { useRef } from 'react'
import './style.css'
import demo from './assets/demo.jpg'
import left from './assets/left.png'
import right from './assets/right.png'
import { useState } from 'react'
import { useEffect } from 'react'

const Carousel = ({ categoryTitle, id }) => {

    const [pages, setPages] = useState(1)
    const [actualPage, setActualPage] = useState(1)

    useEffect(() => {
        const itemsLength = document.getElementsByClassName(`Carousel__item-${id}`).length
        const numberPages = Math.ceil(itemsLength / 5)
        setPages(numberPages)
    }, [])

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
    }, [actualPage])


    const handlerArrowLeft = () => {
        const slider = document.getElementById(`slider-${id}`)
        const offsetWidth = slider.offsetWidth

        if (actualPage != 1) {
            slider.scrollLeft -= offsetWidth
            setActualPage(actualPage - 1)
        }

        if(actualPage == 1){
            slider.scrollTo(slider.scrollWidth, 0 ) 
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

        if(actualPage == pages){
            slider.scrollTo(0, 0 )
            setActualPage(1)
        }
    }

    return (
        <div className='Carousel'>
            <div className='Carousel__title'>
                <h2>{categoryTitle}<h3>Explorar todos</h3></h2>
            </div>
            <div className='Carousel__container' id={`slider-${id}`}>
                <div className='Carousel__pages'>
                    {
                        Array.from({ length: pages }).map((_, i) => (
                            <div key={i} className={`Carousel__page Carousel__page-${i + 1}`}></div>
                        ))
                    }
                </div>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>
                <img src={demo} className={`Carousel__item Carousel__item-${id}`}></img>

            </div>
            <button className='Carousel__arrow Carousel__arrow-left' id='arrowLeft' onClick={handlerArrowLeft}><img src={left} alt="left" /></button>
            <button className='Carousel__arrow Carousel__arrow-right' id='arrowRight' onClick={handlerArrowRight}><img src={right} alt="right" /></button>
        </div>
    )
}

export default Carousel