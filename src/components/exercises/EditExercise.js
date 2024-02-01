import { useEffect, useState } from "react"
import { EditPracticeExercise, getExerciseById } from "../../services/ExerciseService"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../services/CategoryService"


export const EditExercise = ( {currentUser} ) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState(0)
    const [categories, setCategories] = useState([])
    const [exercise, setExercise] = useState({})
    const { exerciseId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then((data) => setCategories(data))
    }, [])

    useEffect(() => {
        getExerciseById(exerciseId).then((exercise) => setExercise(exercise))
    }, [exerciseId])

    useEffect(() => {
        setCategoryId(exercise.categoryId)
    }, [exercise])
    

    const handleSave = () => {
        const exerciseObject = {
            "userId": currentUser.id,
            "name": name,
            "categoryId": parseInt(categoryId),
            "description": description
            
        }
        if (exerciseObject.name === "") {
            exerciseObject.name = exercise.name
        }
        if (exerciseObject.description === "") {
            exerciseObject.description = exercise.description
        }
        if (exerciseObject.categoryId === 0) {
            exerciseObject.categoryId = exercise.categoryId
        }
        EditPracticeExercise(exerciseObject, exerciseId)
        navigate("/exercises")
    }

    return (
        <>
        <h2>Edit Exercise</h2>
        <input
        type="text"
        defaultValue={exercise.name}
        onChange={(e) => setName(e.target.value)}
        ></input>
        <label htmlFor="category-select"></label>
            <select name="categories" id="category-select" value={categoryId}
            onChange={(event) => setCategoryId(parseInt(event.target.value)) }>
                {/* <option value="">--Please choose a Category--</option> */}
                {categories.map((m) => {
                return (
                    <option value={m.id}>{m.name}</option>
                ) })}
            </select>
        <input
        type="text"
        // placeholder="Description"
        defaultValue={exercise.description}
        onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button onClick={handleSave}>Save</button>
        </>
    )
}