import React from 'react'
import './style.css'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import busqueda from './assets/busqueda.png'
import notificaciones from './assets/campana.png'
import down from './assets/abajo.png'
import demoProfile from './assets/demo.png'

const BrowseNavbar = () => {
    return (
        <div className='BrowseNavbar'>
            <div className='BrowseNavbar__links'>
                <div>
                    <img src={logo} alt="logo" className='logo' />
                </div>
                <ul>
                    <NavLink to={'/browse'}>Inicio</NavLink>
                    <NavLink to={'/series'}>Series</NavLink>
                    <NavLink to={'/movies'}>Películas</NavLink>
                    <NavLink to={'/news'}>Novedades populares</NavLink>
                    <NavLink to={'/mylist'}>Mi lista</NavLink>
                    <NavLink to={'/explorer'}>Explorar por idiomas</NavLink>
                </ul>
            </div>
            <div className='BrowseNavbar__profileBar'>
                <img src={busqueda} alt="buscar" className='BrowseNavbar__icons' />
                <img src={notificaciones} alt="notificaciones" className='BrowseNavbar__icons' />
                <div className='BrowseNavbar__profileContainerImg'>
                    <img src={demoProfile}  alt="profileImg" className='BrowseNavbar__profileImg' />
                    <img src={down} alt="down" className='BrowseNavbar__icons BrowseNavbar__icons-down' />
                    <div className='BrowseNavbar__profileOptions'>
                        <div>
                            <img src={down} alt="arrow" className='BrowseNavbar__profileOptions_arrow'/>
                        </div>
                        <ul>
                            <a><img src={demoProfile} alt="" className='BrowseNavbar__profileOptionsImg'/>Perfil</a>
                            <a><img src={demoProfile}  alt="" className='BrowseNavbar__profileOptionsImg'/>Perfil</a>
                            <a><img src={demoProfile}  alt="" className='BrowseNavbar__profileOptionsImg'/>Perfil</a>
                            <a><img src={demoProfile}  alt="" className='BrowseNavbar__profileOptionsImg'/>Perfil</a>
                            <a><img src={demoProfile}  alt="" className='BrowseNavbar__profileOptionsImg'/>Perfil</a>
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