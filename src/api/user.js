import axios from 'axios'

const api_url = 'https://exhibition-app-1ab50-default-rtdb.asia-southeast1.firebasedatabase.app/'

const url = (str) => `${api_url}${str}?key=${import.meta.env?.VITE_firebaseApiKey}`

export const getUserData = async (userId) => {
    try {
        const res = axios.get(url(`/users/${userId}.json`))
        return res
    } catch (error) {
        console.log('[getUserData]', error.response.data.error.message)
        return error.response.data
    }
}
