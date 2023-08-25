import React from 'react'
import './style.css'

const PopUp = ({text}) => {
    return (
        <div className='PopUp'>
            <h2>{text}</h2>
            <span className='PopUp__triangle'></span>
        </div>
    )
}

export default PopUp