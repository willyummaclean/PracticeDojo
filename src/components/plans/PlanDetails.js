import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlanById } from "../../services/PlanService"


export const PlanDetails = ( {currentUser} ) => {
    const [plan, setPlan] = useState({})
    const {planId} = useParams()
    
    useEffect(() => {
        getPlanById(planId).then((planObject) => setPlan(planObject) )
    }, [planId])

    return (
        <>
        <div>
        <h2>{plan.name}</h2>
        </div>
        </>
    )
}