import { defineStore } from 'pinia'
import { login, createUser, authenticateAndGetUserData } from '../api/auth'
import { getUserData, updateUserInfoData } from '../api/user'
import Cookies from 'js-cookie'

// import { useRouter } from 'vue-router'

export const userDataStore = defineStore('userData', {
    state: () => ({
        userData: {}
    }),
    getters: {},
    actions: {
        //註冊
        async register(data) {
            //Step.1 註冊用戶
            const res = await createUser({
                ...data
            })

            //成功
            if (res?.data) {
                Cookies.set('token', res.token, { expires: 7 })
                this.userData = { ...res.data?.user }
                alert(JSON.stringify(this.userData, null, 2))
                return true
            } else {
                return res
            }
        },
        //登入
        async login(data) {
            const res = await login(data)
            if (res?.data) {
                Cookies.set('token', res.token, { expires: 7 })
                this.userData = { ...res.data?.user }
                return true
            }
        },
        //登出
        async logout() {
            Cookies.remove('token')
            this.userData = {}
        },
        //驗證token
        async confirmToken(token) {
            const res = await authenticateAndGetUserData(token)
            if (res?.user) {
                console.log(res)
                this.userData = { ...res?.user }
                return true
            } else {
                return false
            }
        },
        //用戶資料
        async getUserInfoData(userId) {}
    }
})
