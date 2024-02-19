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
        <div className="container">
            <div className="bigPlanBlock">
                <h1 className="title">Create An Exercise</h1>
                <div>
                    <input
                    type="text"
                    className="bubble"
                    placeholder="Exercise Name"
                    onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                <label for="category-select"></label>
                    <select name="categories" id="category-select" className="bubble"
                    onChange={(event) => setCategoryId(event.target.value) }>
                        <option value="">--Please choose a Category--</option>
                        {categories.map((m) => {
                        return (
                            <option value={m.id}>{m.name}</option>
                        ) })}
                    </select>
                </div>
                <div>
                    <input
                    type="text"
                    className="bubble"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>
                <button className="button-74" onClick={handleSave}>Save</button>
            </div>
        </div>
        </>
    )
}