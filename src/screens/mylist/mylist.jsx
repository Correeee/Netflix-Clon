import React from 'react'
import './style.css'
import BrowseNavbar from '../../components/browseNavbar.jsx/browseNavbar'

const MyList = () => {
    return (
        <div className='MyList'>
            <BrowseNavbar />
            <div className='MyList__container'>
                <h1>My List</h1>

            </div>
        </div>
    )
}

export default MyList