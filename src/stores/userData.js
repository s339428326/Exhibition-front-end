import { defineStore } from 'pinia'
import { createUser, login } from '../api/user'

export const userDataStore = defineStore('userData', {
    state: () => ({
        userData: {}
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
            try {
                const res = await createUser({
                    ...data,
                    returnSecureToken: true
                })
                console.log(res)
            } catch (error) {
                console.log(error)
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
            this.userData = { ...res.data }

            //失敗
            if (res?.error) {
                //整理錯誤回應
                switch (res.error.message) {
                    case 'EMAIL_NOT_FOUND':
                        return '帳號密碼錯誤, 請重新輸入'
                    default:
                        return '伺服器回應錯誤, 請聯絡我們！'
                }
            }

            return true
        },
        //登出
        async logout() {}
    }
})
