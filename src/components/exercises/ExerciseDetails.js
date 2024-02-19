import { useEffect, useState } from "react"
import { getExerciseById } from "../../services/ExerciseService"
import { getCategories } from "../../services/CategoryService"
import { useParams } from "react-router-dom"


export const ExerciseDetails = ( ) => {
    const [exercise, setExercise] = useState({})
    const [category, setCategory] = useState({})
    const { exerciseId } = useParams()
    
    useEffect(() => {
        getExerciseById(exerciseId).then((data) => setExercise(data)) 
    }, [exerciseId])

    useEffect(() => {
        getCategories().then((categories) => categories.filter((c) => c.id === exercise.categoryId)).then((data) => setCategory(data[0]))
        
    }, [exercise])
   
    return (
        <>
        <div className="container">
            <div className="bigPlanBlock">
                <h1 className="title">Exercise Details</h1>
                <div><p className="bubble">Exercise Name:</p><p className="bubble"> {exercise.name}</p></div>
                <div><p className="bubble">Description:</p><p className="bubble">  {exercise.description}</p></div>
                <div><p className="bubble">Category:</p><p className="bubble">{category?.name}</p></div>
            </div>
        </div>
        </>
    )
}