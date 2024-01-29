import { useEffect, useState } from "react"
import { getPlans } from "../../services/UserService"


export const PlanList = ( {currentUser} ) => {
    const [plans, setPlans] = useState([])
    const [userPlans, setUserPlans] = useState([])

    useEffect(() => {
        const userid = currentUser.id
        const array = [{id: 12},{id: 13}]
        const userPlansData = plans.filter((plan) => plan.userId === userid)
        setUserPlans(userPlansData)
        

    }, [currentUser, plans])

    useEffect(() => {
        getPlans().then((plans) => setPlans(plans))
    }, [])

    return ( 
        <div>
            <h2>My Plans</h2>
            <article>
                {userPlans.map((plan) => {
                    return (
                    <p>{plan.name}</p>
                    )
                })}
            </article>
        </div>
    )

}