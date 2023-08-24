import React from 'react'
import './style.css'
import Btn from '../../components/button/button';
import { useNavigate } from 'react-router-dom';
import logo from '../../components/assets/logo.png'

const Login = () => {
    const navigate = useNavigate()


    const handlerLogin = () => {
        navigate('/browse')
    }

    return (
        <div className='Login'>
            <div className='Screen__filter'></div>
            <img src={logo} alt="logo" className='Login__logo' />
            <div className='Login__container'>
                <div className='Login__filter'></div>
                <div className='Login__all'>
                    <h1>Iniciar sesión</h1>
                    <form action="" id='login'>
                        <input type="email" />
                        <input type="password" />
                    </form>
                    <Btn text={'Iniciar sesión'} width={'100%'} onclick={handlerLogin} />
                    <div className='Login__checkbox'>
                        <div className='Login__checkboxInput'>
                            <input type="checkbox" name="rememberMe" placeholder='Recuérdame' />
                            <h3>Recuérdame</h3>
                        </div>
                        <a href="">¿Necesitas ayuda?</a>
                    </div>
                    <div>
                        <h2>¿Primera vez en Netflix? <a onClick={() => navigate('/')}>Suscríbete ahora.</a></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
