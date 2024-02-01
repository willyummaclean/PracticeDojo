const apiUrl = "http://localhost:8088"

export const getExercises = () => {
    return fetch(`${apiUrl}/exercises`).then((res) => res.json())
}

export const getExerciseById = (id) => {
    return fetch(`${apiUrl}/exercises/${id}`).then((res) => res.json())
}


export const CreatePracticeExercise = (exercise) => {
    return fetch(`${apiUrl}/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(exercise)
    })
}

export const deleteExercise = (exerciseId) => {
  return fetch(`${apiUrl}/exercises/${exerciseId}`, {
    method: "DELETE",
  })
}

export const EditPracticeExercise = (editedExercise, exerciseId) => {
  return fetch(`${apiUrl}/exercises/${exerciseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedExercise)
  })
}