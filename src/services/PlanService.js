const apiUrl = "http://localhost:8088"

export const getPlanById = (id) => {
    return fetch(`${apiUrl}/plans/${id}`)
    .then((res) => res.json())
}