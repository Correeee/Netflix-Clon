import React, { useEffect, useState } from 'react'
import './style.css'
import { motion } from 'framer-motion'
import edit from '../assets/edit.png'
import { doc, getDoc, getDocs, updateDoc } from '@firebase/firestore'
import { db } from '../../../firebase/firebase'
import SelectionImage from './selectionImage/selectionImage'
import { useTranslation } from 'react-i18next'

const EditProfile = ({ profileSelected, setProfileSelected, userData, setUserData }) => {

    const [profileName, setProfileName] = useState(profileSelected.name)
    const [selectedImage, setSelectedImage] = useState(profileSelected.image)
    const [selectionImage, setSelectionImage] = useState(false)

    const { t } = useTranslation(["lang"])

    const profileRef = doc(db, 'users', userData.id)

    useEffect(() => {
        
    }, [userData, selectedImage])


    const handlerUpdateProfile = async () => {
        try {
            if (profileName) {
                let user = await getDoc(profileRef)
                
                user = {
                    ...user.data(),
                    id: userData.id
                }

                const lastProfiles = user.profiles.filter(prof => prof.id !== profileSelected.id)
                const actualProfile = user.profiles.filter(prof => prof.id === profileSelected.id)[0]
                const newProfile = {
                    id: profileSelected.id,
                    image: selectedImage,
                    name: profileName,
                    list: [...actualProfile.list],
                    likes: [...actualProfile.likes]
                }
                const update = {
                    ...user,
                    profiles: [...lastProfiles, newProfile]
                }

                await updateDoc(profileRef, update)
                setUserData(update)
                setProfileSelected(false)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handlerDelete = async () => {
        try {
            let user = await getDoc(profileRef)
            user = {
                ...user.data(),
                id: userData.id
            }

            const lastProfiles = user.profiles.filter(prof => prof.id !== profileSelected.id)
            const foundedProfile = user.profiles.find(prof => prof.id === profileSelected.id).id
            const update = {
                ...user,
                profiles: [...lastProfiles]
            }

            if (foundedProfile != 1) {
                await updateDoc(profileRef, update)
                setUserData(update)
                setProfileSelected(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                !selectionImage ?
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.2
                        }}
                        className='EditProfile'>
                        <div className='EditProfile__container'>
                            <form action="">
                                <div className='EditProfile__imageContainer' onClick={() => setSelectionImage(true)}>
                                    <img src={selectedImage.image ? selectedImage.image : selectedImage} alt="Profile Image" className='EditProfile__containerImg' />
                                    <img src={edit} alt="edit" className='EditProfile__imageContainer-edit' />
                                </div>
                                <div>
                                    <input type="text" placeholder='Name' defaultValue={profileName} onChange={(e) => setProfileName(e.target.value)} className='inputName' />
                                    <p style={{ visibility: profileName ? 'hidden' : 'visible' }}>{t("ENTERNAME")}</p>
                                </div>
                            </form>
                            <span></span>
                            <div className='EditProfile__containerBtns'>
                                <div>
                                    <button onClick={handlerUpdateProfile}>{t("MANAGEPROFILE_BTN3")}</button>
                                    <button onClick={() => setProfileSelected(false)}>{t("MANAGEPROFILE_BTN4")}</button>
                                </div>
                                <div>
                                    {
                                        profileSelected.id != 1 &&
                                        <button onClick={handlerDelete}>{t("DELETEPROFILE")}</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    :
                    <SelectionImage selectedImage={selectedImage} profileName={profileName} setSelectionImage={setSelectionImage} setSelectedImage={setSelectedImage} />
            }
        </>
    )
}

export default EditProfile