import heroku from './herokuAxios'

//取得用戶個人資料
export const getUserData = async (userId) => {
    try {
        const res = await heroku.get(`/api/v1/${userId}`)
        return res.data
    } catch (error) {
        return error
    }
}

//更新用戶資料
export const updateUserInfoData = async (userId, data) => {}

//拿到展覽追蹤
export const getUserTrackData = (userId) => {}

//新增追蹤展覽
export const trackExhibition = (userId, exhId) => {}

//刪除展覽追蹤
export const deleteTrackExhibition = async (userId, exhId) => {}
