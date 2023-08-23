import React, { useState } from 'react'
import './style.css'
import BrowsePrincipal from '../browsePrincipal.jsx/browsePrincipal'

const Browse = () => {

    const [selectedProfile, setSelectedProfile] = useState(false)

    return (
        <>
            {
                selectedProfile ?
                    <div className='Browse'>
                        <h1>¿Quién está viendo ahora?</h1>
                        <div className='Browse__profiles'>
                            <div className='Browse__profiles__profile'>
                                <img src="" alt="" />
                                <h2>NOMBRE</h2>
                            </div>
                            <div className='Browse__profiles__profile'>
                                <img src="" alt="" />
                                <h2>NOMBRE</h2>
                            </div>
                            <div className='Browse__profiles__profile'>
                                <img src="" alt="" />
                                <h2>NOMBRE</h2>
                            </div>
                            <div className='Browse__profiles__profile'>
                                <img src="" alt="" />
                                <h2>NOMBRE</h2>
                            </div>
                            <div className='Browse__profiles__profile'>
                                <img src="" alt="" />
                                <h2>NOMBRE</h2>
                            </div>
                        </div>
                        <button>Administrar Perfiles</button>
                    </div>
                    :
                    <BrowsePrincipal />
            }
        </>
    )
}

export default Browse