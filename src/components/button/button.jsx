import React from 'react'
import './style.css'

const Btn = ({ type, text, onclick, form, width, backgroundColor, id, color, fontSize }) => {
    return (
        <button type={type} className='Btn' onClick={onclick} form={form} style={{ width: width, backgroundColor: backgroundColor, color: color, fontSize: fontSize }} id={id}>
            {text}
        </button>
    )
}

export default Btn