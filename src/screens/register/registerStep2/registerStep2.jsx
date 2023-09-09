import React, { useState } from 'react'
import './style.css'
import Btn from '../../../components/button/button'
import { useEffect } from 'react'
import { registerAccount } from '../../../data/userFn'

const RegisterStep2 = ({ step, setStep, preEmail }) => {

    const [name, setName] = useState()
    const [lastname, setLastname] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        setEmail(preEmail)
    }, [])


    const handlerContinue = async (e) => {
        try {
            e.preventDefault()
            if (email, password, name, lastname, phone) {
                await registerAccount(email, password, name, lastname, phone)
                setStep(3)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='RegisterStep2'>
            <p>Step <strong>{step}</strong> de 3</p>
            <h1>Create a password to start your membership</h1>
            <div className='textDiv'>
                <h2>A few more steps and you're done!</h2>
                <h2>We don't like paperwork either.</h2>
            </div>
            <div className='formDiv'>
                <form className='formRegister' id='formRegister'>
                    <div>
                        <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} required={true} />
                        <p style={{ visibility: name ? 'hidden' : 'visible' }}>You must enter a name</p>
                    </div>
                    <div>
                        <input type="text" placeholder='lastname' onChange={(e) => setLastname(e.target.value)} required={true} />
                        <p style={{ visibility: lastname ? 'hidden' : 'visible' }}>You must enter a lastname</p>
                    </div>
                    <div>
                        <input type="text" placeholder='phone' onChange={(e) => setPhone(e.target.value)} required={true} />
                        <p style={{ visibility: phone ? 'hidden' : 'visible' }}>You must enter a phone</p>
                    </div>
                    <div>
                        <input type="email" placeholder='email' defaultValue={preEmail} onChange={(e) => setEmail(e.target.value)} autoComplete='off' required={true} />
                        <p style={{ visibility: email ? 'hidden' : 'visible' }}>You must enter a email</p>
                    </div>
                    <div>
                        <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} autoComplete='off' required={true} />
                        <p style={{ visibility: password ? 'hidden' : 'visible' }}>You must enter a password</p>
                    </div>
                </form>
                <Btn text={'Continue'} imgDisplay={'none'} width={'20rem'} onclick={(e) => handlerContinue(e)} form={'formRegister'} />
            </div>
        </div>
    )
}

export default RegisterStep2