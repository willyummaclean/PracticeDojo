import { useEffect, useState } from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import { PlanList } from "../components/plans/PlanList"
import { Navbar } from "../components/navbar/Navbar"
import { Home } from "../components/plans/Home"
import { UpdateProfile } from "../components/auth/UpdateProfile"
import { PlanDetails } from "../components/plans/PlanDetails"


export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

useEffect(() => {
    const localMuscianUser = localStorage.getItem("musician_user")
    const MusicianUser = JSON.parse(localMuscianUser)
    setCurrentUser(MusicianUser)
}, [])

    return (
        <Routes> 
            <Route
            path="/"
            element={
              <>
                <Navbar />
                <Outlet />
              </>
            }
            >
            <Route index element={<Home />}/>
            <Route path="myplans" element={<PlanList currentUser={currentUser}/>}>
                <Route path=":planId" element={<PlanDetails currentUser={currentUser}/>} /> 
            </Route>
            <Route path="updateprofile" element={<UpdateProfile currentUser={currentUser} />} />
            </Route>
        </Routes>
    )
}   