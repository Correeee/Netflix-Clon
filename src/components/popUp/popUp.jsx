import React from 'react'
import './style.css'

const PopUp = ({ text, textColor, top, left}) => {
    return (
        <div className='PopUp' style={{top: top, left: left}}>
            <h2 style={{ color: textColor }}>{text}</h2>
            <span className='PopUp__triangle'></span>
        </div>
    )
}

export default PopUp