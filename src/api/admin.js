import axios from './axiosInstance'

export const adminLogin = async (data) => {
    try {
        const res = await axios.post('/api/v1/admin/login', data)
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}
