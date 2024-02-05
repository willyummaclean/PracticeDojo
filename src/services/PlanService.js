const apiUrl = "http://localhost:8088"

export const getPlanById = (id) => {
    return fetch(`${apiUrl}/plans/${id}?_embed=planExercises`)
    .then((res) => res.json())
}

export const createPracticePlan = (plan) => {
    return fetch(`${apiUrl}/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(plan)
    })
}

export const getAllPlans = () => {    
    return fetch(`${apiUrl}/plans?_embed=practiceDays`).then((res) => res.json())
}

export const deletePlan = (planId) => {
    return fetch(`${apiUrl}/plans/${planId}`, {
      method: "DELETE",
    }).then((res) => res.json())
}

export const editPlan = (plan) => {
  return fetch(`${apiUrl}/plans/${plan.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(plan)
  }).then((res) => res.json())
  
}