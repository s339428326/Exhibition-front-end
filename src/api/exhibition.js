import axios from 'axios'

const api_url = 'https://exhibition-app-1ab50-default-rtdb.asia-southeast1.firebasedatabase.app/'

const url = (str) => `${api_url}${str}?key=${import.meta.env?.VITE_firebaseApiKey}`

export const getAllExhibition = async () => {
    try {
        const res = await axios.get(url('/fairs.json?'))
        console.log('[getAllExhibition]', res)
        return res
    } catch (error) {
        console.error('[Error getAllExhibition]', error)
    }
}

export const getOneExhibition = async (id) => {
    try {
        const res = await axios.get(url(`/fairs/${id}.json`))
        console.log('[getOneExhibition]', res)
        return res
    } catch (error) {
        console.error('[Error getOneExhibition]', error)
    }
}
