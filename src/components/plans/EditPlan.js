import { useEffect, useState } from "react"
import { createPracticePlan, editPlan, getAllPlans, getPlanById } from "../../services/PlanService"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../services/CategoryService"
import { getExercises } from "../../services/ExerciseService"
import { deletePlanExercise } from "../../services/PlanExercisesService"


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

    const handleRemove = (exercise) => {
        deletePlanExercise(exercise.id).then(() => updatePlanExercises(exercise))
        
    }

    const updatePlanExercises = (exercise) => {
        const updatedPlanExercises = planExercises.filter((p) => p.id !== exercise.id)
        setPlanExercises(updatedPlanExercises)

    }

    const handleAdd = (exercise) => {
        const copy = [...planExercises]
        const planExercise = {
            planId: plan.id, 
            exerciseId: exercise.id,
            name: exercise.name
        }
        copy.push(planExercise)
        setPlanExercises(copy)
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
            const filteredPlanExercises = planExercises.filter((p) => p.hasOwnProperty("id") === false)
            const promises = filteredPlanExercises.map((p) => {
                return fetch(`http://localhost:8088/planExercises`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(p)
                })

            })
        return Promise.all(promises) 
        })
        .then(() => {
        navigate("/myplans") 
        })
        
    }
    
    return (
        <>
        <h2>Edit Plan</h2>
        <div>
            <input
            type="text"
            defaultValue={plan.name}
            onChange={(e) => setName(e.target.value)}
            ></input>
        </div>
        <div>
            <label htmlFor="category-select"></label>
                <select name="categories" id="category-select" 
                onChange={(event) => handleCategory(event)}>
                    <option value="">--Please choose a Category--</option>
                    {categories.map((c) => {
                    return (
                        <option value={c.id}>{c.name}</option>
                    ) })}
                </select>
            <button onClick={(categoryId) =>
                 handleExercises(categoryId)}>Show Exercises in This Category</button>
        </div>
        <div>   
            {exercises? (
                exercises.map((e) => {
                    return (
                        <p>
                        <button onClick={() => handleAdd(e)} value={e.id}>{e.name}</button>
                        </p>
                )})
            ) : ("")}
        </div>
        <div>
            <h2>Selected Exercises</h2>
            {planExercises? (
                planExercises.map((e) => {
                    return (
                        <div>
                        <h4>{e.name}<button onClick={() => handleRemove(e)} value={e.id}>Remove</button></h4>
                        </div>
                )})
            ) : ("")}   
        </div>


        <button onClick={handleSave}>Save</button>
        </>
    )
}