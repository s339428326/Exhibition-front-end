//by Express
import axios from 'axios'

export const getOrder = async (orderId) => {
    try {
        const res = axios.get(`${import.meta.env.VITE_heroku}/api/v1/order/${orderId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async (data) => {
    try {
        const res = axios.post(`${import.meta.env.VITE_heroku}/api/v1/order/`, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getOrders = async () => {
    try {
        const res = axios.get(`${import.meta.env.VITE_heroku}/api/v1/order/`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserOrder = async (localId) => {
    try {
        const res = axios.get(`${import.meta.env.VITE_heroku}/api/v1/order/user/${localId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}
