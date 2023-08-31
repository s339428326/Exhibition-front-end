import axios from 'axios'

//會員註冊 email / password
const google_api_url = 'https://identitytoolkit.googleapis.com'
const url = (str) => `${google_api_url}${str}?key=${import.meta.env?.VITE_firebaseApiKey}`

//會員註冊 email / password
export const createUser = async (data) => {
    try {
        const res = await axios.post(url('/v1/accounts:signUp'), data)
        console.log('[createUser]', res)
        return res
    } catch (error) {
        console.log('[createUser]', error.response.data.error.message)
        return error.response.data
    }
}

//會員登入 email / password
export const login = async (data) => {
    try {
        const res = await axios.post(url('/v1/accounts:signInWithPassword'), data)
        console.log('[login]', res)
        return res
    } catch (error) {
        console.log('[login]', error.response.data.error.message)
        return error.response.data
    }
}

//取得使用者auth資料
export const getUserAuthData = async (token) => {
    try {
        const res = await axios.post(url('/v1/accounts:lookup'), {
            idToken: token
        })
        console.log('[getUserAuthData]', res)
        return res
    } catch (error) {
        console.log('[getUserAuthData]', error.response.data.error.message)
        return error.response.data
    }
}

//密碼重置(信箱更改密碼)
