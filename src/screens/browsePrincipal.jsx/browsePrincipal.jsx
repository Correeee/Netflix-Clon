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
            <Carousel categoryTitle={'Solo en Netflix'} id={2}/>
            <Carousel categoryTitle={'Tendencias'} id={3}/>
            <Carousel categoryTitle={'Películas para reír'} id={4}/>
            <Carousel categoryTitle={'Películas de terror'} id={5}/>
        </div>
    )
}

export default BrowsePrincipal