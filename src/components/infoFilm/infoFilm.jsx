import React from 'react'
import './style.css'
import more from './assets/more.png'

const InfoFilm = () => {
    return (
        <div className='InfoFilm'>
            <div className='InfoFilm__poster' style={{ backgroundColor: 'red' }}>

            </div>
            <div className='InfoFilm__info'>
                <div className='InfoFilm__info-date'>
                    <div>
                        <h2>80% para ti</h2>
                        <h3>2022</h3>
                        <h3>Lorem.</h3>
                    </div>
                    <div>
                        <h3>13+</h3>
                    </div>
                </div>
                <div className='InfoFilm__info-text'>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem facilis minus et, consequuntur officiis debitis ipsa expedita reiciendis maxime facere!</p>
                </div>
            </div>
            <div className='InfoFilm__moreTitles'>
                <h1>Más títulos similares a este</h1>
                <div className='InfoFilm__moreTitles-filmsCards'>
                    <div className='filmCard'>
                        <div className='filmCard__img'>

                        </div>
                        <div className='filmCard__info'>
                            <div className='filmCard__info-btns'>
                                <div className='filmCard__info-btnsDiv1'>
                                    <div>
                                        <h3>75% para ti</h3>
                                    </div>
                                    <div>
                                        <h3>13+</h3>
                                        <h3>2020</h3>
                                    </div>
                                </div>
                                <div className='filmCard__info-btnsDiv2'>
                                    <button><img src={more} alt="Más" /></button>
                                </div>
                            </div>
                        </div>
                        <div className='filmCard__texts'>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim esse, in fuga est nam iste asperiores rerum libero laboriosam doloremque vitae velit consequatur perferendis quia deserunt at molestiae quae qui.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoFilm