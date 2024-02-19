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
    
        {exercises.map((exercise) => {
            return (
                <>
                <div className="planBlock">
                    <h2 key={exercise.id} className="title"  onClick={() => setDetailsId(exercise.id)}>{exercise.name}</h2>
                    <div>
                    <button className="button-74" onClick={() => navigate(`${exercise.id}`)}>View</button>
                    </div>
                    <div>
                    <button className="button-74" onClick={() => navigate(`editexercise/${exercise.id}`)}>Edit</button>
                    </div>
                    <div>
                    <button className="button-74" onClick={() => handleDelete(exercise.id)}>Delete</button> 
                    </div>
                 </div>
                 </>
            )}) }
        </>

    )
}