import React, { useContext, useState } from 'react'
import './style.css'
import play from './assets/play.png'
import add from './assets/add.png'
import like from './assets/like.png'
import down from './assets/down.png'
import OK from './assets/ok.png'
import PopUp from '../popUp/popUp'
import { useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import { getProfileData } from '../../data/userFn'
import { useTranslation } from 'react-i18next'


const FilmItem = ({ film, setDisabled, genreList, handlerPlay, handlerInfo, handlerLike, handlerList, position }) => {

    const [inList, setInList] = useState(false)
    const [inLikes, setInLikes] = useState(false)
    const [imageList, setImageList] = useState(false)
    const { selectedProfile, setSelectedProfile, userData, setUserData } = useContext(AuthContext)
    const { t } = useTranslation(["lang"])

    const isInList = async (film) => {
        try {
            const filmInList = selectedProfile.list.filter((li) => li.id == film.id)
            if (filmInList.length) {
                setInList(true)
                setImageList(true)
            } else {
                setInList(false)
                setImageList(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const isInLikes = (film) => {
        const filmInList = selectedProfile.likes.filter((li) => li.id == film.id)
        if (filmInList.length) {
            setInLikes(true)
        } else {
            setInLikes(false)
        }
    }

    useEffect(() => {
        isInList(film)
        isInLikes(film)
    }, [selectedProfile])


    return (
        <>
            {
                film &&
                <div className={`filmItem`} onMouseEnter={() => setDisabled(true)} onMouseLeave={() => setDisabled(false)}>
                    <div className='imgtitle' onClick={() => handlerInfo(film)}>
                        <img src={film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : `https://image.tmdb.org/t/p/w500${film.backdrop_path}`} className={`Carousel__item`} />
                        <h3>{film.title || film.name || film.original_title || film.original_name}</h3>
                    </div>
                    <div className='Carousel__itemInfo' style={{ position: position }}>
                        <div className='Carousel__itemInfo-Btns'>
                            <div className='Carousel__itemInfo-Btns1'>
                                <button className='ItemButtons'>
                                    <img src={play} alt="Play" onClick={() => handlerPlay(film)} />
                                </button>
                                <button className='ItemButtons' onClick={() => {
                                    handlerList(film)
                                }} style={{ backgroundColor: inList && '#40BA5E', borderColor: inList && '#40BA5E' }}>
                                    <img src={imageList ? OK : add} alt="AddList" />
                                    <PopUp text={!inList ? t("ADD_LIST") : t("REMOVE_LIST")} textColor={inList && 'var(--color-primary)'} />
                                </button>
                                <button className='ItemButtons' onClick={() => {
                                    handlerLike(film)
                                }} style={{ backgroundColor: inLikes && '#40BA5E', borderColor: inLikes && '#40BA5E' }}>
                                    <img src={like} alt="Like" />
                                    <PopUp text={!inLikes ? t("LIKE_IT") : t("DONT_LIKE_IT")} textColor={inLikes && 'var(--color-primary)'} />
                                </button>
                            </div>
                            <div className='Carousel__itemInfo-Btns2'>
                                <button className='ItemButtons' onClick={() => handlerInfo(film)}>
                                    <img src={down} alt="Down" />
                                    <PopUp text={t("MORE_INFORMATION")} />
                                </button>
                            </div>
                        </div>
                        <div className='Carousel__itemInfo-Texts'>
                            <h3>80%{t("FOR_YOU")}</h3>
                            <h3>{film.adult ? '+18' : '+13'}</h3>
                        </div>
                        <div className='Carousel__itemInfo-Genere'>
                            {
                                genreList && film.genre_ids && film.genre_ids.slice(0, 3).map((gen, i) => {
                                    const title = genreList.map(genre => {
                                        if (genre.id == gen) {
                                            return genre.name
                                        }
                                    })
                                    if (i == film.genre_ids.length - 1) { //Si es el último género no agrega SPAN.
                                        return (
                                            <div className='titleContainer' key={i}>
                                                <h3>{title}</h3>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className='titleContainer' key={i}>
                                                <h3>{title}</h3>
                                                <span></span>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FilmItem