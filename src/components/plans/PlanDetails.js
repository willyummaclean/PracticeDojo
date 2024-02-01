import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlanById } from "../../services/PlanService"


export const PlanDetails = ( {currentUser} ) => {
    const [plan, setPlan] = useState({})
    const {planId} = useParams()
    const [planExercises, setPlanExercises] = useState([])

    
    
    useEffect(() => {
        getPlanById(planId).then((planObject) => setPlan(planObject));
    }, [planId])

    useEffect(() => {
        setPlanExercises(plan.planExercises)
    }, [plan]) 


    return (
        <>
        <div>
        <h1>{plan.name}</h1>
        </div>
        <div>
            <h4>Plan Exercises</h4>
            <ul>
            {planExercises? (
                planExercises.map((e) => {
                    return (
                        <div>
                        <li>{e.name}</li>
                        </div>    
                )})
            ) : ("")}
            </ul>   
        </div>
        </>
    )
}