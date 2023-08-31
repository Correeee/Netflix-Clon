import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import play from './assets/play.png'
import back10 from './assets/back10.png'
import forward10 from './assets/back10.png'
import soundOn from './assets/soundOn.png'
import soundOff from './assets/soundOff.png'
import language from './assets/language.png'
import velocity from './assets/velocity.png'
import fullScreen from './assets/fullScreen.png'
import forward from './assets/forward.png'
import chapters from './assets/chapters.png'
import back from './assets/back.png'
import pause from './assets/pause.png'
import configuration from './assets/configuration.png'
import { useNavigate, useParams } from 'react-router-dom'
import { APISearchMovieForId } from '../../data/data'
import Loader from '../../components/loader/loader'

const Player = () => {

    const { fid } = useParams()

    const [film, setFilm] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        APISearchMovieForId(fid)
            .then(res => setFilm(res))
            .catch(error => console.log(error))
    }, [fid])



    const navigate = useNavigate()
    const configRef = useRef(null)

    const [playing, setPlaying] = useState(true)
    const [playMovie, setPlayMovie] = useState(play)
    const [sound, setSound] = useState(soundOn)
    const [volume, setVolume] = useState(100)
    const [full, setFull] = useState(false)

    const [disabledButton, setDisabledButton] = useState(false)

    const [rangeValue, setRangeValue] = useState(50)

    const [isMovie, setIsMovie] = useState(false)

    const handlerPlay = () => {
        if (playing) {
            setPlaying(false)
            setPlayMovie(pause)
        } else {
            setPlaying(true)
            setPlayMovie(play)
        }
    }

    const handlerSound = () => {

        if (sound === soundOn) {
            setSound(soundOff)
            setVolume(0)
        } else {
            setSound(soundOn)
            setVolume(100)
        }

    }

    const handlerFullScreen = () => {
        const app = document.getElementById('App')

        if (!full) {
            setFull(true)
            app.requestFullscreen()
        } else {
            setFull(false)
            document.exitFullscreen()
        }
    }

    const handlerConfiguration = () => {
        if (configRef.current.style.display = 'none') {
            configRef.current.style.display = 'flex'
        }
        setDisabledButton(true)
        handlerPlay()
    }

    const handlerCloseConfiguration = () => {
        if (configRef.current.style.display = 'flex') {
            configRef.current.style.display = 'none'
        }
        setDisabledButton(false)
        handlerPlay()
    }


    return (
        <div className='Player'>
            <button className='Player__backBtn' onClick={() => navigate('/browse')}><img src={back} alt="back" className='player__icons' /></button>

            <button className='Player__flagBtn' onClick={handlerConfiguration} >
                <img src={configuration} alt="configuration" className='player__icons' />
            </button>

            <div className='Player__controls'>
                <div className='Player__barContainer'>
                    <input type="range" name="" id="" className='inputTimer' min={0} max={100} defaultValue={0} disabled={disabledButton} />
                    <h3 className='Player__barContainerTimer'>00:00:00</h3>
                </div>
                <div className='Player__controlsButtons'>
                    <div className='Player__controls1'>
                        <button disabled={disabledButton} ><img src={playMovie} alt="play" className='player__icons' onClick={handlerPlay} /></button>
                        <button><img src={back10} alt="back 10 seconds" className='player__icons' disabled={disabledButton} /></button>
                        <button disabled={disabledButton}><img src={forward10} alt="forward 10 seconds" className='player__icons player__icons-forward' /></button>
                        <div className='volumeDiv'>
                            <button onClick={handlerSound} className='player__icons-sound' disabled={disabledButton}>
                                <img src={sound} alt="sound" className='player__icons' />
                            </button>
                            <div className='player__icons-soundContainerBar'>
                                <input type="range" min={0} max={100} step={1} defaultValue={volume} value={volume} onChange={e => {
                                    setVolume(e.target.value)
                                    if (volume <= 10) {
                                        setSound(soundOff)
                                    } else {
                                        setSound(soundOn)
                                    }
                                }
                                } disabled={disabledButton} />
                            </div>
                        </div>

                    </div>
                    <h2 className='Player__movieTitle'>{film && film.original_title}</h2>
                    <div className='Player__controls2'>
                        <button className='Player__controls2-forward' style={{ display: isMovie && 'none' }} disabled={disabledButton}>
                            <img src={forward} alt="forward" className='player__icons' />
                            <div className='Player__controls2-nextEpisode'>
                                <div className='Player__controls2-nextEpisodeTitle'>
                                    <h2>Siguiente episodio</h2>
                                </div>
                                <div className='Player__controls2-nextEpisodeChapter'>

                                </div>
                            </div>
                        </button>

                        <button style={{ display: isMovie && 'none' }} className='Player__controls2-chapters' disabled={disabledButton}>
                            <img src={chapters} alt="chapters" className='player__icons' />
                            <div className='player__icons-chaptersContainer'>
                                <div className='player__icons-chaptersSeason'>
                                    <h2>Temporada 1</h2>
                                </div>
                                <div className='player__icons-chaptersList'>
                                </div>
                            </div>
                        </button>

                        <button className='player__icons-language' disabled={disabledButton}>
                            <img src={language} alt="language" className='player__icons' />
                            <div className='player__icons-languageContainer'>
                                <div className='player__icons-languageContainer-audio'>
                                    <h2>Audio</h2>
                                    <ul>
                                        <li>Español</li>
                                        <li>Inglés</li>
                                    </ul>
                                </div>
                                <div className='player__icons-languageContainer-subtitle'>
                                    <h2>Subtitulos</h2>
                                    <ul>
                                        <li>Español</li>
                                        <li>Inglés</li>
                                    </ul>
                                </div>
                            </div>
                        </button>

                        <button className='player__icons-velocity' disabled={disabledButton}>
                            <img src={velocity} alt="velocity" className='player__icons' />

                            <div className='player__icons-velocityContainer'>
                                <div className='player__icons-velocityTitle'>
                                    <h2>Velocidad de reproducción</h2>
                                </div>
                                <div className='player__icons-velocityRange'>
                                    <input type="range" id="velocity" name="velocity" list="velocityList" className='player__inputRangeVelocity' step={25} value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} disabled={disabledButton} />
                                    <datalist id="velocityList" >
                                        <option value="0" label="0.5x" style={{ fontSize: rangeValue === 0 && '2.25rem', opacity: rangeValue === 0 && '100%' }}></option>
                                        <option value="25" label="0.75x" style={{ fontSize: rangeValue === 25 && '2.25rem', opacity: rangeValue === 25 && '100%' }}></option>
                                        <option value="50" label="1x(Normal)" style={{ fontSize: rangeValue === 50 && '2.25rem', opacity: rangeValue === 50 && '100%' }}></option>
                                        <option value="75" label="1.5x" style={{ fontSize: rangeValue === 75 && '2.25rem', opacity: rangeValue === 75 && '100%' }}></option>
                                        <option value="100" label="1.75x" style={{ fontSize: rangeValue === 100 && '2.25rem', opacity: rangeValue === 100 && '100%' }}></option>
                                    </datalist>
                                </div>
                            </div>

                        </button>
                        <button onClick={handlerFullScreen}><img src={fullScreen} alt="fullScreen" className='player__icons' disabled={disabledButton} /></button>
                    </div>
                </div>
            </div>
            <div className='configuration' ref={configRef}>
                <div className='configurationTitle'>
                    <h2>¿Cuál es el problema?</h2>
                    <button className='configuration__close' onClick={handlerCloseConfiguration}>X</button>
                </div>
                <div className='configuration__option'>
                    <div>
                        <h2>Almacenamiento y búfer de carga</h2>
                        <p>El video está borroso, tarda en almacenarse en búfer o no carga.</p>
                    </div>
                    <div>
                        <h2>Subtítulos y subtítulos ocultos</h2>
                        <p>Los subtítulos o subtítulos ocultos no parecen funcionar correctamente.</p>
                    </div>
                    <div>
                        <h2>Audio y Video</h2>
                        <p>El video es difícil de ver u oír.</p>
                    </div>
                    <div>
                        <h2>Otro problema</h2>
                        <p>Hay otro problema con la serie o película.</p>
                    </div>
                </div>
            </div>
            {
                isLoading && <Loader />
            }
        </div>
    )
}

export default Player