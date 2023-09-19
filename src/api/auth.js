import heroku from './herokuAxios'

//會員註冊 email / password
export const createUser = async (data) => {
    try {
        const res = await heroku.post('/api/v1/auth/singup', data)
        return res.data
    } catch (error) {
        return error.response.data.errors
    }
}

//會員登入 email / password
export const login = async (data) => {
    try {
        const res = await heroku.post('/api/v1/auth/login', data)
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}

//認證token
export const authenticateAndGetUserData = async (token) => {
    try {
        const res = await heroku.get('/api/v1/auth', null, {
            headers: {
                Authorization: token
            }
        })
        return res.data
    } catch (error) {
        return error.response?.data.message
    }
}

//email 驗證
// export const verifyEmail = async (token) => {
//     try {

//         return res
//     } catch (error) {
//         return error
//     }
// }

//更新用戶密碼
// export const changePassword = async (token, password) => {
//     try {

//         return res
//     } catch (error) {
//         return error
//     }
// }

//密碼重置(信箱更改密碼)
// export const resetPasswordEmail = async (email) => {
//     try {

//         return res
//     } catch (error) {
//         console.log(error)
//     }
// }
