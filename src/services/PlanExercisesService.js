const apiUrl = "http://localhost:8088"

export const deletePlanExercise = (planExerciseId) => {
    return fetch(`${apiUrl}/planExercises/${planExerciseId}`, {
      method: "DELETE",
    })
}