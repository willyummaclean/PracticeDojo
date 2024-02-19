import { useEffect, useState } from "react"
import { getExercises } from "../../services/ExerciseService"
import { ExerciseList } from "./ExerciseList"
import { ExerciseDetails } from "./ExerciseDetails"
import { useNavigate } from "react-router-dom"


export const Exercises = () => {
    const [exercises, setExercises] = useState([])
    const [detailsId, setDetailsId] = useState(null)
    const navigate = useNavigate()

 

    return (
        <>
        <div className="container">
            <div class="title-container">
                <h1 className="title">Exercises</h1>
            </div>
            <div className="planBlock">
                <button className="button-74" onClick={() => navigate("createexercise")}>Create Exercise</button>
            </div>
                <ExerciseList setDetailsId={setDetailsId}/>  
        </div>
        </>
    )
}

// {detailsId?
//     (
//     <ExerciseDetails detailsId={detailsId}/>
//     ) : ""
//     } 