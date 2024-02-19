import { useEffect, useState } from "react"
import { getAllPlans } from "../../services/PlanService"
import { createPracticeDay } from "../../services/PracticeDayService"
import { useNavigate } from "react-router-dom"

export const CreatePracticeDay =  ( {currentUser} ) => {
    const [date, setDate] = useState("")
    const [plan, setPlan] = useState(0)
    const [plans, setPlans] = useState([])
    const [userPlans, setUserPlans] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllPlans().then((plans) => setPlans(plans))
        
    }, [])

    useEffect(() => {
        plans.filter((p) => p.userId === currentUser.id)   
    }, [plans, currentUser])


    useEffect(() => {
        const userid = currentUser.id
        const userPlansData = plans.filter((plan) => plan.userId === userid)
        setUserPlans(userPlansData)
    }, [currentUser, plans])

    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
      }

    useEffect(() => {
        let date = getDate()
        setDate(date)

    }, [])

    const handlePlan = (event) => {
        setPlan(parseInt(event.target.value))
    }
    
    const handleSave = () => {
        const practiceDayObject = {
            "date": date,
            "planId": plan
        }
        createPracticeDay(practiceDayObject)
        navigate("/practicedays")
    }


    return (
        <>
        <div className="container">
            <div className="bigPlanBlock">   
                <h2 className="title">Log a Practice Day</h2>
                <div>
                <h1 className="title">{date}</h1>
                </div>
                <div>
                    <label htmlFor="plan-select"></label>
                        <select name="plans" id="plan-select" className="bubble" 
                        onChange={(event) => handlePlan(event)}>
                            <option value="">--Please choose a Plan--</option>
                            {userPlans.map((p) => {
                            return (
                                <option value={p.id}>{p.name}</option>
                            ) })}
                        </select>
                    <h4><button className="button-74" onClick={() => handleSave()}>Save</button></h4>
                </div>
            </div>
        </div>
        </>
    )
}
