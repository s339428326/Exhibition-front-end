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
        async initUserData() {
            const res = await authenticateAndGetUserData()
            if (!res) return false
            this.userData = { ...this.userData, ...res?.user }
            return true
        },
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
                return true
            } else {
                return res
            }
        },
        //登入
        async login(data) {
            const res = await login(data)
            console.log('store', res)
            if (res?.data?.user?.role === 'user') {
                Cookies.set('token', res.token, { expires: 7 })
                this.userData = { ...res.data?.user }
                return true
            } else {
                return false
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
            if (res?.user.role === 'user') {
                this.userData = { ...res?.user }
                console.log('[登入]', this.userData)
                return true
            } else {
                console.log('[登入失敗]', this.userData)
                return false
            }
        }
    }
})
