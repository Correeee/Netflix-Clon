import React, { useContext, useEffect } from 'react'
import './style.css'
import logo from '../assets/logo.png'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'
import busqueda from './assets/busqueda.png'
import notificaciones from './assets/campana.png'
import down from './assets/abajo.png'
import demoProfile from './assets/demo.png'
import { useState } from 'react'
import { signOut } from '@firebase/auth'
import { auth } from '../../firebase/firebase'
import { AuthContext } from '../../context/authContext'

const BrowseNavbar = () => {
    const navigate = useNavigate()
    const { setIsLogin, userData, selectedProfile, setSelectedProfile } = useContext(AuthContext)

    const [scrolling, setScrolling] = useState(false)

    useEffect(() => {

    }, [userData])

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            setScrolling(true)
        } else {
            setScrolling(false)
        }
    })

    const handlerLogout = async () => {
        try {
            await signOut(auth)
            setIsLogin(false)
            setSelectedProfile(null)
            navigate('/')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='BrowseNavbar' style={{ backgroundColor: scrolling ? 'rgba(0, 0, 0, 0.7)' : 'transparent' }}>
            <div className='BrowseNavbar__links'>
                <div>
                    <img src={logo} alt="logo" className='logo' />
                </div>
                <ul>
                    <NavLink to={'/browse'}>Home</NavLink>
                    <NavLink to={'/series'}>Series</NavLink>
                    <NavLink to={'/movies'}>Movies</NavLink>
                    <NavLink to={'/news'}>Popular News</NavLink>
                    <NavLink to={'/mylist'}>My List</NavLink>
                </ul>
            </div>
            <div className='BrowseNavbar__profileBar'>
                <img src={busqueda} alt="buscar" className='BrowseNavbar__icons' />
                <img src={notificaciones} alt="notificaciones" className='BrowseNavbar__icons' />
                <div className='BrowseNavbar__profileContainerImg'>
                    <img src={selectedProfile.image} alt="profileImg" className='BrowseNavbar__profileImg' />
                    <img src={down} alt="down" className='BrowseNavbar__icons BrowseNavbar__icons-down' />
                    <div className='BrowseNavbar__profileOptions'>
                        <div>
                            <img src={down} alt="arrow" className='BrowseNavbar__profileOptions_arrow' />
                        </div>
                        <ul>
                            {
                                userData.profiles.length && userData.profiles.map((prof, i) => {
                                    return (
                                        <a key={i}>
                                            <img src={prof.image} alt={prof.name} className='BrowseNavbar__profileOptionsImg' />
                                            {prof.name}
                                        </a>
                                    )
                                })
                            }

                        </ul>
                        <ul>
                            <Link to={'/profiles'} onClick={() => setSelectedProfile(null)}>Administrar perfiles</Link>
                            {/* <a>Transferir perfil</a>
                            <a>Cuenta</a>
                            <a>Centro de ayuda</a> */}
                        </ul>
                        <span></span>
                        <a className='BrowseNavbar__logout' onClick={handlerLogout}>Cerrar sesión en Netflix</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseNavbar