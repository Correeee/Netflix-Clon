import React, { useState } from 'react'
import './style.css'
import Btn from '../button/button'
import logo from './assets/logo.png'
import play from './assets/play.png'
import info from './assets/info.png'
import soundOn from './assets/soundOn.png'
import soundOff from './assets/soundOff.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const BrowseBanner = (list) => {
    const navigate = useNavigate()

    const [sound, setSound] = useState(soundOn)
    const [trendingFilm, setTrendingFilm] = useState({})
    const { pathname } = useLocation()

    const handlerSound = () => {

        if (sound == soundOn) {
            setSound(soundOff)
        } else {
            setSound(soundOn)
        }

    }

    const handlerPlay = (id) => {
        navigate(`/player/${id}`)
    }

    useEffect(() => {
        if (list.list.length) {
            const randomIndex = Math.floor(Math.random() * list.list.length);
            const randomFilm = list.list[randomIndex];
            setTrendingFilm(randomFilm)

        }
    }, [list.list])

    const handlerInfo = () => {
        console.log(pathname)
        navigate(`${pathname}/${trendingFilm.id}`)
    }

    return (
        <div className='BrowseBanner' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${trendingFilm.backdrop_path})` }}>
            <div className='BrowseBanner__infoMovie'>
                <div className='BrowseBanner__infoMovieContainer'>
                    <div className='BrowseBanner__type'>
                        <img src={logo} alt="logo" className='BrowseBanner__logo' />
                        <h1>{trendingFilm.media_type == 'movie' ? 'Película' : 'Serie'}</h1>
                    </div>
                    <h2>{trendingFilm.original_title}</h2>
                    <h3>{trendingFilm.overview}</h3>
                    <div className='BrowseBanner__btns'>
                        <Btn text={'Reproducir'} id={'BrowseBannerBtnPlay'} width={'30rem'} color={'black'} fontSize={'2rem'} onclick={() => handlerPlay(trendingFilm.id)} imageSrc={play} />
                        <Btn text={'Más información'} id={'BrowseBannerBtnInfo'} width={'30rem'} fontSize={'2rem'} onclick={handlerInfo} imageSrc={info} />
                    </div>
                </div>
                <div className='BrowseBanner__movieOptions'>
                    <button onClick={handlerSound} style={{ display: trendingFilm.video == true ? 'flex' : 'none' }}><img src={sound} alt="sound" className='BrowseBanner__soundBtn' /></button>
                    <span>|</span>
                    <h2 className='BrowseBanner__movieAge'>{trendingFilm.adult == false ? '+13' : '+18'}</h2>
                </div>
            </div>

        </div>
    )
}

export default BrowseBanner