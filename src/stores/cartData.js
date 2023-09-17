import { defineStore } from 'pinia'

export const useCartDataStore = defineStore('cartData', {
    state: () => ({
        cartData: []
    }),
    getters: {},
    actions: {
        //init cart Data
        initCartData() {
            const cartItems = localStorage.getItem('cart')
            if (cartItems) {
                this.cartData = JSON.parse(cartItems)
            }
        },
        //建立新item
        addCartItem(newItem) {
            console.log('[addCartItem]', newItem, localStorage.getItem('cart'))

            //確認是否有cart
            if (localStorage.getItem('cart')) {
                //如果cart storage 存在
                const getCartData = JSON.parse(localStorage.getItem('cart'))
                console.log('沒有此項目')
                getCartData.push(newItem)
                localStorage.setItem('cart', JSON.stringify(getCartData))
                this.cartData.push(newItem)
                console.log('result:', getCartData)
            } else {
                //如果cart storage 不存在
                localStorage.setItem('cart', JSON.stringify([newItem]))
                //
                this.cartData.push(newItem)
            }
            console.log('[addCartItem]', this.cartData)
        },
        //更新購物車指定商品數量
        updateCartItem(data, index) {
            this.cartData.splice(index, 1, data)
            localStorage.setItem('cart', JSON.stringify(this.cartData))
        },
        //刪除購物車指定商品
        deleteCartItem(index) {
            //delete console
            console.log('delete', index)
            this.cartData.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(this.cartData))
        },
        clearCart() {
            this.cartData = []
        }
    }
})
