import { defineStore } from 'pinia'
import { getAllExhibition } from '../api/exhibition'

export const exhibitionStore = defineStore('exhibition', {
    state: () => ({
        exhibitionList: []
    }),
    getters: {},
    actions: {
        async getAllExhibitionData() {
            const data = await getAllExhibition()
            console.log('[getAllExhibitionData]', data.exhibitionData)
            this.exhibitionList = data.exhibitionData
        }
    }
})
