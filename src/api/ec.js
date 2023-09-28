import heroku from './herokuAxios'

export const createPaymentOrder = async () => {
    try {
        const res = await heroku.post('/api/v1/ec/', {})
        console.log(res)
        return res
    } catch (error) {
        console.error(error)
        return error.response?.data.message
    }
}
