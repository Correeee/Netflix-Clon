import React from 'react'
import './style.css'
import BrowseNavbar from '../../components/browseNavbar.jsx/browseNavbar'
import BrowseBanner from '../../components/browseBanner/browseBanner'
import Carousel from '../../components/carousel/carousel'

const BrowsePrincipal = () => {

    const ProfileName = 'Maxi'

    return (
        <div className='BrowsePrincipal'>
            <BrowseNavbar />
            <BrowseBanner />
            <Carousel categoryTitle={`Continuar viendo contenido de ${ProfileName}`} id={1}/>
        </div>
    )
}

export default BrowsePrincipal