import axios from './axiosInstance'

export const newPartner = async (data) => {
    try {
        const res = await axios.post('/api/v1/partner', data)
        return res.data
    } catch (error) {
        console.log('[Error newPartner]', error)
    }
}
