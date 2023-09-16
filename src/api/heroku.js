import axios from 'axios'

export const startHeroku = async () => {
    try {
        const res = await axios.get(`${import.meta.env?.VITE_heroku}/api/v1/start/`)
        return res
    } catch (error) {
        console.log('[heroku star Error]', error)
    }
}
