import axios from './axiosInstance'

export const wakeAPIServer = async () => {
    try {
        const res = await axios.get(`/api/v1/start/`)
        return res
    } catch (error) {
        console.log('[API Server Error]', error)
    }
}
