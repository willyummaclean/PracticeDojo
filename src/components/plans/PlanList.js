import { useEffect, useState } from "react"
import { getPlans } from "../../services/UserService"
import { Link, useNavigate } from "react-router-dom"
import { deletePlan } from "../../services/PlanService"


export const PlanList = ( {currentUser} ) => {
    const [plans, setPlans] = useState([])
    const [userPlans, setUserPlans] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const userid = currentUser.id
        const userPlansData = plans.filter((plan) => plan.userId === userid)
        setUserPlans(userPlansData)
        

    }, [currentUser, plans])

    const getAndSetPlans = () => {
        getPlans().then((plans) => setPlans(plans))
    }

    useEffect(() => {
        getAndSetPlans()
    }, [])

    const handleDelete = (planId) => {
        deletePlan(planId).then(() => getAndSetPlans())
    }
    return ( 
        <div>
            <h2>My Plans</h2>
            <button
            onClick={() => navigate("createplan")} 
            >Create A New Plan</button>
            <article>
                {userPlans.map((plan) => {
                    return (
                    <>
                    <div><Link to={`/myplans/${plan.id}`}> <p>{plan.name}</p> </Link>
                    <button onClick={() => handleDelete(plan.id)}>Delete</button></div>
                    </>
                    )
                })}
            </article>
        </div>
    )

}