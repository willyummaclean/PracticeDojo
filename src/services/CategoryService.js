const apiUrl = "http://localhost:8088"

export const getCategories = () => {
    return fetch(`${apiUrl}/categories`).then((res) => res.json())
}
