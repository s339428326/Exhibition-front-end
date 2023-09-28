import heroku from './herokuAxios'

// email 驗證是否被註冊
// export const verifyEmail = async (token) => {
//     try {

//         return res
//     } catch (error) {
//         return error
//     }
// }

// 會員註冊 email / password
export const createUser = async (data) => {
    try {
        const res = await heroku.post('/api/v1/auth/singup', data)
        return res.data
    } catch (error) {
        return error.response.data.errors
    }
}

// 會員登入 email / password
export const login = async (data) => {
    try {
        const res = await heroku.post('/api/v1/auth/login', data)
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}

// 認證token
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

// 更新用戶密碼
export const sendForgetEmail = async (email) => {
    try {
        const res = await heroku.post(`/api/v1/auth/forgetPassword`, email)
        return res
    } catch (error) {
        return error.response?.data.message
    }
}

// 驗證信箱url 夾帶token 是否正確
export const resetPasswordEmail = async (resetToken, data) => {
    try {
        const res = await heroku.post(`api/v1/auth/resetPassword/${resetToken}`, data)
        return res
    } catch (error) {
        return error.response?.data.message
    }
}

// 驗證ResetToken 密碼正確性
export const checkResetToken = async (resetToken) => {
    try {
        const res = await heroku.post(`api/v1/auth/checkResetToken/${resetToken}`)
        return res
    } catch (error) {
        return error.response?.data.message
    }
}

//寄更換email 信件
export const changeEmail = async (email) => {
    try {
        const res = await heroku.post(`api/v1/auth/changeEmail`, email)
        return res
    } catch (error) {
        console.error(error)
        return error.response?.data.message
    }
}

//確認更換email
export const resetEmail = async (token, email) => {
    try {
        const res = await heroku.post(`api/v1/auth/resetEmail/${token}`, email)
        return res
    } catch (error) {
        console.error(error)
        return error.response?.data.message
    }
}
