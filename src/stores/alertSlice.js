import { defineStore } from 'pinia'

export const useAlert = defineStore('alert', {
    state: () => ({
        isActive: false,
        title: '',
        message: '',
        type: ''
    }),
    getters: {},
    actions: {
        /**
         *
         * @param {{title:String,content:String,type:{'check','error','alert'}}} data
         * @param {Number} delay default 1000
         */
        callAlert(data, delay = 1500) {
            const { title, content, type } = data
            this.isActive = true
            if (title) {
                this.title = title
            }
            if (content) {
                this.content = content
            }
            if (type) {
                this.type = type
            }

            setTimeout(() => {
                this.isActive = false
                this.title = ''
                this.content = ''
                this.type = ''
            }, delay)
        }
    }
})
