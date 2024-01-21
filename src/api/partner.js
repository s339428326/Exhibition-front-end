import axios from './axiosInstance'

//夥伴頁面登入
export const partnerLogin = async (data) => {
    try {
        const res = await axios.post('/api/v1/partner/login', data)
        return res.data
    } catch (error) {
        console.log('[Error newPartner]', error)
    }
}

//傳送前端夥伴帳戶申請表單
export const newPartner = async (data) => {
    try {
        const res = await axios.post('/api/v1/partner', data)
        return res.data
    } catch (error) {
        console.log('[Error newPartner]', error)
    }
}
