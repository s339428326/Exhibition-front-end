import axios from 'axios'

//會員註冊 email / password
//https://identitytoolkit.googleapis.com
const google_api_url = 'https://identitytoolkit.googleapis.com'

export const createUser = async (data) => {
    try {
        const res = await axios.post(
            `${google_api_url}/v1/accounts:signUp?key=${import.meta.env?.VITE_firebaseApiKey}`,
            data
        )
        console.log('[createUser]', res)
        return res
    } catch (error) {
        console.log('[createUser]', error.response.data.error.message)
        return error.response.data.error.message
    }
}

export const login = async (data) => {
    try {
        const res = await axios.post(
            `${google_api_url}/v1/accounts:signInWithPassword?key=${
                import.meta.env?.VITE_firebaseApiKey
            }`,
            data
        )
        console.log('[login]', res)
        return res
    } catch (error) {
        console.log('[login]', error.response.data.error.message)
        return error.response.data
    }
}
