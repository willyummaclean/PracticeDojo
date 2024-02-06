import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllPlans } from "../../services/PlanService"
import { editPracticeDay, getPracticeDayById } from "../../services/PracticeDayService"


export const EditPracticeDay = ({currentUser}) => {
    const { practicedayId } = useParams() 
    const [plan, setPlan] = useState(0)
    const [plans, setPlans] = useState([])
    const [userPlans, setUserPlans] = useState([])
    const [practiceDay, setPracticeDay] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getAllPlans().then((plans) => setPlans(plans))
    }, [])

    useEffect(() => {
        const userid = currentUser.id
        const userPlansData = plans.filter((plan) => plan.userId === userid)
        setUserPlans(userPlansData)
    }, [currentUser, plans])


    useEffect(() => {
        getPracticeDayById(practicedayId).then((day) => setPracticeDay(day))

    }, [practicedayId])

    const handlePlan = (event) => {
        setPlan(parseInt(event.target.value))
    }
    
    const handleSave = () => {
        const practiceDayObject = {
            "date": practiceDay.date,
            "planId": plan,
            "id": practiceDay.id
        }
        editPracticeDay(practiceDayObject)
        navigate("/practicedays")
    }


    return (
         <>
        <h2>Edit Practice Day</h2>
        <div>
           <h1>{practiceDay.date}</h1>
        </div>
        <div>
            <label htmlFor="plan-select"></label>
                <select name="plans" id="plan-select"
                onChange={(event) => handlePlan(event)}>
                    <option value="">--Please choose a Plan--</option>
                    {userPlans.map((p) => {
                    return (
                        <option value={p.id}>{p.name}</option>
                    ) })}
                </select>
            <button onClick={() => handleSave()}>Save</button>
        </div>
        </>
    )
    
}