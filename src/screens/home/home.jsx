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
                <h1>Unlimited Movies and Series and much more</h1>
                <h2>Enjoy wherever you want. Cancel whenever you want.</h2>
                <h3>Do you want to watch Netflix now? Enter your email to create an account or restart your Netflix membership.</h3>
                <div className='Home__form'>
                    <form action="POST" id='createAccount'>
                        <input type="email" name="createAccount" placeholder='Email' />
                    </form>
                    <Btn type={'submit'} form={'createAccount'} text={'Begin>'} imgDisplay={'none'}/>
                </div>
            </div>
        </div>
    )
}

export default Home;