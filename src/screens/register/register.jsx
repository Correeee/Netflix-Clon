import React from "react";
import './style.css'
import logo from '../../components/assets/logo.png'
import { Link, useParams } from "react-router-dom";
import Btn from "../../components/button/button";
import popCorn from './assets/popcorn.png'
import { useState } from "react";
import RegisterStep2 from "./registerStep2/registerStep2";
import RegisterStep3 from "./registerStep2/registerStep3.jsx/registerStep3";

const Register = () => {

    const [step, setStep] = useState(1)
    const { email } = useParams()



    const handlerContinue = () => {
        setStep(2)
    }
    /* --------- NO PERMITIR INGRESAR SI NO LE LLEGA UN MAIL CON FORMATO -------- */
    return (
        <div className="Register">
            <div className="Register__topBar">
                <img src={logo} alt="logo" className="Register__logo" />
                <Link to={'/login'}>Login</Link>
            </div>
            {
                step === 1 ?
                    <div className="Register__complete">
                        <img src={popCorn} alt="background image" />
                        <p>Step <strong>{step}</strong> of 3</p>
                        <h1>Complete your account setup</h1>
                        <h2>Netflix is ​​personalized for you. Create a password to start watching Netflix.</h2>
                        <Btn text={'Continue'} imgDisplay={'none'} width={'20rem'} onclick={handlerContinue} />
                    </div>
                    :
                    step == 2 ?
                        <RegisterStep2 step={step} setStep={setStep} preEmail={email}/>
                        :
                        step == 3 &&
                        <RegisterStep3 step={step} />
            }
        </div>
    )
}

export default Register;