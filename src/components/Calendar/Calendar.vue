<script setup>
    //https://medium.com/i-am-mike/vue-3-ref-%E8%B7%9F-reactive-%E6%88%91%E8%A9%B2%E6%80%8E%E9%BA%BC%E9%81%B8-2fb6b6735a3c

    //Calendar Vue3 demo
    //https://www.youtube.com/watch?v=YOZuSnzPq9g

    //FullCalendar office website
    //https://fullcalendar.io/demos

    //FullCalendar Vue3 office demo
    //https://fullcalendar.io/docs/vue

    import { reactive } from 'vue'
    import FullCalendar from '@fullcalendar/vue3'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import twLocale from '@fullcalendar/core/locales/zh-tw'
    import listPlugin from '@fullcalendar/list'

    const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

    const calendarOpt = reactive({
        plugins: [dayGridPlugin, interactionPlugin, listPlugin],
        locales: [twLocale],
        locale: 'zh-tw',
        headerToolbar: {
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth,listMonth' //dayGridMonth,dayGridWeek
        },
        initialView: 'dayGridMonth',
        events: [
            // one day
            // { title: 'event 1', date: '2023-09-08' },
            //range day
            {
                title: '這是展覽1',
                start: '2023-09-01',
                end: '2023-09-07',
                // url:''
                backgroundColor: randomColor()
            },
            {
                title: '這是展覽2',
                start: '2023-09-01',
                end: '2023-09-30',
                backgroundColor: randomColor()
            }
        ]
    })
</script>
<template>
    <div>
        <FullCalendar :options="calendarOpt" />
    </div>
</template>

<style lang="scss"></style>
