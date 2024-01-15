import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
        exhibitionData: []
    }),
    getters: {
        doubleCount(state) {
            return state.count * 2
        },
        doublePlusOne() {
            return this.doubleCount + 1
        }
    },
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        increment() {
            this.count++
        },
        randomizeCounter() {
            this.count = Math.round(100 * Math.random())
        }
    }
})
