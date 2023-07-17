import { defineStore } from 'pinia'
import $axios from 'axios'

export const useExhibitionStore = defineStore('exhibition', {
    state: () => ({
        rawExhibitionList: []
    }),
    getters: {
        exhibitionList(state) {
            if (state.rawExhibitionList.length > 0) {
                const datas = state.rawExhibitionList
                let newDatas = []

                datas.forEach((data) => {
                    let temp = {
                        title: data.title,
                        location: data.showInfo[0].location,
                        price: data.showInfo[0].price,
                        startDate: data.startDate,
                        endDate: data.endDate
                    }

                    newDatas.push(temp)
                })

                return newDatas
            } else {
                return []
            }
        }
    },
    actions: {
        async getExhibitionData() {
            try {
                const promiseData = await $axios({
                    method: 'get',
                    baseURL: 'https://cloud.culture.tw',
                    url: '/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
                    headers: { 'Content-Type': 'application/json' }
                })
                this.rawExhibitionList = promiseData.data

                return promiseData
            } catch (error) {
                console.log(error)
            }
        }
    }
})
