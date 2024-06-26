import React from 'react'
import './style.css'

const Btn = ({ type, text, onclick, form, width, backgroundColor, id, color, fontSize, imageSrc, imgDisplay }) => {
    return (
        <button type={type} className='Btn' onClick={onclick} form={form} style={{ width: width, backgroundColor: backgroundColor, color: color, fontSize: fontSize }} id={id}>
            <img src={imageSrc} alt="button" className='Btn__logo' style={{display: imgDisplay}}/>
            {text}
        </button>
    )
}

export default Btn