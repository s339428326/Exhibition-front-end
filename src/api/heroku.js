import axios from './axiosInstance'

export const startHeroku = async () => {
    try {
        const res = await axios.get(`/api/v1/start/`)
        return res
    } catch (error) {
        console.log('[heroku star Error]', error)
    }
}
