import React, { useState } from 'react'
import './style.css'
import Btn from '../button/button'
import logo from './assets/logo.png'
import soundOn from './assets/soundOn.png'
import soundOff from './assets/soundOff.png'
import { useNavigate } from 'react-router-dom'

const BrowseBanner = () => {

    const navigate = useNavigate()

    const [sound, setSound] = useState(soundOn)

    const handlerSound = () => {

        if (sound == soundOn) {
            setSound(soundOff)
        } else {
            setSound(soundOn)
        }

    }

    const handlerPlay = () => {
        navigate('/player')
    }


    return (
        <div className='BrowseBanner'>
            <div className='BrowseBanner__infoMovie'>
                <div className='BrowseBanner__infoMovieContainer'>
                    <div className='BrowseBanner__type'>
                        <img src={logo} alt="logo" className='BrowseBanner__logo' />
                        <h1>SERIE</h1>
                    </div>
                    <h2>PELICULA</h2>
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quos fugiat ea blanditiis animi libero sed nostrum odio accusamus minus.</h3>
                    <div className='BrowseBanner__btns'>
                        <Btn text={'Reproducir'} id={'BrowseBannerBtnPlay'} width={'30rem'} color={'black'} fontSize={'2rem'} onclick={handlerPlay} />
                        <Btn text={'Más información'} id={'BrowseBannerBtnInfo'} width={'30rem'} fontSize={'2rem'} />
                    </div>
                </div>
                <div className='BrowseBanner__movieOptions'>
                    <button onClick={handlerSound}><img src={sound} alt="sound" className='BrowseBanner__soundBtn' /></button>
                    <span>|</span>
                    <h2 className='BrowseBanner__movieAge'>16+</h2>
                </div>
            </div>

        </div>
    )
}

export default BrowseBanner