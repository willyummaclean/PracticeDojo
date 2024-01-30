import { useEffect, useState } from "react"
import { getExerciseById } from "../../services/ExerciseService"
import { getCategories } from "../../services/CategoryService"


export const ExerciseDetails = ( {detailsId} ) => {
    const [exercise, setExercise] = useState({})
    const [category, setCategory] = useState({})
    
    useEffect(() => {
        getExerciseById(detailsId).then((data) => setExercise(data)) 
    }, [detailsId])

    useEffect(() => {
        getCategories().then((categories) => categories.filter((c) => c.id === exercise.categoryId)).then((data) => setCategory(data[0]))
        
    }, [exercise])
   
    return (
       
        <>
        <div>
            <h2>Exercise Details</h2>
            <p >Exercise Name:  {exercise.name}</p>
            <p>Description:  {exercise.description}</p>
            <p>Category:  {category?.name}</p>
        </div>
        </>
    )
      
}