const apiUrl = "http://localhost:8088"

export const getPracticeDayById = (id) => {
    return fetch(`${apiUrl}/practiceDays/${id}`)
    .then((res) => res.json())
}

export const createPracticeDay = (plan) => {
    return fetch(`${apiUrl}/practiceDays`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(plan)
      })
}

export const editPracticeDay = (practiceDay) => {
    return fetch(`${apiUrl}/practiceDays/${practiceDay.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(practiceDay)
      })
}


export const deletePracticeDay = (practiceDayId) => {
    return fetch(`${apiUrl}/practiceDays/${practiceDayId}`, {
      method: "DELETE",
    }).then((res) => res.json())
}