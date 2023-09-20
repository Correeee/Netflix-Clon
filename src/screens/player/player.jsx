import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { APISearchMovieForId, APISearchMovieVideo, APISearchSerieVideo } from '../../data/data'
import Loader from '../../components/loader/loader'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import Login from '../login/login'
import demoVideoEN from './assets/demoEN.mp4'

const Player = () => {
    const { isLogin } = useContext(AuthContext)
    const { fid } = useParams()
    const { pathname } = useLocation()

    const [film, setFilm] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [video, setVideo] = useState(null)
    const [srcVideo, setSrcVideo] = useState(null)
    const [duration, setDuration] = useState(0)
    const [actualTime, setActualTime] = useState(0)

    useEffect(() => {
        APISearchMovieForId(fid)
            .then(res => setFilm(res))
            .catch(error => console.log(error))
        if (pathname.includes('browse') || pathname.includes('movies')) {
            setIsMovie(true)
            APISearchMovieVideo(fid)
                .then(res => {
                    const official = res.results.filter(res => res.name.includes('Official'))[0];
                    const trailer = res.results.filter(res => res.name.includes('trailer'))[0];
                    if (official) {
                        setVideo(official)
                        setSrcVideo(`https://www.youtube.com/embed/${official && official.key}`)
                    } else if (trailer) {
                        setVideo(trailer)
                        setSrcVideo(`https://www.youtube.com/embed/${trailer && trailer.key}`)
                    } else {
                        setVideo(res.results[0])
                        setSrcVideo(`https://www.youtube.com/embed/${res.results[0] && res.results[0].key}`)
                    }
                    setIsLoading(false)
                })
                .catch(error => console.log(error))
        }

        if (pathname.includes('series')) {
            setIsMovie(false)
            APISearchSerieVideo(fid)
                .then(res => {
                    const official = res.results.filter(res => res.name.includes('Official'))[0];
                    const trailer = res.results.filter(res => res.name.includes('trailer'))[0];
                    if (official) {
                        setVideo(official)
                        setSrcVideo(`https://www.youtube.com/embed/${official && official.key}`)
                    } else if (trailer) {
                        setVideo(trailer)
                        setSrcVideo(`https://www.youtube.com/embed/${trailer && trailer.key}`)
                    } else {
                        setVideo(res.results[0])
                    }
                    setIsLoading(false)
                })
                .catch(error => console.log(error))
        }

    }, [fid])

    const navigate = useNavigate()
    const configRef = useRef(null)
    const videoPlayer = useRef(null)
    const barInput = useRef(null)

    const [playing, setPlaying] = useState(false)
    const [playMovie, setPlayMovie] = useState(play)
    const [sound, setSound] = useState(soundOn)
    const [volume, setVolume] = useState(1)
    const [full, setFull] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)
    const [rangeValue, setRangeValue] = useState(50)
    const [isMovie, setIsMovie] = useState(false)

    let interval

    const handlerPlay = () => {
        if (playing) {
            setPlaying(false)
            setPlayMovie(pause)
            videoPlayer.current.play()
            interval = setInterval(() => {
                if (videoPlayer.current != null) {
                    const newTime = duration - videoPlayer.current.currentTime
                    if (newTime > 0) {
                        setActualTime(newTime)
                    } else {
                        clearInterval(interval)
                        videoPlayer.current.currentTime = 0
                        setActualTime(0)
                        setPlaying(true)
                        setPlayMovie(play)
                    }
                }
            }, 1000);

        } else {
            setPlaying(true)
            setPlayMovie(play)
            videoPlayer.current.pause()
            clearInterval(interval)
        }
    }

    useEffect(() => {
        handlerPlay()
    }, [duration])


    const handlerSound = () => {

        if (sound === soundOn) {
            setSound(soundOff)
            setVolume(0)
            videoPlayer.current.volume = 0
        } else {
            setSound(soundOn)
            setVolume(1)
            videoPlayer.current.volume = 1
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
        videoPlayer.current.pause()
        setPlayMovie(play)
        setPlaying(true)

    }

    const handlerCloseConfiguration = () => {

        if (configRef.current.style.display = 'flex') {
            configRef.current.style.display = 'none'
        }

        setDisabledButton(false)
        videoPlayer.current.play()
        setPlayMovie(pause)
        setPlaying(false)
    }

    const handlerBack = () => {
        if (pathname.includes('mylist')) {
            navigate('/mylist')
        }
        if (pathname.includes('browse')) {
            navigate('/browse')
        }
        if (pathname.includes('movies') && !pathname.includes('mylist') && !pathname.includes('news')) {
            navigate('/movies')
        }
        if (pathname.includes('series') && !pathname.includes('mylist') && !pathname.includes('news')) {
            navigate('/series')
        }
        if ((pathname.includes('movies') || pathname.includes('series')) && pathname.includes('news')) {
            navigate('/news')
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    const handlerVolumeRange = (e) => {
        const volumeValue = e.target.value
        setVolume(volumeValue)
        videoPlayer.current.volume = volumeValue
        if (volumeValue == 0) {
            setSound(soundOff)
        } else {
            setSound(soundOn)
        }
    }

    const handlerRewind = () => {

        if (videoPlayer.current.currentTime > 10) {
            const rewindTime = videoPlayer.current.currentTime - 10
            videoPlayer.current.currentTime = rewindTime
        }
        if (videoPlayer.current.currentTime < 10) {
            videoPlayer.current.currentTime = 0
        }

    }

    const handlerForward = () => {
        const rewindTime = videoPlayer.current.currentTime + 10
        if (videoPlayer.current.currentTime < (duration - 10)) {
            videoPlayer.current.currentTime = rewindTime
        }

        if (videoPlayer.current.currentTime > (duration - 10)) {
            videoPlayer.current.currentTime = 0
            videoPlayer.current.pause()
            setPlaying(true)
            setPlayMovie(play)
        }
    }

    const handlerRangeBar = (movieTime) => {
        videoPlayer.current.currentTime = movieTime
        setActualTime(duration - movieTime)
    }


    return (
        <>
            {
                isLogin ?
                    <div className='Player'>
                        <div className='videoYoutubeContainer'>
                            <h3>Because the TMDB API only offers YouTube videos to integrate with 'IFRAME', the Movie or Series video will be a demo.</h3>
                            <iframe src={srcVideo} className='videoYoutube'></iframe>
                        </div>
                        <video
                            id="videoFrame"
                            className='videoTrailer'
                            ref={videoPlayer}
                            onLoadedMetadata={(e) => {
                                const time = Number(e.target.duration)
                                setDuration(time)
                            }}
                        >
                            <source src={demoVideoEN} type="video/mp4" />
                        </video>
                        <button className='Player__backBtn' onClick={handlerBack}><img src={back} alt="back" className='player__icons' /></button>

                        <button className='Player__flagBtn' onClick={handlerConfiguration} >
                            <img src={configuration} alt="configuration" className='player__icons' />
                        </button>

                        <div className='Player__controls'>
                            <div className='Player__barContainer'>
                                <input
                                    type="range"
                                    className='inputTimer'
                                    min={0} max={duration}
                                    value={!actualTime || actualTime <= 0 ? 0 : (duration - actualTime)}
                                    disabled={disabledButton}
                                    onChange={(e) => handlerRangeBar(Number(e.target.value))}
                                    ref={barInput}
                                    style={{
                                        background: videoPlayer.current &&
                                            `linear-gradient(to right, 
                                            var(--color-primary) 0%, 
                                            var(--color-primary) ${videoPlayer.current.currentTime}%,
                                            var(--color-grey) ${videoPlayer.current.currentTime + 5}%,
                                            var(--color-grey) 100%)`
                                    }}
                                />
                                <h3 className='Player__barContainerTimer'>{!actualTime ? formatTime(duration) : formatTime(actualTime)}</h3>
                            </div>
                            <div className='Player__controlsButtons'>
                                <div className='Player__controls1'>
                                    <button disabled={disabledButton} onClick={handlerPlay}><img src={playMovie} alt="play" className='player__icons' /></button>
                                    <button onClick={handlerRewind}><img src={back10} alt="back 10 seconds" className='player__icons' disabled={disabledButton} /></button>
                                    <button onClick={handlerForward} disabled={disabledButton}><img src={forward10} alt="forward 10 seconds" className='player__icons player__icons-forward' /></button>
                                    <div className='volumeDiv'>
                                        <button onClick={handlerSound} className='player__icons-sound' disabled={disabledButton}>
                                            <img src={sound} alt="sound" className='player__icons' />
                                        </button>
                                        <div className='player__icons-soundContainerBar'>
                                            <input type="range"
                                                min={0} max={1} step={0.01}
                                                defaultValue={volume}
                                                value={volume}
                                                onChange={e => handlerVolumeRange(e)}
                                                disabled={disabledButton}
                                            />
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
                                                <input type="range"
                                                    id="velocity"
                                                    name="velocity"
                                                    list="velocityList"
                                                    className='player__inputRangeVelocity'
                                                    step={25}
                                                    value={rangeValue}
                                                    onChange={(e) => setRangeValue(e.target.value)} disabled={disabledButton}
                                                />
                                                <datalist id="velocityList" >
                                                    <option value="0" label="0.5x" style={{ opacity: rangeValue == 0 && '100%' }}></option>
                                                    <option value="25" label="0.75x" style={{ opacity: rangeValue == 25 && '100%' }}></option>
                                                    <option value="50" label="1x(Normal)" style={{ opacity: rangeValue == 50 && '100%' }}></option>
                                                    <option value="75" label="1.5x" style={{ opacity: rangeValue == 75 && '100%' }}></option>
                                                    <option value="100" label="1.75x" style={{ opacity: rangeValue == 100 && '100%' }}></option>
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
                    :
                    <Login />
            }
        </>
    )
}

export default Player