import { Link, useNavigate } from "react-router-dom"


export const Navbar = () => {
    const navigate = useNavigate()

    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/myplans">My Plans</Link>
            </li>
            <li>
                <Link to="/updateprofile">Update Profile</Link>
            </li>
            <li>
                <Link to="/exercises">Exercises</Link>
            </li>

            {localStorage.getItem("musician_user") ? (
                <li>
                    <Link
                    to=""
                    onClick={() => {
                        localStorage.removeItem("musician_user")
                        navigate("/login", { replace: true })
                    }}
                    >
                    Logout
                    </Link>
                </li>
                ) : (
                ""
                )}
        </ul>
    )
}