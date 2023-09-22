import axios from 'axios'
import Cookies from 'js-cookie'

//axios 攔截器
const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER
})

//req
instance.interceptors.request.use(
    (config) => {
        //發送請求前
        config.headers.Authorization = `Bearer ${Cookies.get('token')}`
        return config
    },
    (error) => {
        //請求錯誤時
        return Promise.reject(error)
    }
)

//res
instance.interceptors.response.use(
    (config) => {
        //發送請求前
        return config
    },
    (error) => {
        //請求錯誤時
        if (error.response) {
            const { status } = error.response
            switch (status) {
                case `${status}`.startsWith('4'):
                    console.log('[client請求錯誤]', error.response)
                    break
                case `${status}`.startsWith('5'):
                    // go to 500 page
                    console.error('heroku程式發生問題', error.response)
                    break
                default:
                    console.log('heroku Api 發生錯誤', error.response)
                    break
            }
        }

        return Promise.reject(error)
    }
)

export default instance
