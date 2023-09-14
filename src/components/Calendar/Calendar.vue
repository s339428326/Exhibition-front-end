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

    const calendarOpt = reactive({
        plugins: [dayGridPlugin, interactionPlugin],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        initialView: 'dayGridMonth'
    })
</script>
<template>
    <div>
        <FullCalendar :options="calendarOpt" />
    </div>
</template>

<style lang="scss"></style>
