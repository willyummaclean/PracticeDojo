import { useEffect, useState } from "react"
import { createPracticePlan, editPlan, getAllPlans, getPlanById } from "../../services/PlanService"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../services/CategoryService"
import { getExercises } from "../../services/ExerciseService"
import { deletePlanExercise } from "../../services/PlanExercisesService"
import "./Plans.css"

export const EditPlan = ( {currentUser} ) => {
    
    const [exercises, setExercises] = useState([])
    const [planExercises, setPlanExercises] = useState([])
    const [name, setName] = useState("")

    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(null)

    const [plan, setPlan] = useState({})
    const { planId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then((data) => setCategories(data));
        getPlanById(parseInt(planId)).then((data) => setPlan(data))
    }, [planId])


    useEffect(() => {
        setPlanExercises(plan.planExercises)
    }, [plan])


    const handleCategory = (event) => {
        setCategoryId(parseInt(event.target.value));
    }

    const handleExercises = () => {
        getExercises().then((data) => data.filter((e) => e.categoryId === parseInt(categoryId)))
        .then((categoryexercises) => setExercises(categoryexercises))
    }

    const handleRemove = (event) => {
        deletePlanExercise(event.target.value).then(() => getAndSetPlan())
        
    }

    const getAndSetPlan = () => {
        getPlanById(parseInt(planId)).then((data) => setPlan(data))
    }


    const updatePlanExercises = (exercise) => {
        const updatedPlanExercises = planExercises.filter((p) => p.id !== exercise.id)
        setPlanExercises(updatedPlanExercises)

    }

    const handleAdd = (exercise) => {
       
        const planExercise = {
            planId: plan.id, 
            exerciseId: exercise.id,
            name: exercise.name
        }
        const copy = [... planExercises]
        postPlanExercise(planExercise).then((data) => {
            copy.push(data)
            setPlanExercises(copy)
        
        })
        
        
    }


    const postPlanExercise = (p) => {
      return fetch(`http://localhost:8088/planExercises`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(p)
            }).then((res) => res.json())
}


    const handleSave = () => {

        const planObject = {
            "name": name,
            "userId": currentUser.id,
            "id": plan.id
        }

        if (planObject.name === "") {
            planObject.name = plan.name
        }
        editPlan(planObject).then(() => {
        navigate("/myplans") 
        })
        
    }
    
    return (
        <>
        <div className="container">
            <div  className="title-container">
                <h1 className="title">Edit Plan</h1>
                <div>
                    <h2 className="title">Name:</h2>
                    <input
                    type="text"
                    className="button-74" 
                    defaultValue={plan.name}
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
                        handleExercises(categoryId)}>Show Exercises</button>
            </div>
            
            <div className="planBlock">
                <h2 className="title">Category Exercises</h2>
                <div>   
                    {exercises? (
                        exercises.map((e) => {
                            return (
                                <p>
                                <button className="button-74" onClick={() => handleAdd(e)} value={e.id}>{e.name}</button>
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
                            <h4><button className="button-74" onClick={(event) => handleRemove(event)} value={e.id}>{e.name}</button></h4>
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