import { useEffect, useState } from "react"
import { deleteExercise, getExercises } from "../../services/ExerciseService"
import { useNavigate } from "react-router-dom"


export const ExerciseList = ( {setDetailsId} ) => {
    const [exercises, setExercises] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
       getAndSetExercises()
    }, [])

    const getAndSetExercises = () => {
        getExercises().then((data) => setExercises(data))
    }

    const handleDelete = (exerciseId) => {
        deleteExercise(exerciseId).then(() => getAndSetExercises())
    }

    return (
        <>
        <h2>Exercises</h2>
        <ul>
        {exercises.map((exercise) => {
            return (
                <>
                <li key={exercise.id} onClick={() => setDetailsId(exercise.id)}>{exercise.name}</li>
                 <button onClick={() => handleDelete(exercise.id)}>Delete</button>
                 <button onClick={() => navigate(`editexercise/${exercise.id}`)}>Edit</button>
                 </>
            )}) }
        </ul>
        </>

    )
}