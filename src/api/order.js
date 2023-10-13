import axios from './axiosInstance'

export const getOrder = async (orderId) => {
    try {
        const res = await axios.get(`/api/v1/order/${orderId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async (data) => {
    try {
        const res = await axios.post(`/api/v1/order/`, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getOrders = async () => {
    try {
        const res = await axios.get(`/api/v1/order/`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserOrder = async (userId) => {
    try {
        const res = await axios.get(`/api/v1/order/user/${userId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}
