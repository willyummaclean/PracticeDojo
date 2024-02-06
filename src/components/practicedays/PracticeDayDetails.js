import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPracticeDayById } from "../../services/PracticeDayService"
import { getPlanById } from "../../services/PlanService"






export const PracticeDayDetails = () => {
    const { practicedayId } = useParams()
    const [practiceDay, setPracticeDay] = useState({})
    const [plan, setPlan] = useState({})

    const [planExercises, setPlanExercises] = useState([])


  

    useEffect(() => {
        getPracticeDayById(practicedayId).then((practiceDayObject) => setPracticeDay(practiceDayObject));

    }, [practicedayId])
    
    

    useEffect(() => {
        if (practiceDay.id) {
        getPlanById(practiceDay.planId).then((planObject) => setPlan(planObject))
        }
     
    }, [practiceDay])

    useEffect(() => {
        setPlanExercises(plan.planExercises)
    }, [plan]) 


    return (
        <>
        <div>
        <h1>{practiceDay.date}</h1>
        </div>
        <div>
            <h3>{plan.name}</h3>
            <h4>Plan Exercises</h4>
            <ul>
            {planExercises? (
                planExercises.map((e) => {
                    return (
                        <div>
                        <li>{e.name}</li>
                        </div>    
                )})
            ) : ("")}
            </ul>   
        </div>
        </>
    )

}