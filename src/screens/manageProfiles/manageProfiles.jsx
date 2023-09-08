import React, { useContext, useState } from 'react'
import './style.css'
import { AuthContext } from '../../context/authContext'
import Home from '../home/home'
import { motion } from 'framer-motion'
import edit from './assets/edit.png'
import EditProfile from './editProfile/editProfile'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { createProfile, getUserData } from '../../data/userFn'

const ManageManageProfiles = () => {
    const navigate = useNavigate()
    const { isLogin, userData, setUserData } = useContext(AuthContext)

    const [profileSelected, setProfileSelected] = useState(false)

    useEffect(() => {
        
    }, [userData])

    const handlerCreateProfile = async () => {
        try {
            await createProfile(userData)
            const userUpdate = await getUserData(userData)
            setUserData(userUpdate)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            {
                isLogin ?
                    <>
                        {
                            !profileSelected ?
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.2
                                    }}
                                    className='ManageProfiles'>
                                    <h1>Who are you watching now?</h1>
                                    <div className='ManageProfiles__prof'>
                                        <div className='ManageProfiles__profUser'>
                                            {
                                                userData && userData.profiles.map((prof, i) => {
                                                    return (
                                                        <div key={i} onClick={() => setProfileSelected(prof)}>
                                                            <img src={prof.image} alt="Profile Image" className='ManageProfiles__profImg' />
                                                            <h2>{prof.name}</h2>
                                                            <img src={edit} alt="edit" className='edit' />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='ManageProfiles__profUserBtns'>
                                        <button onClick={() => navigate('/profiles')}>Ready</button>
                                        {
                                            userData && userData.profiles.length < 5 &&
                                            <button onClick={handlerCreateProfile}>Add profile</button>
                                        }
                                    </div>
                                </motion.div>
                                :
                                <EditProfile profileSelected={profileSelected} setProfileSelected={setProfileSelected} userData={userData} setUserData={setUserData} />
                        }
                    </>
                    :
                    <Home />
            }
        </>
    )
}

export default ManageManageProfiles