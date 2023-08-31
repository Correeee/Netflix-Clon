import React from 'react'
import './style.css'
import Carousel from '../../components/carousel/carousel'
import BrowseNavbar from '../../components/browseNavbar.jsx/browseNavbar'

const News = () => {
    
    return (
        <div className='News'>
            <BrowseNavbar />
            <div className='News__carousels'>
                <Carousel categoryTitle={`What's new on Netflix`} id={1} />
                <Carousel categoryTitle={'10 Most Popular Movies'} id={2} />
                <Carousel categoryTitle={'Movies released this week'} id={3} />
                <Carousel categoryTitle={'10 Most Popular Movies'} id={4} />
                <Carousel categoryTitle={'Series released this week'} id={5} />
            </div>
        </div>
    )
}

export default News