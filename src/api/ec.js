import heroku from './herokuAxios'

export const createPaymentOrder = async (TradeDesc, TotalAmount, ItemsNameList) => {
    try {
        const res = await heroku.post('/api/v1/ec/', {
            TradeDesc: 'test',
            TotalAmount: '1000',
            ItemsNameList: ['item1', 'item2']
        })
        console.log(res)
        return res
    } catch (error) {
        console.error(error)
        return error.response?.data.message
    }
}
