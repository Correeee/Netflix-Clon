import React, { useEffect, useState } from 'react'
import './style.css'
import more from './assets/more.png'
import { APISearchMovieForId, APISearchForGenere } from '../../data/data'
import BrowseBanner from '../browseBanner/browseBanner'
import { useNavigate } from 'react-router-dom'
import Btn from '../button/button'


const InfoFilm = ({ fid }) => {

    const [film, setFilm] = useState(null)
    const [genres, setGenres] = useState([])
    const [moreMovies, setMoreMovies] = useState([])


    useEffect(() => {

        APISearchMovieForId(fid)
            .then(res => {
                setFilm(res)
                const genresIds = []
                res.genres.map(gen => genresIds.push(gen.id))
                setGenres(genresIds)
            })
            .catch(error => console.log(error))

    }, [fid])

    useEffect(() => {
        const fetchMoviesForGenres = async () => {
            const promises = genres.map(gid => {
                return APISearchForGenere(gid)
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

        fetchMoviesForGenres();
    }, [genres]);


    useEffect(() => {

    }, [moreMovies.length])


    const handlerClose = () => {
        console.log('CERRAR')
    }


    return (
        <>
            {
                film &&
                <div className='InfoFilm'>
                    <button className='InfoFilm__close' onClick={handlerClose}>X</button>
                    <div className='InfoFilm__poster' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${film.backdrop_path})` }}>
                        <div className='InfoFilm__poster-principalInfo'>
                    
                        </div>

                    </div>
                    <div className='InfoFilm__info'>
                        <div className='InfoFilm__info-date'>
                            <div>
                                <h2>80% para ti</h2>
                                <h3>{film.release_date}</h3>
                                {
                                    film.genres.map((gen, i) => {
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
                        <h1>Más títulos similares a este</h1>
                        <div className='InfoFilm__moreTitles-filmsCards'>
                            {
                                moreMovies.length &&
                                moreMovies.slice(0, 8).map((mov, i) => {
                                    console.log(`url(https://image.tmdb.org/t/p/original${mov.poster_path})`)
                                    return (
                                        <div className='filmCard'>
                                            <img src={`https://image.tmdb.org/t/p/original${mov.poster_path}`} className='filmCard__img'>
                                            </img>
                                            <div className='filmCard__info'>
                                                <div className='filmCard__info-btns'>
                                                    <div className='filmCard__info-btnsDiv1'>
                                                        <div>
                                                            <h3>75% para ti</h3>
                                                        </div>
                                                        <div>
                                                            <h3>{!mov.adult ? '13+' : '+18'}</h3>
                                                            <h3>{mov.release_date}</h3>
                                                        </div>
                                                    </div>
                                                    <div className='filmCard__info-btnsDiv2'>
                                                        <button><img src={more} alt="Más" /></button>
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
            }
        </>
    )
}

export default InfoFilm