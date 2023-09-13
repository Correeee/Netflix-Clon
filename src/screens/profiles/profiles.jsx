import React, { useContext } from 'react'
import './style.css'
import { AuthContext } from '../../context/authContext'
import Home from '../home/home'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import BrowsePrincipal from '../browsePrincipal/browsePrincipal'

const Profiles = () => {
    const { userData, isLogin, selectedProfile, setSelectedProfile } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {

    }, [userData])

    const handlerProfile = (profile) => {
        setSelectedProfile(profile)
        navigate('/browse')
    }

    return (
        <>
            {
                isLogin ?
                    <>
                        {
                            !selectedProfile ?
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.2
                                    }}
                                    className='Profiles'>
                                    <h1>Who are you watching now?</h1>
                                    <div className='Profiles__prof'>
                                        <div className='Profiles__profUser'>
                                            {
                                                userData && userData.profiles.sort((a, b) => a.id - b.id).map((prof, i) => {
                                                    return (
                                                        <div key={i} onClick={() => handlerProfile(prof)}>
                                                            <img src={prof.image} alt="Profile Image" className='Profiles__profImg' />
                                                            <h2>{prof.name}</h2>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <button onClick={() => navigate('/manageprofiles')}>Manage profiles</button>
                                </motion.div>
                                :
                                <BrowsePrincipal />
                        }
                    </>
                    :
                    <Home />
            }
        </>
    )
}

export default Profiles