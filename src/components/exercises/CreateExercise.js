import { useEffect, useState } from "react"
import { CreatePracticeExercise } from "../../services/ExerciseService"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../services/CategoryService"


export const CreateExercise = ( {currentUser} ) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState(0)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then((data) => setCategories(data))
    }, [])

    const handleSave = () => {
        const exerciseObject = {
            "userId": currentUser.id,
            "name": name,
            "categoryId": parseInt(categoryId),
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
        <label for="category-select"></label>
            <select name="categories" id="category-select" 
            onChange={(event) => setCategoryId(event.target.value) }>
                <option value="">--Please choose a Category--</option>
                {categories.map((m) => {
                return (
                    <option value={m.id}>{m.name}</option>
                ) })}
            </select>
        <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button onClick={handleSave}>Save</button>
        </>
    )
}