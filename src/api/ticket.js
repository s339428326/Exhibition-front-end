import axios from './axiosInstance'

//使用者取得用戶擁有展覽票卷
export const userTicketList = async (userId) => {
    try {
        const res = await axios.get(`/api/v1/ticket/user/${userId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
