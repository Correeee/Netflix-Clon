import React, { useContext } from 'react'
import './style.css'
import Btn from '../../components/button/button';
import { useNavigate } from 'react-router-dom';
import logo from '../../components/assets/logo.png'
import { onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase/firebase';
import { useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Browse from '../browse/browse';


const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isWriting, setIsWriting] = useState(false)

    const { user, setUser, setIsLogin, isLogin } = useContext(AuthContext)


    const handlerLogin = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            if (response) {
                setUser(response)
                navigate('/browse')
            }
        } catch (error) {
            setIsWriting(true)
        }

    }

    return (
        <>
            {
                !isLogin ?
                    <div className='Login'>
                        <div className='Screen__filter'></div>
                        <img src={logo} alt="logo" className='Login__logo' />
                        <div className='Login__container'>
                            <div className='Login__filter'></div>
                            <div className='Login__all'>
                                <h1>Log in</h1>
                                <form id='login' onSubmit={(e) => e.preventDefault()}>
                                    <input type="email" onChange={e => setEmail(e.target.value)} onFocus={() => setIsWriting(false)} />
                                    <input type="password" onChange={e => setPassword(e.target.value)} onFocus={() => setIsWriting(false)} />
                                    <p className='login__error' style={{ visibility: isWriting ? 'visible' : 'hidden' }}>The email or password does not match.</p>
                                </form>
                                <Btn text={'Log in'} width={'100%'} onclick={handlerLogin} imgDisplay={'none'} form={'login'} />
                                <div className='Login__checkbox'>
                                    <div className='Login__checkboxInput'>
                                        <input type="checkbox" name="rememberMe" placeholder='Recuérdame' defaultChecked={false} />
                                        <h3>Remember me</h3>
                                    </div>
                                    <a href="">Need help?</a>
                                </div>
                                <div>
                                    <h2>First time on Netflix? <a onClick={() => navigate('/')}>Subscribe now.</a></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Browse />
            }
        </>
    )
}

export default Login;
