import React from 'react'
import './style.css'
import Btn from '../button/button'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'


const Navbar = () => {

    const navigate = useNavigate()

    const handlerLogin = () => {
        console.log('login')
    }

    const handlerRegister = () => {
        console.log('handlerRegister')
    }

    return (
        <div className='Navbar'>
            <div>
                <img src={logo} alt="logo" className='logo' />
            </div>
            <div className='Navbar__btns'>
                <div>
                    <select name="language" id="language">
                        <option value="Español">Español</option>
                        <option value="Español">Inglés</option>
                    </select>
                </div>
                <div>
                    <Btn text={'Log in'} onclick={() => navigate('/login')} imgDisplay={'none'}/>
                </div>
            </div>
        </div>
    )
}

export default Navbar