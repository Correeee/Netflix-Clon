import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import more from './assets/more.png'
import play from './assets/play.png'
import playBlack from './assets/playBlack.png'
import { APISearchMovieForId, APISearchForMovieGenere, APISearchSerieForId, APISearchForSeriesGenere } from '../../data/data'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'
import like from './assets/like.png'
import PopUp from '../popUp/popUp'
import Btn from '../button/button'
import { addToLike, addToList, getProfileData } from '../../data/userFn'
import { AuthContext } from '../../context/authContext'
import OK from './assets/OK.png'

const InfoFilm = ({ fid }) => {

    const [film, setFilm] = useState(null)
    const [genres, setGenres] = useState([])
    const [moreMovies, setMoreMovies] = useState([])

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { userData, selectedProfile, setSelectedProfile } = useContext(AuthContext)

    if (fid) {
        document.querySelector('body').classList.add('hiddenBody')
    }

    useEffect(() => {

        if (fid) {
            if (pathname.includes('browse') || pathname.includes('movies')) {
                APISearchMovieForId(fid)
                    .then(res => {
                        setFilm(res)
                        const genresIds = []
                        res.genres.map(gen => genresIds.push(gen.id))
                        setGenres(genresIds)
                    })
                    .catch(error => console.log(error))
            }
            if (pathname.includes('series')) {
                APISearchSerieForId(fid)
                    .then(res => {
                        setFilm(res)
                        const genresIds = []
                        res.genres.map(gen => genresIds.push(gen.id))
                        setGenres(genresIds)
                    })
                    .catch(error => console.log(error))
            }

        }

    }, [fid])

    useEffect(() => {
        const fetchMoviesForGenres = async () => {
            const promises = genres.map(gid => {
                return APISearchForMovieGenere(gid)
                    .then(res => res.results)
                    .catch(error => {
                        console.error('Error fetching movies:', error);
                        return []; // Devuelve un array vacío en caso de error
                    });
            });

            try {
                const allResults = await Promise.all(promises);

                const otherMovies = allResults.flat(); // Combina los arrays de resultados en uno solo

                setMoreMovies(otherMovies);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchSeriesForGenres = async () => {
            const promises = genres.map(gid => {
                return APISearchForSeriesGenere(gid)
                    .then(res => res.results)
                    .catch(error => {
                        console.error('Error fetching movies:', error);
                        return []; // Devuelve un array vacío en caso de error
                    });
            });

            try {
                const allResults = await Promise.all(promises);

                const otherMovies = allResults.flat(); // Combina los arrays de resultados en uno solo

                setMoreMovies(otherMovies);
            } catch (error) {
                console.error(error);
            }
        };

        if (pathname.includes('browse') || pathname.includes('movies')) {
            fetchMoviesForGenres();
        }
        if (pathname.includes('series')) {
            fetchSeriesForGenres();
        }
    }, [genres]);


    useEffect(() => {

    }, [moreMovies.length])


    const handlerClose = () => {
        document.querySelector('body').classList.remove('hiddenBody')
        if (pathname.includes('browse')) {
            navigate('/browse')
        }
        if (pathname.includes('movies') && !pathname.includes('news') && !pathname.includes('mylist')) {
            navigate('/movies')
        }
        if (pathname.includes('series') && !pathname.includes('news') && !pathname.includes('mylist')) {
            navigate('/series')
        }
        if (pathname.includes('news')) {
            navigate('/news')
        }
        if (pathname.includes('mylist')) {
            navigate('/mylist')
        }
    }

    const handlerPlay = (id) => {
        if (pathname.includes('mylist')) {
            if (pathname.includes('movies')) {
                navigate(`/mylist/movies/player/${id}`)
            }
            if (pathname.includes('series')) {
                navigate(`/mylist/series/player/${id}`)
            }
        } else {
            if (pathname.includes('news')) {
                if ((pathname.includes('browse') || pathname.includes('movies'))) {
                    navigate(`/news/movies/player/${id}`)
                }
                if (pathname.includes('series') && !pathname.includes('mylist')) {
                    navigate(`/news/series/player/${id}`)
                }
            } else {
                if ((pathname.includes('browse') || pathname.includes('movies'))) {
                    navigate(`/movies/player/${id}`)
                }
                if (pathname.includes('series') && !pathname.includes('mylist')) {
                    navigate(`/series/player/${id}`)
                }
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


    const [inList, setInList] = useState(false)
    const [inLikes, setInLikes] = useState(false)
    const [imageList, setImageList] = useState(false)

    const isInList = async (film) => {
        try {
            if(film){
                const filmInList = await selectedProfile.list.filter((li) => li.id === film.id)
                if (filmInList.length) {
                    setInList(true)
                    setImageList(true)
                } else {
                    setInList(false)
                    setImageList(false)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const isInLikes = async (film) => {
        try {
            const filmInList = await selectedProfile.likes.filter((li) => li.id === film.id)
            if (filmInList.length) {
                setInLikes(true)
            } else {
                setInLikes(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        isInList(film)
        isInLikes(film)
    }, [selectedProfile])

    // const ScrollInfoFilmTop = () => {
    //     return (document.getElementsByClassName('InfoFilmContainer')[0].scrollTo(0, 0))
    // }

    return (
        <>
            <div className='filter' style={{ display: fid && 'flex' }}></div>
            {
                film &&
                <div className='InfoFilmContainer' style={{ display: !fid && 'none' }}>
                    {/* <ScrollInfoFilmTop /> */}
                    <div className='out' onClick={handlerClose}></div>
                    <div className='InfoFilm' >
                        <button className='InfoFilm__close' onClick={handlerClose}>X</button>
                        <div className='InfoFilm__poster' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${film.backdrop_path})` }}>
                            <div className='InfoFilmContainer__filter'></div>
                            <div className='InfoFilm__poster-principalInfo'>
                                <div className='principalInfo__info'>
                                    <div className='principalInfo__infoContainer'>
                                        <div className='principalInfo__infoLogo'>
                                            <img src={logo} alt="logo" className='principalInfo__info-logo' />
                                            <h1>{film.seasons ? 'Serie' : 'Movie'}</h1>
                                        </div>
                                        <div className='principalInfo__title'>
                                            <h2>{film.title || film.name}</h2>
                                        </div>
                                        <div className='principalInfo__info-Btns'>
                                            <Btn text={'Reproducir'} id={'BrowseBannerBtnPlay'} width={'20rem'} color={'black'} fontSize={'2rem'} onclick={() => handlerPlay(film.id)} imageSrc={playBlack} />
                                            <button className='principalInfo__info-add' onClick={() => handlerList(film)} style={{ backgroundColor: inList && '#45D068' }}>
                                                <img src={imageList ? OK : more} alt="add" />
                                                <PopUp text={!inList ? 'Add to My list' : 'Remove from the list'} textColor={inList && 'var(--color-primary)'} />
                                            </button>
                                            <button className='principalInfo__info-like' onClick={() => handlerLike(film)} style={{ backgroundColor: inLikes && '#45D068' }}>
                                                <img src={like} alt="like" />
                                                <PopUp text={!inLikes ? 'Like it' : "I don't like"} textColor={inLikes && 'var(--color-primary)'} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='InfoFilm__info'>
                            <div className='InfoFilm__info-date'>
                                <div>
                                    <h2>80% para ti</h2>
                                    <h3>{film.release_date || film.first_air_date}</h3>
                                    {
                                        film.genres && film.genres.slice(0, 3).map((gen, i) => {
                                            return (
                                                <div key={i}>
                                                    <h3>{gen.name}</h3>
                                                    <span></span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <h3>13+</h3>
                                </div>
                            </div>
                            <div className='InfoFilm__info-text'>
                                <p>{film.overview}</p>
                            </div>
                        </div>
                        <div className='InfoFilm__moreTitles'>
                            <h1>More titles similar to this</h1>
                            <div className='InfoFilm__moreTitles-filmsCards'>
                                {
                                    moreMovies.length &&
                                    moreMovies.slice(0, 8).map((mov, i) => {
                                        const list = selectedProfile.list.find(li => li.id === mov.id)
                                        return (
                                            <div className='filmCard' key={i}>
                                                <div className='filmCard__posterContainer'>
                                                    <img src={`https://image.tmdb.org/t/p/original${mov.poster_path}`} className='filmCard__img' />
                                                    <button className='filmCard__playBtn' onClick={() => handlerPlay(mov.id)} >
                                                        <img src={play} alt="Play" className='filmCard__play' />
                                                    </button>
                                                    <h2 className='filmCard__title'>{mov.title || mov.name}</h2>
                                                </div>

                                                <div className='filmCard__info'>
                                                    <div className='filmCard__info-btns'>
                                                        <div className='filmCard__info-btnsDiv1'>
                                                            <div>
                                                                <h3>75% for you</h3>
                                                            </div>
                                                            <div>
                                                                <h3>{!mov.adult ? '13+' : '+18'}</h3>
                                                                <h3>{mov.release_date}</h3>
                                                            </div>
                                                        </div>
                                                        <div className='filmCard__info-btnsDiv2'>
                                                            <button onClick={() => handlerList(mov)} style={{ backgroundColor: list && '#45D068' }} className='filmCard__addToList'>
                                                                <img src={!list ? more : OK} alt="Add" />
                                                                <PopUp text={!list ? 'Add to My list' : 'Remove from the list'} textColor={list && 'var(--color-primary)'} top={'-220%'} left={'-195%'}/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='filmCard__texts'>
                                                    <p>{mov.overview}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default InfoFilm