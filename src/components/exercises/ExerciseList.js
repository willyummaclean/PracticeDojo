import { useEffect, useState } from "react"
import { getExercises } from "../../services/ExerciseService"


export const ExerciseList = ( {setDetailsId} ) => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        getExercises().then((data) => setExercises(data))
    }, [])


    return (
        <>
        <h2>Exercises</h2>
        <ul>
        {exercises.map((exercise) => {
            return (
                <li key={exercise.id} onClick={() => setDetailsId(exercise.id)}>{exercise.name}</li>
            )}) }
        </ul>
        </>

    )
}