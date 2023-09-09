import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "@firebase/firestore"
import { db, storage } from "../firebase/firebase"
import { createUserWithEmailAndPassword } from "@firebase/auth"

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

export const createProfile = async (userData, name, image) => {
    try {
        const avatars = await getAvatars()
        const indexRandom = Math.floor(Math.random() * avatars.length);
        const avatarRandom = avatars[indexRandom].image;

        const userRef = doc(db, 'users', userData.id)
        const response = await getDoc(userRef)
        const user = response.data()

        if (user.profiles.length <= 5) {
            const allIds = user.profiles.map(prof => prof.id)
            let maxNumber = Math.max(...allIds)
            maxNumber = parseInt(maxNumber)
            maxNumber += 1

            const newProfile = {
                id: maxNumber,
                image: avatarRandom,
                likes: [],
                list: [],
                name: `New profile ${maxNumber}`
            }

            const userUpdate = {
                ...user,
                profiles: [...user.profiles, newProfile]
            }

            await updateDoc(userRef, userUpdate)
        }

    } catch (error) {
        console.log(error)
    }
}

export const getUserData = async (userData) => {
    try {
        const userRef = doc(db, 'users', userData.id)
        const response = await getDoc(userRef)
        const user = response.data()
        return user
    } catch (error) {
        console.log(error)
    }
}

export const getAvatars = async () => {
    try {
        const avatarsCollection = collection(db, 'avatars')
        let avatars = await getDocs(avatarsCollection)
        avatars = avatars.docs.map(data => data.data())
        return avatars
    } catch (error) {
        console.log(error)
    }
}

export const registerAccount = async (email, password, name, lastname, phone) => {
    try {
        // await createUserWithEmailAndPassword(email, password)
        const newUser = {
            data: {
                name: name,
                lastname: lastname,
                mail: email,
                phone: phone
            },
            profiles: [
                {
                    id: 1,
                    image: 'https://firebasestorage.googleapis.com/v0/b/netflix-clon-a8cd6.appspot.com/o/picture-1.png?alt=media&token=526a4ccf-1d58-444e-b7dc-7a6a96dc8ade',
                    likes: [],
                    list: [],
                    name: 'Principal'
                }
            ],
            user: email
        }

        console.log(newUser)

    } catch (error) {
        console.log(error)
    }
}