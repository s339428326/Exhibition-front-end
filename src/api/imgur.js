import axios from 'axios'

//uploadImgur
export const uploadImgur = async (formData) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            data: formData,
            headers: {
                Authorization: `Client-ID ${import.meta.env?.VITE_imgur_client_id}`
            },
            mimeType: 'multipart/form-data'
        })

        return res
    } catch (error) {
        console.log(error)
        return error
    }
}
