import React from "react";
import './style.css'
import logo from '../../components/assets/logo.png'
import { Link, useNavigate, useParams } from "react-router-dom";
import Btn from "../../components/button/button";
import popCorn from './assets/popcorn.png'
import { useState } from "react";

const Register = () => {

    const [step, setStep] = useState(1)
    const { email } = useParams()

    const handlerContinue = () => {
        console.log('Continue')
    }
/* --------- NO PERMITIR INGRESAR SI NO LE LLEGA UN MAIL CON FORMATO -------- */
    return (
        <div className="Register">
            <div className="Register__topBar">
                <img src={logo} alt="logo" className="Register__logo" />
                <Link to={'/login'}>Login</Link>
            </div>
            <div className="Register__complete">
                <img src={popCorn} alt="background image" />
                <p>Paso <strong>{step}</strong> de 3</p>
                <h1>Completa la configuración de tu cuenta</h1>
                <h2>Netflix está personalizado para ti. Crea una contraseña para comenzar a ver Netflix.</h2>
                <Btn text={'Siguiente'} imgDisplay={'none'} width={'20rem'} onclick={handlerContinue} />
            </div>
        </div>
    )
}

export default Register;