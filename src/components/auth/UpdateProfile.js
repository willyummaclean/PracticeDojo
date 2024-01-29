import { useEffect, useState } from "react"
import { UpdateUserProfile, getUserById } from "../../services/UserService"
import { useNavigate } from "react-router-dom"


export const UpdateProfile = ( {currentUser} ) => {
    const [updatedProfile, setUpdatedProfile] = useState({})
    const [currentProfile, setCurrentProfile] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const userid = currentUser.id
        getUserById(userid).then((user) => setCurrentProfile(user) )
    }, [currentUser])

    useEffect(() => {
        let profile = {...currentProfile}
        setUpdatedProfile(profile)

    }, [currentProfile] )

    const updateUser = (e) => {
        const copy = { ...updatedProfile} 
        copy[e.target.id] = e.target.value
        setUpdatedProfile(copy)
    }

    const handleUpdate = (profile) => {
        UpdateUserProfile(profile)
        navigate("/")
    }



    return (
        <>
        <h2>Register Your Account</h2>
            <form>
                <div>
                    <input
                    type="text"
                    id="fullName"
                    placeholder={currentProfile.fullName}
                    onChange={updateUser}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    id="email"
                    placeholder={currentProfile.email}
                    onChange={updateUser}
                    />
                </div>
                <button onClick={() => handleUpdate(updatedProfile)}>Save</button>
            </form>
        </>
    )
}