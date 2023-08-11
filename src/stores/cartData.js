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
        addCartItem(itemDataset) {
            console.log('[create]', itemDataset, localStorage.getItem('cart'))
            const newItem = {
                name: itemDataset.name,
                price: itemDataset.price,
                quantity: 1
            }

            //確認是否有cart
            if (localStorage.getItem('cart')) {
                //如果cart storage 存在
                const getCartData = JSON.parse(localStorage.getItem('cart'))
                const index = getCartData.findIndex((item) => item.name === newItem.name)

                //確認是否有重複商品
                if (index > -1) {
                    console.log('已經有此項目')
                    const item = {
                        ...getCartData[index],
                        quantity: getCartData[index].quantity + 1
                    }
                    getCartData.splice(index, 1, item)
                    localStorage.setItem('cart', JSON.stringify(getCartData))
                } else {
                    console.log('沒有此項目')
                    getCartData.push(newItem)
                    localStorage.setItem('cart', JSON.stringify(getCartData))
                }
                console.log('result:', getCartData)
            } else {
                //如果cart storage 不存在
                localStorage.setItem('cart', JSON.stringify([newItem]))
            }
        },
        //更新購物車指定商品數量
        updateCartItem(item) {
            //test console
            console.log('update')
            //search item
            //if true => findIndex
        },
        //刪除購物車指定商品
        deleteCartItem(item) {
            //delete console
            console.log('delete')
        }
    }
})
