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
        <div className="container">
            <div className="bigPlanBlock">
                <div>
                    <h1 className="title">{practiceDay.date}</h1>
                    <h2 className="title">{plan.name}</h2>
                    <h3 className="title">Plan Exercises :</h3>
                    <ul>
                    {planExercises? (
                        planExercises.map((e) => {
                            return (
                                <div>
                                <h4 className="title"><button className="button-74" >{e.name}</button></h4>
                                </div>    
                        )})
                    ) : ("")}
                    </ul>   
                </div>
            </div>
        </div>
        </>
    )

}