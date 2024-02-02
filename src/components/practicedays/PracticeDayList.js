import { useEffect, useState } from "react"
import { getPlans } from "../../services/UserService"
import { Link, useNavigate } from "react-router-dom"
import { deletePlan, getAllPlans } from "../../services/PlanService"


export const PracticeDayList = ( {currentUser} ) => {
    const [practiceDays, setPracticeDays] = useState([])
    const [plans, setPlans] = useState([])
    const [userPlans, setUserPlans] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const userid = currentUser.id
        const userPlansData = plans.filter((plan) => plan.userId === userid)
        setUserPlans(userPlansData)
    }, [currentUser, plans])

    useEffect(() => {
        // const array = [...userPlans.practicDays]
        //    const array = practiceDaysArray.filter((p) => p.hasOwnProperty.id === true)

       const practiceDaysArray = userPlans.map((u) => {
        return u.practiceDays
       }
       )
       const flatArray = practiceDaysArray.flat()
        setPracticeDays(flatArray)
    }, [userPlans])

    const getAndSetPlans = () => {
        getAllPlans().then((plans) => setPlans(plans))
    }

    useEffect(() => {
        getAndSetPlans()
    }, [])

    const handleDelete = (planId) => {
        deletePlan(planId).then(() => getAndSetPlans())
    }
    return ( 
        <div>
            <h2>My Practice Days</h2>
            <button
            onClick={() => navigate("createpracticeday")} 
            >Create A Practice Day</button>
            <article>
                {practiceDays.map((practiceDay) => {
                    return (
                    <>
                    <div><Link to={`/praticeDay/${practiceDay.id}`}> <p>{practiceDay.date}</p> </Link>
                    <button onClick={() => handleDelete(practiceDay.id)}>Delete</button>
                    <button onClick={() => navigate(`editpracticeday/${practiceDay.id}`)}>Edit</button></div>
                    </>
                    )
                })}
            </article>
        </div>
    )

}