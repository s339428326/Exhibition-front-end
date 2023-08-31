import { defineStore } from 'pinia'
import { createUser, login } from '../api/auth'

export const userDataStore = defineStore('userData', {
    state: () => ({
        userData: {
            isLogin: false
        }
    }),
    getters: {},
    actions: {
        //更新購物車指定商品數量
        updateCartItem(data, index) {
            this.cartData.splice(index, 1, data)
            localStorage.setItem('cart', JSON.stringify(this.cartData))
        },
        //註冊
        async register(data) {
            const res = await createUser({
                ...data,
                returnSecureToken: true
            })

            //成功
            if (res.data) {
                this.userData = { ...res.data, isLogin: true }
                return true
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
                this.userData = { ...res.data, isLogin: true }
                return true
            }

            //失敗
            if (res?.error) {
                //整理錯誤回應
                switch (res.error.message) {
                    case 'EMAIL_NOT_FOUND':
                        return '帳號密碼錯誤, 請重新輸入'
                    case 'INVALID_PASSWORD':
                        return '帳號密碼錯誤, 請重新輸入'
                    default:
                        return '伺服器回應錯誤, 請聯絡我們！'
                }
            }
        },
        //登出
        async logout() {}
    }
})
