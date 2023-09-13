import React, { useContext, useState } from 'react'
import './style.css'
import Btn from '../../../components/button/button'
import { useEffect } from 'react'
import { registerAccount } from '../../../data/userFn'
import { signOut } from '@firebase/auth'
import { auth } from '../../../firebase/firebase'
import { AuthContext } from '../../../context/authContext'

const RegisterStep2 = ({ step, setStep, preEmail }) => {

    const [name, setName] = useState()
    const [lastname, setLastname] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [secondPassword, setSecondPassword] = useState()

    const { setIsLogin, setUserData, isLogin, userData, setSelectedProfile, selectedProfile, setUser } = useContext(AuthContext)

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
            <p>Step <strong>{step}</strong> de 3</p>
            <h1>Create a password to start your membership</h1>
            <div className='textDiv'>
                <h2>A few more steps and you're done!</h2>
                <h2>We don't like paperwork either.</h2>
            </div>
            <div className='formDiv'>
                <form className='formRegister' id='formRegister'>
                    <div>
                        <input type="text" placeholder='name' onChange={(e) => {
                            const inputName = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            setName(inputName.trim())
                        }} required={true} />
                        <p style={{ visibility: name ? 'hidden' : 'visible' }}>You must enter a name</p>
                    </div>
                    <div>
                        <input type="text" placeholder='lastname' onChange={(e) => {
                            const inputLastname = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            setLastname(inputLastname.trim())
                        }} required={true} />
                        <p style={{ visibility: lastname ? 'hidden' : 'visible' }}>You must enter a lastname</p>
                    </div>
                    <div>
                        <input type="text" placeholder='phone' onChange={(e) => isPhone(e.target.value)} required={true} />
                        <p style={{ visibility: phone ? 'hidden' : 'visible' }}>You must enter a phone</p>
                    </div>
                    <div>
                        <input type="email" placeholder='email' defaultValue={preEmail} onChange={(e) => isEmail(e.target.value)} autoComplete='off' required={true} />
                        <p style={{ visibility: email ? 'hidden' : 'visible' }}>You must enter a email</p>
                    </div>
                    <div>
                        <input type="password" placeholder='password' onChange={(e) => passwordHaveANumber(e.target.value)} autoComplete='off' required={true} />
                        <p style={{ color: 'green' }}>It must contain at least one number.</p>
                        <p style={{ visibility: password ? 'hidden' : 'visible' }}>You must enter a password</p>
                    </div>
                    <div>
                        <input type="password" placeholder='password' onChange={(e) => setSecondPassword(e.target.value)} autoComplete='off' required={true} />
                        <p style={{ visibility: password === secondPassword ? 'hidden' : 'visible' }}>Passwords do not match.</p>
                    </div>
                </form>
                <Btn text={'Continue'} imgDisplay={'none'} width={'20rem'} onclick={(e) => handlerContinue(e)} form={'formRegister'} />
            </div>
        </div>
    )
}

export default RegisterStep2