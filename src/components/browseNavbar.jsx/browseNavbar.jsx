import React, { useContext, useEffect, useRef } from 'react'
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
import { useTranslation } from 'react-i18next'

const BrowseNavbar = () => {
    const navigate = useNavigate()
    const { setIsLogin, userData, selectedProfile, setSelectedProfile } = useContext(AuthContext)

    const [scrolling, setScrolling] = useState(false)
    const [search, setSearch] = useState('')

    const { t } = useTranslation(["lang"])

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

    const handlerProfile = (prof) => {
        setSelectedProfile(prof)
    }

    const [isLookingFor, setIsLookingFor] = useState(false)

    useEffect(() => {
        isLookingFor ? document.getElementById('searchInput').focus() : isLookingFor && document.getElementById('searchInput').blur()
    }, [isLookingFor])

    const navbarRef = useRef()
    const triangleRef = useRef()

    const widthResponsive = () => {
        if (navbarRef.current.style.display === 'none' || !navbarRef.current.style.display) {
            navbarRef.current.style.display = 'flex'
            triangleRef.current.style.display = 'flex'
        } else {
            navbarRef.current.style.display = 'none'
            triangleRef.current.style.display = 'none'
        }
    }

    const handlerNav = () => {
        widthResponsive()
    }

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            const windowWidth = e.target.innerWidth
            if (windowWidth > 800) {
                if (navbarRef.current) {
                    navbarRef.current.style.display = 'none'
                    triangleRef.current.style.display = 'none'
                }
            }
        })
    }, [])


    return (
        <div className='BrowseNavbar' style={{ backgroundColor: scrolling ? 'rgba(0, 0, 0, 0.7)' : 'transparent' }}>
            <div className='BrowseNavbar__links'>
                <div>
                    <img src={logo} alt="logo" className='logo' onClick={()=> navigate('/browse')}/>
                </div>
                <div>
                    <button className='BrowseNavbar__openOptions' onClick={handlerNav}>Explorar</button>
                    <ul className='BrowseNavbar__listResponsive' ref={navbarRef}>
                        <div className='triangle' ref={triangleRef}></div>
                        <NavLink to={'/browse'} onClick={() => widthResponsive()}>{t("HOME")}</NavLink>
                        <NavLink to={'/series'} onClick={() => widthResponsive()}>{t("SERIES")}</NavLink>
                        <NavLink to={'/movies'} onClick={() => widthResponsive()}>{t("MOVIES")}</NavLink>
                        <NavLink to={'/news'} onClick={() => widthResponsive()}>{t("POPULAR_NEWS")}</NavLink>
                        <NavLink to={'/mylist'} onClick={() => widthResponsive()}>{t("MY_LIST")}</NavLink>
                    </ul>
                </div>
                <ul className='BrowseNavbar__list' >
                    <NavLink to={'/browse'}>{t("HOME")}</NavLink>
                    <NavLink to={'/series'} >{t("SERIES")}</NavLink>
                    <NavLink to={'/movies'} >{t("MOVIES")}</NavLink>
                    <NavLink to={'/news'} >{t("POPULAR_NEWS")}</NavLink>
                    <NavLink to={'/mylist'} >{t("MY_LIST")}</NavLink>
                </ul>
            </div>
            <div className='BrowseNavbar__profileBar'>
                <div className='BrowseNavbar__profileBar-lookforContainer' style={{ border: isLookingFor && '1px solid white' }}>
                    <img src={busqueda} alt="buscar" className='BrowseNavbar__icons' id='iconLookFor' onClick={() => {
                        setIsLookingFor(true)
                    }} />
                    <input type="text" placeholder={t("INPUT_SEARCH")} className='BrowseNavbar__profileBar-lookfor' style={{ display: isLookingFor && 'flex' }} onBlur={(e) => {
                        setIsLookingFor(false);
                        e.target.value = ''
                        setSearch('');
                    }} onChange={(e) => setSearch(e.target.value)} id='searchInput' />
                </div>
                <img src={notificaciones} alt="notificaciones" className='BrowseNavbar__icons BrowseNavbar__icons-notifications' />
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
                                        <a key={i} onClick={() => handlerProfile(prof)}>
                                            <img src={prof.image} alt={prof.name} className='BrowseNavbar__profileOptionsImg' />
                                            {prof.name}
                                        </a>
                                    )
                                })
                            }

                        </ul>
                        <ul>
                            <Link to={'/profiles'} onClick={() => setSelectedProfile(null)}>{t("SELECTPROFILE_BTN")}</Link>
                            {/* <a>Transferir perfil</a>
                            <a>Cuenta</a>
                            <a>Centro de ayuda</a> */}
                        </ul>
                        <span></span>
                        <a className='BrowseNavbar__logout' onClick={handlerLogout}>{t("SIGN_OUT_NETFLIX")}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseNavbar