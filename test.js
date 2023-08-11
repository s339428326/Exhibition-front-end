const addCartItemHandler = (e) => {
    const newItem = {
        name: e.target.dataset.name,
        price: e.target.dataset.price,
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
}
