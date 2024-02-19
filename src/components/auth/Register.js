import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserByEmail, createUser } from "../../services/UserService"


export const Register = () => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        const newUser = {
            ...user
        }

        createUser(newUser).then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem(
                "musician_user",
                JSON.stringify({
                    id: createdUser.id,
                })
                )
                navigate("/")
            }
        })
    }

    const handleRegister =(e) => {
      e.preventDefault()
      getUserByEmail(user.email).then((response) => {
        if (response.length > 0) {
            window.alert("An account with that email already exists.")
        } else {
            registerNewUser()
        }
      })
    }

    const updateUser = (e) => {
        const copy = { ...user} 
        copy[e.target.id] = e.target.value
        setUser(copy)
    }

    return (
        <>
        <div className="container">
            <div className="planBlock">
                <h2 className="title">Register Your Account</h2>
                <form>
                    <div>
                        <input
                        type="text"
                        id="fullName"
                        placeholder="Full Name"
                        onChange={updateUser}
                        />
                    </div>
                    <div>
                        <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        onChange={updateUser}
                        />
                    </div>
                    <button onClick={handleRegister}>Register</button>
                </form>
            </div>
        </div>
        </>
    )
}