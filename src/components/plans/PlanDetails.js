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
        <div className="container">
            <div className="bigPlanBlock">
                <h1 className="title">{plan.name}</h1>
                    <h2 className="title">Plan Exercises</h2>
                    <ul>
                    {planExercises? (
                        planExercises.map((e) => {
                            return (
                                <div>
                                <li><h4 className="bubble">{e.name}</h4></li>
                                </div>    
                        )})
                    ) : ("")}
                    </ul>   
            </div>
        </div>
        </>
    )
}