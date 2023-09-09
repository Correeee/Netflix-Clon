import React from 'react'
import './style.css'
import Btn from '../../../../components/button/button'
import { useNavigate } from 'react-router-dom'

const RegisterStep3 = ({ step, setStep }) => {

    const navigate = useNavigate()

    return (
        <div className='RegisterStep3'>
            <p>Step <strong>{step}</strong> of 3</p>
            <div className='RegisterStep3Texts'>
                <h1>Account created!</h1>
                <Btn text={'Begin'} onclick={() => navigate('/browse')} imgDisplay={'none'} width={'20rem'} />
            </div>
        </div>
    )
}

export default RegisterStep3