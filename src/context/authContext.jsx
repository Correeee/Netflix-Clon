import { onAuthStateChanged } from '@firebase/auth'
import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { auth, db } from '../firebase/firebase'
import { collection, getDoc, getDocs } from '@firebase/firestore'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([])
    const [isLogin, setIsLogin] = useState(false)
    const [userData, setUserData] = useState([])
    const [selectedProfile, setSelectedProfile] = useState(null)

    const usercollection = collection(db, 'users')

    useEffect(() => {
        onAuthStateChanged(auth, (status) => {
            status && getDocs(usercollection)
                .then(data => data.docs.map(data => {
                    return {
                        id: data.id,
                        ...data.data()
                    }
                }))
                .then(data => data.find(user => user.data.mail == status.email))
                .then(dataUser => {
                    setUserData(dataUser);
                    setIsLogin(true)
                })
                .catch(error => console.log(error))
        })
    }, [user])

    return (
        <AuthContext.Provider value={{
            setUser, user, isLogin, setIsLogin, userData, setUserData, selectedProfile,
            setSelectedProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider