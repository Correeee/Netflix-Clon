import React, { useContext } from 'react'
import './style.css'
import Btn from '../button/button'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { AuthContext } from '../../context/authContext'


const Navbar = () => {

    const navigate = useNavigate()
    const { language, setLanguage } = useContext(AuthContext)

    const handlerLanguage = (e) => {
        const lang = e.target.value
        setLanguage(lang)
        localStorage.setItem('language', lang)
    }

    return (
        <div className='Navbar'>
            <div>
                <img src={logo} alt="logo" className='logo' />
            </div>
            <div className='Navbar__btns'>
                <div>
                    <select name="language" id="language" value={language} onChange={(e) => handlerLanguage(e)}>
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <div>
                    <Btn text={'Log in'} onclick={() => navigate('/login')} imgDisplay={'none'} />
                </div>
            </div>
        </div>
    )
}

export default Navbar