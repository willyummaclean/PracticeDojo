import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/UserService"

export const Login = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
      e.preventDefault()

      return getUserByEmail(email).then((foundUsers) => {
        if (foundUsers.length === 1){
          const user = foundUsers[0]
          localStorage.setItem(
            "musician_user",
            JSON.stringify({
                id: user.id
            })
          )
          navigate("/")
        } else {
            window.alert("invalid login")
        }    
      })
    }

    return (
    <div>
        <h2>Login Page</h2>
        <form>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </form>
        <Link to="/register">Register</Link>
    </div>
    )
}