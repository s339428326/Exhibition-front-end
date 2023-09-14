import { defineStore } from 'pinia'
import { createUser, getUserAuthData, login } from '../api/auth'
import { getUserData, updateUserInfoData } from '../api/user'
import { useRouter } from 'vue-router'

export const userDataStore = defineStore('userData', {
    state: () => ({
        userData: {
            isLogin: false
        }
    }),
    getters: {},
    actions: {
        //註冊
        async register(data) {
            //Step.1 註冊用戶
            const res = await createUser({
                ...data,
                returnSecureToken: true
            })

            //成功
            if (res.data) {
                this.userData = { ...res.data }
                localStorage.setItem('token', res.data.idToken)
            }
            //失敗
            if (res?.error) {
                switch (res.error.message) {
                    case 'EMAIL_EXISTS':
                        return '信箱已存在, 請重新填寫'

                    default:
                        return '伺服器回應錯誤, 請聯絡我們！'
                }
            }

            //Step.2 建立新用戶資料
            const newUser = await updateUserInfoData(res.data.localId, {
                name: data.email.split('@')[0],
                email: data.email,
                picture:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSVNDTCFdYkZVDp49l0Sux5b0qaQboq6swiLhZI04&s'
            })
            //成功
            if (newUser) {
                this.userData = { ...res.data, ...newUser.data }
                console.log(newUser)
                return true
            }
            //失敗
            if (newUser?.error) {
                console.log('[newUser] error')
                switch (res.error.message) {
                    // case 'EMAIL_EXISTS':
                    //     return '信箱已存在, 請重新填寫'
                    default:
                        return '伺服器回應錯誤, 請聯絡我們！'
                }
            }
        },
        //登入
        async login(data) {
            console.log('[loginHandler]:傳入資料', data)
            const res = await login({
                ...data,
                returnSecureToken: true
            })

            console.log('[loginHandler]:取得登入訊息', res)

            //成功
            if (res.data) {
                //取得用戶資料
                const userInfoData = await getUserData(res.data.localId)
                console.log('test', userInfoData)
                this.userData = { ...res.data, ...userInfoData.data }
                localStorage.setItem('token', res.data.idToken)
                return true
            }

            //失敗
            if (res?.error) {
                //整理錯誤回應
                switch (res.error.message) {
                    case 'EMAIL_NOT_FOUND':
                        return '帳號密碼錯誤, 請重新輸入'
                    case 'MISSING_EMAIL':
                        return '信箱未輸入'
                    case 'INVALID_PASSWORD':
                        return '帳號密碼錯誤, 請重新輸入'
                    case 'MISSING_PASSWORD':
                        return '密碼未輸入'
                    default:
                        return '伺服器回應錯誤, 請聯絡我們！'
                }
            }
        },
        //登出
        async logout() {
            localStorage.removeItem('token')
            this.userData = {}
        },
        //驗證token
        async confirmToken(token) {
            const res = await getUserAuthData(token)
            if (res?.error?.message) {
                localStorage.removeItem('token')
                return false
            }
            //取得用戶資料
            const userInfoData = await getUserData(res?.data?.users[0]?.localId)

            this.userData = {
                ...this.userData,
                ...userInfoData.data,
                localId: res?.data?.users[0]?.localId
            }

            return res?.data?.users[0]?.localId
        },
        //用戶資料
        async getUserInfoData(userId) {
            console.log('[userId]:', userId)
            const res = await getUserData(userId)
            console.log(res)
            this.userData = { ...this.userData }
        }
    }
})
