import { useEffect, useState } from "react"
import { getPlans } from "../../services/UserService"
import { Link, useNavigate } from "react-router-dom"


export const PlanList = ( {currentUser} ) => {
    const [plans, setPlans] = useState([])
    const [userPlans, setUserPlans] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const userid = currentUser.id
        const userPlansData = plans.filter((plan) => plan.userId === userid)
        setUserPlans(userPlansData)
        

    }, [currentUser, plans])

    useEffect(() => {
        getPlans().then((plans) => setPlans(plans))
    }, [])

    return ( 
        <div>
            <h2>My Plans</h2>
            <button
            onClick={() => navigate("createplan")} 
            >Create A New Plan</button>
            <article>
                {userPlans.map((plan) => {
                    return (
                    <Link to={`/myplans/${plan.id}`}> <p>{plan.name}</p> </Link>
                    )
                })}
            </article>
        </div>
    )

}