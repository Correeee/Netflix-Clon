import React, { useState } from 'react'
import './style.css'
import Btn from '../../components/button/button';
import Navbar from '../../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';


const Home = () => {

    const [email, setEmail] = useState()
    const navigate = useNavigate()

    const { t } = useTranslation(["lang"])

    const handlerRegister = () => {
        if (email) {
            navigate(`/register/${email}`)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.2
            }}
            className="Home">
            <Navbar />
            <div className='Screen__filter'></div>
            <div className='Home__texts'>
                <h1>{t("HOME1")}</h1>
                <h2>{t("HOME2")}</h2>
                <h3>{t("HOME3")}</h3>
                <div className='Home__form'>
                    <form action="POST" id='createAccount' onSubmit={e => e.preventDefault()}>
                        <input type="email" name="createAccount" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required={true} />
                    </form>
                    <Btn type={'submit'} form={'createAccount'} text={t("HOME_BTN")} imgDisplay={'none'} onclick={handlerRegister} />
                </div>
            </div>
        </motion.div>
    )
}

export default Home;