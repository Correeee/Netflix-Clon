import React, { useState } from 'react'
import './style.css'
import back from './assets/back.png'
import { collection, doc, getDocs } from '@firebase/firestore'
import { db } from '../../../../firebase/firebase'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SelectionImage = ({ profileName, selectedImage, setSelectionImage, setSelectedImage }) => {

    const [avatars, setAvatars] = useState([])

    const { t } = useTranslation(["lang"])

    const avatarsCollection = collection(db, 'avatars')

    useEffect(() => {
        getDocs(avatarsCollection)
            .then(data => data.docs.map(data => data.data()))
            .then(data => setAvatars(data))
            .catch(error => console.log(error))
    }, [])

    const handlerOption = (avatar) => {
        setSelectedImage(avatar.image)
        setSelectionImage(false)
    }

    return (
        <div className='SelectionImage'>
            <div className='SelectionImage__bar'>
                <div className='SelectionImage__text'>
                    <img src={back} alt={back} onClick={() => setSelectionImage(false)} />
                    <div>
                        <h1>{t("MANAGEPROFILE_EDIT1")}</h1>
                        <h2>{t("MANAGEPROFILE_EDIT2")}</h2>
                    </div>
                </div>
                <div className='SelectionImage__image'>
                    <h2>{profileName}</h2>
                    <img src={selectedImage.image ? selectedImage.image : selectedImage} alt={profileName} />
                </div>
            </div>
            <div className='SelectionImage__options'>
                {
                    avatars.length && avatars.map((avatar, i) => {
                        return (
                            <img src={avatar.image} alt={avatar.id} key={i} className='avatarOption' onClick={() => handlerOption(avatar)} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SelectionImage