import React from 'react'
import './style.css'
import Btn from '../../components/button/button';
import Navbar from '../../components/navbar/navbar';

const Home = () => {

    return (
        <div className="Home">
            <Navbar />
            <div className='Screen__filter'></div>
            <div className='Home__texts'>
                <h1>Películas y Series ilimitadas y mucho más</h1>
                <h2>Disfruta donde quieras. Cancela cuando quieras.</h2>
                <h3>¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.</h3>
                <div className='Home__form'>
                    <form action="POST" id='createAccount'>
                        <input type="email" name="createAccount" placeholder='Email' />
                    </form>
                    <Btn type={'submit'} form={'createAccount'} text={'Comenzar>'} imgDisplay={'none'}/>
                </div>
            </div>
        </div>
    )
}

export default Home;