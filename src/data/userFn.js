import { collection, doc, getDoc, getDocs, updateDoc } from "@firebase/firestore"
import { db } from "../firebase/firebase"

export const addToList = async (film, userData, selectedProfile) => {
    const userReference = doc(db, 'users', userData.id)
    const response = await getDoc(userReference)
    const user = response.data()
    const profile = user.profiles.find((prof) => prof.id === selectedProfile.id)
    const filmNotExist = profile.list.filter((li) => li.id != film.id)
    const filmExist = profile.list.filter((li) => li.id == film.id)

    if (!filmExist.length) {
        const newProfile = {
            ...profile,
            list: [
                ...filmNotExist,
                film
            ]
        }

        const userUpdate = {
            ...user,
            profiles: [newProfile]
        }

        await updateDoc(userReference, userUpdate)

    } else {
        const newProfile = {
            ...profile,
            list: [
                ...filmNotExist
            ]
        }

        const userUpdate = {
            ...user,
            profiles: [newProfile]
        }

        await updateDoc(userReference, userUpdate)
    }

}

export const addToLike = async (film, userData, selectedProfile) => {
    const userReference = doc(db, 'users', userData.id)
    const response = await getDoc(userReference)
    const user = response.data()
    const profile = user.profiles.find((prof) => prof.id === selectedProfile.id)
    const filmNotExist = profile.likes.filter((li) => li.id != film.id)
    const filmExist = profile.likes.filter((li) => li.id == film.id)

    if (!filmExist.length) {
        const newProfile = {
            ...profile,
            likes: [
                ...filmNotExist,
                film
            ]
        }

        const userUpdate = {
            ...user,
            profiles: [newProfile]
        }

        await updateDoc(userReference, userUpdate)

    } else {
        const newProfile = {
            ...profile,
            likes: [
                ...filmNotExist
            ]
        }

        const userUpdate = {
            ...user,
            profiles: [newProfile]
        }

        await updateDoc(userReference, userUpdate)
    }

}

export const getProfileData = async (userData, selectedProfile) => {
    try {
        const userRef = doc(db, 'users', userData.id)
        let response = await getDoc(userRef)
        response = response.data()
        const updateProfile = response.profiles.filter((prof) => prof.id === selectedProfile.id)[0]
        return updateProfile
    } catch (error) {
        console.log(error)
    }
}