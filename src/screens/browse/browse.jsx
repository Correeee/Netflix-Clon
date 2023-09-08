import React, { useContext, useState } from 'react'
import './style.css'
import BrowsePrincipal from '../browsePrincipal/browsePrincipal'
import { AuthContext } from '../../context/authContext'
import Login from '../login/login'
import Profiles from '../profiles/profiles'
import { useEffect } from 'react'

const Browse = () => {
    const { isLogin, userData, selectedProfile, setSelectedProfile } = useContext(AuthContext)

    useEffect(() => {

    }, [selectedProfile])

    return (
        <>
            {
                isLogin
                    ?
                    <>
                        {
                            !selectedProfile ?
                                <Profiles />
                                :
                                <BrowsePrincipal />
                        }
                    </>
                    :
                    <Login />
            }
        </>
    )
}

export default Browse