import { useEffect, useState } from "react"
import { createPracticePlan, getAllPlans } from "../../services/PlanService"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../services/CategoryService"
import { getExercises } from "../../services/ExerciseService"
import "./Plans.css"

export const CreatePlan = ( {currentUser} ) => {
    
    const [exercises, setExercises] = useState([])
    const [planExercises, setPlanExercises] = useState([])

    const [name, setName] = useState("")

    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(null)

    const [plans, setPlans] = useState([])
    const [lastPlan, setLastPlan] = useState({})
    const [planId, setPlanId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then((data) => setCategories(data));
        getAllPlans().then((plans) => setPlans(plans))
       
    }, [])

    useEffect(() => {
        setLastPlan(plans[plans.length -1])

    }, [plans])

    useEffect(() => {
        const copy = {...lastPlan}
        const lastPlanId = copy.id
       setPlanId(lastPlanId + 1)
    }, [lastPlan])

    const handleCategory = (event) => {
        setCategoryId(parseInt(event.target.value));
    }

    const handleExercises = () => {
        getExercises().then((data) => data.filter((e) => e.categoryId === parseInt(categoryId)))
        .then((categoryexercises) => setExercises(categoryexercises))
    }

    const handleRemove = (exercise) => {
        const filteredExercises = planExercises.filter((e) => e.exerciseId !== exercise.exerciseId)
       setPlanExercises(filteredExercises)
    }

    const handleAdd = (exercise) => {
        const copy = [...planExercises]
        const planExercise = {
            planId: parseInt(planId), 
            exerciseId: exercise.id,
            name: exercise.name
        }
        copy.push(planExercise)
        setPlanExercises(copy)
    }


    const handleSave = () => {
        const planObject = {
            "userId": currentUser.id,
            "name": name
        }
        createPracticePlan(planObject)
        .then(() => planExercises.map((p) => {
            return fetch(`http://localhost:8088/planexercises`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(p)
              }
            )
        }))

        navigate("/myplans")
    }

    return (
        <>
        <div className="container">
            <div  className="title-container">
                <h1 className="title">Create a Plan</h1>
                <div>
                <h2 className="title">Name:</h2>
                <input
                    type="text"
                    placeholder="Plan Name"
                    className="button-74" 
                    onChange={(e) => setName(e.target.value)}
                ></input>
                </div>     
            </div>
            <div className="planBlock"> 
                <label htmlFor="category-select"></label>
                    <select className="button-74" name="categories" id="category-select" 
                        onChange={(event) => handleCategory(event)}>
                        <option value="">--Please choose a Category--</option>
                        {categories.map((c) => {
                        return (
                            <option value={c.id}>{c.name}</option>
                        ) })}
                        </select>
                    <button className="button-74" onClick={(categoryId) =>
                        handleExercises(categoryId)}>Show Exercises
                    </button>
            </div>  
            <div className="planBlock">
            <h2 className="title">Category Exercises</h2>
                <div>   
                    {exercises? (
                        exercises.map((e) => {
                            return (
                                <p>
                                <button className="button-74"  onClick={() => handleAdd(e)} value={e.id}>{e.name}</button>
                                </p>
                        )})
                    ) : ("")}
                </div>
            </div>
        
            <div className="planBlock">
                <h2 className="title">Selected Exercises</h2>
                {planExercises? (
                    planExercises.map((e) => {
                        return (
                            <div>
                            <h4><button className="button-74" onClick={() => handleRemove(e)} value={e.id}>{e.name}</button></h4>
                            </div>
                    )})
                ) : ("")}   
            </div>
        </div>
        <div className="button-container">
                <div className="second-title-container">
                    <button className="button-74" onClick={handleSave}>Save</button>
                </div>
        </div>
        </>
    )
}