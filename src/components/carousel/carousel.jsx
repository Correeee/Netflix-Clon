import React from 'react'
import './style.css'
import demo from './assets/demo.jpg'
import left from './assets/left.png'
import right from './assets/right.png'

const Carousel = ({ categoryTitle, id }) => {


    const handlerArrowLeft = () => {
        const slider = document.getElementById(`slider-${id}`)
        slider.scrollBy(-slider.offsetWidth, 0)
    }

    const handlerArrowRight = () => {
        const slider = document.getElementById(`slider-${id}`)
        slider.scrollBy(slider.offsetWidth, 0)
    }

    return (
        <div className='Carousel'>
            <div className='Carousel__title'>
                <h2>{categoryTitle}<h3>Explorar todos</h3></h2>
            </div>
            <div className='Carousel__container' id={`slider-${id}`}>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
                <img src={demo} className='Carousel__item'></img>
            </div>
            <button className='Carousel__arrow Carousel__arrow-left' id='arrowLeft' onClick={handlerArrowLeft}><img src={left} alt="left" /></button>
            <button className='Carousel__arrow Carousel__arrow-right' id='arrowRight' onClick={handlerArrowRight}><img src={right} alt="right" /></button>
        </div>
    )
}

export default Carousel