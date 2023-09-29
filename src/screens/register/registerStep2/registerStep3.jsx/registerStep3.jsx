import React from 'react'
import './style.css'
import Btn from '../../../../components/button/button'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const RegisterStep3 = ({ step, setStep }) => {

    const navigate = useNavigate()
    const {t} = useTranslation(["lang"])

    return (
        <div className='RegisterStep3'>
            <p>{t("REGISTER_STEP1_STEP1")}<strong>{step}</strong>{t("REGISTER_STEP1_STEP2")}3</p>
            <div className='RegisterStep3Texts'>
                <h1>{t("ACCOUNT_CREATED")}</h1>
                <Btn text={t("HOME_BTN")} onclick={() => navigate('/login')} imgDisplay={'none'} width={'20rem'} />
            </div>
        </div>
    )
}

export default RegisterStep3