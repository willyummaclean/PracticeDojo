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
        <div className="container">
            <div className="planBlock">
                <h2 className="title">Update Your Profile</h2>
                <form>
                    <div>
                        <input
                        type="text"
                        id="fullName"
                        className="button-74"
                        placeholder={currentProfile.fullName}
                        onChange={updateUser}
                        />
                    </div>
                    <div>
                        <input
                        type="text"
                        id="email"
                        className="button-74"
                        placeholder={currentProfile.email}
                        onChange={updateUser}
                        />
                    </div>
                    <button className="button-74" onClick={() => handleUpdate(updatedProfile)}>Save</button>
                </form>
            </div>
        </div>
        </>
    )
}