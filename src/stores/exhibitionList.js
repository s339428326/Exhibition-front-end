import { defineStore } from 'pinia'
import $axios from 'axios'

function dateTimeApart(dateTime) {
    const targetDate = dateTime.split(' ')[0]
    const targetTime = dateTime.split(' ')[1]

    const _yr = targetDate.split('/')[0]
    const _mth = targetDate.split('/')[1]
    const _day = targetDate.split('/')[2]

    const _hr = targetTime.split(':')[0]
    const _min = targetTime.split(':')[1]
    const _scd = targetTime.split(':')[2]
    return {
        _yr,
        _mth,
        _day,
        _hr,
        _min,
        _scd
    }
}

function converTotimeStamp(dateTime) {
    const dayObj = dateTimeApart(dateTime)
    const newDateTime = new Date(
        dayObj._yr,
        dayObj._mth - 1,
        dayObj._day,
        dayObj._hr,
        dayObj._min,
        dayObj._scd
    ).getTime()

    return Math.floor(newDateTime / 1000)
}

export const useExhibitionStore = defineStore('exhibition', {
    state: () => ({
        rawExhibitionList: []
    }),
    getters: {
        exhibitionList(state) {
            if (state.rawExhibitionList.length > 0) {
                const datas = state.rawExhibitionList
                let newDatas = []

                const filterData = datas.filter((item) => {
                    return item.imageUrl
                })

                filterData.forEach((data) => {
                    let temp = {
                        Uid: data.UID,
                        name: data.title,
                        location: data.showInfo[0].location,
                        locationName: data.showInfo[0].locationName,
                        price: data.showInfo[0].price,
                        startDate: converTotimeStamp(data.showInfo[0].time),
                        endDate: converTotimeStamp(data.showInfo[0].endTime),
                        introduce: data.descriptionFilterHtml,
                        sourceWebPromote: data.sourceWebPromote,
                        viewer: data.hitRate,
                        image: data.imageUrl
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
