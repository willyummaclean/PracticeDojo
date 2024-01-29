import { useEffect, useState } from "react"
import { getExerciseById } from "../../services/ExerciseService"


export const ExerciseDetails = ( {detailsId} ) => {
    const [exercise, setExercise] = useState({})
    
    useEffect(() => {
        getExerciseById(detailsId).then((data) => setExercise(data)) 
    }, [detailsId])
   
    return (
       
        <>
        <div>
            <h2>Exercise Details</h2>
            <p>----{exercise.name}----</p>
            <p>{exercise.description}</p>
            <p> </p>
        </div>
        </>
    )
      
}