import heroku from './herokuAxios'

export const startHeroku = async () => {
    try {
        const res = await heroku.get(`/api/v1/start/`)
        return res
    } catch (error) {
        console.log('[heroku star Error]', error)
    }
}
