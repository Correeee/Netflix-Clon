import React from "react";
import './style.css'
import logo from '../../components/assets/logo.png'
import { Link, useParams } from "react-router-dom";
import Btn from "../../components/button/button";
import popCorn from './assets/popcorn.png'
import { useState } from "react";
import RegisterStep2 from "./registerStep2/registerStep2";
import RegisterStep3 from "./registerStep2/registerStep3.jsx/registerStep3";
import { useTranslation } from "react-i18next";
import ScrollToTop from "../../components/scrollToTop/scrollToTop";

const Register = () => {

    const [step, setStep] = useState(1)
    const { email } = useParams()
    const { t } = useTranslation(["lang"])

    const handlerContinue = () => {
        setStep(2)
    }
    /* --------- NO PERMITIR INGRESAR SI NO LE LLEGA UN MAIL CON FORMATO -------- */
    return (
        <div className="Register">
            <ScrollToTop />
            <div className="Register__topBar">
                <img src={logo} alt="logo" className="Register__logo" />
                <Link to={'/login'}>{t("HOME_LOGIN")}</Link>
            </div>
            {
                step === 1 ?
                    <div className="Register__complete">
                        <img src={popCorn} alt="background image" />
                        <p>{t("REGISTER_STEP1_STEP1")}<strong>{step}</strong>{t("REGISTER_STEP1_STEP2")}3</p>
                        <h1>{t("REGISTER_STEP1_STEP3")}</h1>
                        <h2>{t("REGISTER_STEP1_STEP4")}</h2>
                        <Btn text={t("REGISTER_STEP1_BTN")} imgDisplay={'none'} width={'20rem'} onclick={handlerContinue} />
                    </div>
                    :
                    step == 2 ?
                        <RegisterStep2 step={step} setStep={setStep} preEmail={email} />
                        :
                        step == 3 &&
                        <RegisterStep3 step={step} />
            }
        </div>
    )
}

export default Register;