import { useEffect, useState } from "react"
import { createPracticePlan, getAllPlans } from "../../services/PlanService"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../services/CategoryService"
import { getExercises } from "../../services/ExerciseService"


export const CreatePlan = ( {currentUser} ) => {
    const [exercises, setExercises] = useState([])
    const [planExercises, setPlanExercises] = useState([])

    const [name, setName] = useState("")

    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(null)

    const [planId, setPlanId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then((data) => setCategories(data));
        getAllPlans().then((plans) => setPlanId(plans.length));
       
    }, [])

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

        // navigate("/myplans")
    }

    return (
        <>
        <h2>Create Plan</h2>
        <div>
            <input
            type="text"
            placeholder="Plan Name"
            onChange={(e) => setName(e.target.value)}
            ></input>
        </div>
        <div>
            <label for="category-select"></label>
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