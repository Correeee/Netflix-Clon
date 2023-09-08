import React, { useContext } from 'react'
import './style.css'
import { motion } from 'framer-motion'
import { AuthContext } from '../../context/authContext'
import Login from '../login/login'

const Explorer = () => {
    const { isLogin } = useContext(AuthContext)
    return (
        <>
            {
                isLogin ?
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.2
                        }}
                        className='Explorer'></motion.div>
                    :
                    <Login />
            }
        </>
    )
}

export default Explorer