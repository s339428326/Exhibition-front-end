import axios from 'axios'

const api_url = 'https://exhibition-app-1ab50-default-rtdb.asia-southeast1.firebasedatabase.app'

const url = (str) => `${api_url}${str}?key=${import.meta.env?.VITE_firebaseApiKey}`

//取得用戶個人資料
export const getUserData = async (userId) => {
    try {
        const res = axios.get(url(`/users/${userId}.json`))
        console.log('[getUserData]', res)
        return res
    } catch (error) {
        console.log('[getUserData]', error.response.data.error.message)
        return error.response.data
    }
}

//更新用戶資料
export const updateUserInfoData = async (userId, data) => {
    try {
        const res = axios.patch(url(`/users/${userId}.json`), data)
        console.log('[updateUserInfoData]', res)
        return res
    } catch (error) {
        console.log('[updateUserInfoData]', error.response.data.error.message)
        return error.response.data
    }
}

//拿到展覽追蹤
export const getUserTrackData = (userId) => {
    try {
        const res = axios.get(url(`/users/${userId}/favorite.json`))
        console.log('[getUserTrackData]', res)
        return res
    } catch (error) {
        console.error('[getUserTrackData]', error)
    }
}

//新增追蹤展覽
export const trackExhibition = (userId, exhId) => {
    try {
        const res = axios.patch(url(`/users/${userId}/favorite.json`), {
            [exhId]: true
        })
        console.log('[track Exhibition]', res)
        return res
    } catch (error) {
        console.error('[track Exhibition]', error)
    }
}

//刪除展覽追蹤
export const deleteTrackExhibition = async (userId, exhId) => {
    try {
        const res = axios.patch(url(`/users/${userId}/favorite.json`), {
            [exhId]: false
        })
        console.log('[track Exhibition]', res)
        return res
    } catch (error) {
        console.error('[track Exhibition]', error)
    }
}
