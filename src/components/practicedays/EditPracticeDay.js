import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllPlans } from "../../services/PlanService"
import { editPracticeDay, getPracticeDayById } from "../../services/PracticeDayService"


export const EditPracticeDay = () => {
    const { practicedayId } = useParams() 
    const [plan, setPlan] = useState(0)
    const [plans, setPlans] = useState([])
    const [practiceDay, setPracticeDay] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getAllPlans().then((plans) => setPlans(plans))
    }, [])

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
                    {plans.map((p) => {
                    return (
                        <option value={p.id}>{p.name}</option>
                    ) })}
                </select>
            <button onClick={() => handleSave()}>Save</button>
        </div>
        </>
    )
    
}