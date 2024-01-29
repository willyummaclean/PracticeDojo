import { useEffect, useState } from "react"
import { getExercises } from "../../services/ExerciseService"
import { ExerciseList } from "./ExerciseList"
import { ExerciseDetails } from "./ExerciseDetails"
import { useNavigate } from "react-router-dom"


export const Exercises = () => {
    const [exercises, setExercises] = useState([])
    const [detailsId, setDetailsId] = useState(1)
    const navigate = useNavigate()

 

    return (
        <>
        <div className="container">
            <div className="row">
                <button onClick={() => navigate("createexercise")}>Create Exercise</button>
                <div className="col-sm-8">
                <ExerciseList setDetailsId={setDetailsId}/>
                </div>
                <div className="col-sm-4">
                <ExerciseDetails detailsId={detailsId}/>
                </div>
            </div>
        </div>
        </>
    )
}