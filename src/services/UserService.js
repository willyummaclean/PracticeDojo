const apiUrl = "http://localhost:8088"

export const getUserByEmail = (email) => {
    return fetch(`${apiUrl}/users?email=${email}`)
    .then((res) => res.json())
}

export const getUserById = (id) => {
    return fetch(`${apiUrl}/users/${id}`)
    .then((res) => res.json())
}

export const createUser = (user) => {
    return fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    }).then((res) => res.json(
    ))
}   

export const getPlans = () => {
    return fetch(`${apiUrl}/plans`)
    .then((res) => res.json())
}

export const UpdateUserProfile = (user) => {
    return fetch(`${apiUrl}/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        }).then((res) => res.json(
        ))
}