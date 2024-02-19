import { useEffect, useState } from "react"
import { getPlans } from "../../services/UserService"
import { Link, useNavigate } from "react-router-dom"
import { deletePlan, getAllPlans } from "../../services/PlanService"
import { deletePracticeDay } from "../../services/PracticeDayService"


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
       })
       const flatArray = practiceDaysArray.flat()
        setPracticeDays(flatArray)
    }, [userPlans])

    const getAndSetPlans = () => {
        getAllPlans().then((plans) => setPlans(plans))
    }

    useEffect(() => {
        getAndSetPlans()
    }, [])

    const handleDelete = (practiceDayId) => {
        deletePracticeDay(practiceDayId).then(() => getAndSetPlans())
    }
    return ( 
        <div className="container">
            <div  className="title-container">
                <h1 className="title">My Practice Days</h1>
            </div>
            <div className="planBlock">
                <button className="button-74"
                onClick={() => navigate("createpracticeday")} 
                >Create Practice Day</button>
            </div>
            <div className="planContainer">
                {practiceDays.map((practiceDay) => {
                    const plan = plans.find((p) => p.id === practiceDay.planId)
                    return (
                    <>
                    <div className="planBlock">
                        <h4 className="planTitle">{practiceDay.date} : {plan.name}</h4> 
                        <button className="button-74" onClick={() => navigate(`/practicedays/${practiceDay.id}`)}>View</button>
                        <button className="button-74" onClick={() => navigate(`/practicedays/edit/${practiceDay.id}`)}>Edit</button>
                        <button className="button-74" onClick={() => handleDelete(practiceDay.id)}>Delete</button>
                    </div>
                    </>
                    )
                })}
            </div>
            
        </div>
    )

}