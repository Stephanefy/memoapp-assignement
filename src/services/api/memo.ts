const BASE_URL = "https://challenge-server.tracks.run/memoapp";


export type MemoPayload = {
    category_id: number,
    title: string,
    content: string
}

export async function getMemosOfCategory(accessToken: string, categoryId: number) {

    try {

        const response = await fetch(`${BASE_URL}/memo?category_id=${categoryId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-ACCESS-TOKEN": accessToken
            }
        })
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
    }
    return []
}

export async function getMemoDetails(accessToken: string, id: number) {

    try {

        const response = await fetch(`${BASE_URL}/memo/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-ACCESS-TOKEN": accessToken
            }
        })
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
    }
    return []
}

export async function editMemoDetails(accessToken: string, memoId: number, payload: MemoPayload) {

    try {

        const response = await fetch(`${BASE_URL}/memo/${memoId}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "X-ACCESS-TOKEN": accessToken
            }
        })

        return response
    } catch (error) {
        console.log(error)
    }
    return []
}



export async function addNewMemo(accessToken: string, payload: MemoPayload) {

    try {

        const response = await fetch(`${BASE_URL}/memo`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "X-ACCESS-TOKEN": accessToken
            }
        })
        const data = await response.json()
        console.log(data)

        return data
    } catch (error) {
        console.log(error)
    }
    return []
}



export async function deleteMemo(accessToken: string, memoId: number) {

    try {

        const response = await fetch(`${BASE_URL}/memo/${memoId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-ACCESS-TOKEN": accessToken
            }
        })
        return response


    } catch (error) {
        console.log(error)
    }
    return []
}
