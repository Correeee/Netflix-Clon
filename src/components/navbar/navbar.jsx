import React, { useContext } from 'react'
import './style.css'
import Btn from '../button/button'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { AuthContext } from '../../context/authContext'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'


const Navbar = () => {

    const navigate = useNavigate()
    const { language, setLanguage } = useContext(AuthContext)
    const { t } = useTranslation(["lang"])


    const handlerLanguage = (e) => {
        const lang = e.target.value
        i18next.changeLanguage(lang)
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
                        <option value="es">{t("HOME_NAVBAR_LANG1")}</option>
                        <option value="en">{t("HOME_NAVBAR_LANG2")}</option>
                    </select>
                </div>
                <div>
                    <Btn text={t("HOME_LOGIN")} onclick={() => navigate('/login')} imgDisplay={'none'} />
                </div>
            </div>
        </div>
    )
}

export default Navbar