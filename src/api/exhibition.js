import heroku from './herokuAxios'

export const getAllExhibition = async () => {
    try {
        const res = await heroku.get('/api/v1/exhibition/')
        return res.data
    } catch (error) {
        return error
    }
}

//getOneExhibition
export const getOneExhibition = async (id) => {
    try {
        const res = await heroku.get(`/api/v1/exhibition/${id}`)
        return res
    } catch (error) {
        return error
    }
}
