import React from 'react'
import './style.css'
import BrowseNavbar from '../../components/browseNavbar.jsx/browseNavbar'
import { motion } from 'framer-motion'

const MyList = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.2
            }}
            className='MyList'>
            <BrowseNavbar />
            <div className='MyList__container'>
                <h1>My List</h1>

            </div>
        </motion.div>
    )
}

export default MyList