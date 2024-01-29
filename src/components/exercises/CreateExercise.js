import { useState } from "react"
import { CreatePracticeExercise } from "../../services/ExerciseService"
import { useNavigate } from "react-router-dom"


export const CreateExercise = ( {currentUser} ) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    const handleSave = () => {
        const exerciseObject = {
            "userId": currentUser.id,
            "name": name,
            "description": description
        }
        CreatePracticeExercise(exerciseObject)
        navigate("/exercises")
    }

    return (
        <>
        <h2>Create An Exercise</h2>
        <input
        type="text"
        placeholder="Exercise Name"
        onChange={(e) => setName(e.target.value)}
        ></input>
        <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button onClick={handleSave}>Save</button>
        </>
    )
}