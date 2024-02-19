import { useEffect, useState } from "react"
import { getPlans } from "../../services/UserService"
import { Link, useNavigate } from "react-router-dom"
import { deletePlan } from "../../services/PlanService"
import "./Plans.css"


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
            <div className="container">
                <div  className="title-container">
                    <h2 className="title">My Plans</h2>
                </div>
                <div className="planBlock">
                    <button className="button-74"
                    onClick={() => navigate("createplan")} 
                    >Create Plan</button>
                </div>
            
            <article className="planContainer">
                {userPlans.map((plan) => {
                    return (
                    <>
                    <div  className="planBlock">
                        <h4 className="planTitle">{plan.name}</h4> 
                        <button className="button-74" onClick={() => navigate(`/myplans/${plan.id}`)}>View</button>
                        <button className="button-74" onClick={() => navigate(`editplan/${plan.id}`)}>Edit</button>
                        <button className="button-74" onClick={() => handleDelete(plan.id)}>Delete</button>
                    </div>
                    </>
                    )
                })}
            </article>
            </div>
           
        </div>
    )

}