import React, { useContext, useState } from 'react'
import './style.css'
import Btn from '../../../components/button/button'
import { useEffect } from 'react'
import { registerAccount } from '../../../data/userFn'
import { signOut } from '@firebase/auth'
import { auth } from '../../../firebase/firebase'
import { AuthContext } from '../../../context/authContext'
import { useTranslation } from 'react-i18next'

const RegisterStep2 = ({ step, setStep, preEmail }) => {

    const [name, setName] = useState()
    const [lastname, setLastname] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [secondPassword, setSecondPassword] = useState()

    const { setIsLogin, setUserData, isLogin, userData, setSelectedProfile, selectedProfile, setUser } = useContext(AuthContext)

    const { t } = useTranslation(["lang"])

    useEffect(() => {
        setEmail(preEmail)
    }, [])


    const handlerContinue = async (e) => {
        try {
            e.preventDefault()

            if (password == secondPassword) {
                if (email, password, name, lastname, phone) {
                    await signOut(auth)
                    setIsLogin(false)
                    setUserData([])
                    setSelectedProfile(null)
                    setUser([])
                    await registerAccount(email, password, name, lastname, phone)
                    setStep(3)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const isEmail = (email) => {

        var pathern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (pathern.test(email)) {
            setEmail(email)
        } else {
            setEmail(null)
        }

    }

    const isPhone = (phone) => {

        var pathern = /^[0-9]+$/;

        if (pathern.test(phone)) {
            setPhone(phone)
        } else {
            setPhone(null)
        }
    }

    const passwordHaveANumber = (password) => {

        var pathern = /\d/;

        if (pathern.test(password)) {
            setPassword(password)
        } else {
            setPassword(null)
        }
    }


    return (
        <div className='RegisterStep2'>
            <p>{t("REGISTER_STEP1_STEP1")}<strong>{step}</strong>{t("REGISTER_STEP1_STEP2")}3</p>
            <h1>{t("REGISTER_STEP2_STEP1")}</h1>
            <div className='textDiv'>
                <h2>{t("REGISTER_STEP2_STEP2")}</h2>
                <h2>{t("REGISTER_STEP2_STEP3")}</h2>
            </div>
            <div className='formDiv'>
                <form className='formRegister' id='formRegister'>
                    <div>
                        <input type="text" placeholder={t("REGISTER_STEP_INPUT_NAME")} onChange={(e) => {
                            const inputName = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            setName(inputName.trim())
                        }} required={true} />
                        <p style={{ visibility: name ? 'hidden' : 'visible' }}>{t("YOU_MUST_NAME")}</p>
                    </div>
                    <div>
                        <input type="text" placeholder={t("REGISTER_STEP_INPUT_LASTNAME")} onChange={(e) => {
                            const inputLastname = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            setLastname(inputLastname.trim())
                        }} required={true} />
                        <p style={{ visibility: lastname ? 'hidden' : 'visible' }}>{t("YOU_MUST_LASTNAME")}</p>
                    </div>
                    <div>
                        <input type="text" placeholder={t("REGISTER_STEP_INPUT_PHONE")} onChange={(e) => isPhone(e.target.value)} required={true} />
                        <p style={{ visibility: phone ? 'hidden' : 'visible' }}>{t("YOU_MUST_PHONE")}</p>
                    </div>
                    <div>
                        <input type="email" placeholder={t("REGISTER_STEP_INPUT_EMAIL")} defaultValue={preEmail} onChange={(e) => isEmail(e.target.value)} autoComplete='off' required={true} />
                        <p style={{ visibility: email ? 'hidden' : 'visible' }}>{t("YOU_MUST_EMAIL")}</p>
                    </div>
                    <div>
                        <input type="password" placeholder={t("REGISTER_STEP_INPUT_PASSWORD")} onChange={(e) => passwordHaveANumber(e.target.value)} autoComplete='off' required={true} />
                        <p style={{ color: 'green' }}>{t("MUST_CONTAIN_NUMBER")}</p>
                        <p style={{ visibility: password ? 'hidden' : 'visible' }}>{t("YOU_MUST_PASSWORD")}</p>
                    </div>
                    <div>
                        <input type="password" placeholder={t("REGISTER_STEP_INPUT_PASSWORD")} onChange={(e) => setSecondPassword(e.target.value)} autoComplete='off' required={true} />
                        <p style={{ visibility: password === secondPassword ? 'hidden' : 'visible' }}>{t("PASSWORD_MATCH")}</p>
                    </div>
                </form>
                <Btn text={t("REGISTER_STEP1_BTN")} imgDisplay={'none'} width={'20rem'} onclick={(e) => handlerContinue(e)} form={'formRegister'} />
            </div>
        </div>
    )
}

export default RegisterStep2