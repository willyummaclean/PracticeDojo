import { useState } from "react"
import { createPracticePlan } from "../../services/PlanService"
import { useNavigate } from "react-router-dom"


export const CreatePlan = ( {currentUser} ) => {
    const [exercises, setExercises] = useState([])
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const handleSave = () => {
        const planObject = {
            "userId": currentUser.id,
            "name": name
        }
        createPracticePlan(planObject)
        navigate("/myplans")
    }

    return (
        <>
        <h2>Create Plan</h2>
        <input
        type="text"
        placeholder="Plan Name"
        onChange={(e) => setName(e.target.value)}
        ></input>
        <input
        type="text"
        placeholder="Search Exercises"
        />
        <button onClick={handleSave}>Save</button>
        </>
    )
}