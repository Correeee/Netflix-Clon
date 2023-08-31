import React from 'react'
import './style.css'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import busqueda from './assets/busqueda.png'
import notificaciones from './assets/campana.png'
import down from './assets/abajo.png'
import demoProfile from './assets/demo.png'
import { useState } from 'react'

const BrowseNavbar = () => {

    const [scrolling, setScrolling] = useState(false)

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            setScrolling(true)
        } else {
            setScrolling(false)
        }
    })

    return (
        <div className='BrowseNavbar' style={{ backgroundColor: scrolling ? 'rgba(0, 0, 0, 0.7)' : 'transparent'}}>
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
                    <NavLink to={'/explorer'}>Explorer</NavLink>
                </ul>
            </div>
            <div className='BrowseNavbar__profileBar'>
                <img src={busqueda} alt="buscar" className='BrowseNavbar__icons' />
                <img src={notificaciones} alt="notificaciones" className='BrowseNavbar__icons' />
                <div className='BrowseNavbar__profileContainerImg'>
                    <img src={demoProfile} alt="profileImg" className='BrowseNavbar__profileImg' />
                    <img src={down} alt="down" className='BrowseNavbar__icons BrowseNavbar__icons-down' />
                    <div className='BrowseNavbar__profileOptions'>
                        <div>
                            <img src={down} alt="arrow" className='BrowseNavbar__profileOptions_arrow' />
                        </div>
                        <ul>
                            <a><img src={demoProfile} alt="" className='BrowseNavbar__profileOptionsImg' />Perfil</a>
                            <a><img src={demoProfile} alt="" className='BrowseNavbar__profileOptionsImg' />Perfil</a>
                            <a><img src={demoProfile} alt="" className='BrowseNavbar__profileOptionsImg' />Perfil</a>
                            <a><img src={demoProfile} alt="" className='BrowseNavbar__profileOptionsImg' />Perfil</a>
                            <a><img src={demoProfile} alt="" className='BrowseNavbar__profileOptionsImg' />Perfil</a>
                        </ul>
                        <ul>
                            <a>Administrar perfiles</a>
                            <a>Transferir perfil</a>
                            <a>Cuenta</a>
                            <a>Centro de ayuda</a>
                        </ul>
                        <span></span>
                        <a href="" className='BrowseNavbar__logout'>Cerrar sesión en Netflix</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseNavbar