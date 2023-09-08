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
            const dataArr = Object.entries(data.data).map(([key, value]) => {
                //[BUG 後端時間補正]
                if (value.startDate < 1000000000000) {
                    value.startDate = value.startDate * 1000
                    value.endDate = value.endDate * 1000
                }
                return { id: key, ...value }
            })
            console.log('[getAllExhibitionData]', dataArr)
            this.exhibitionList = dataArr
        }
    }
})
