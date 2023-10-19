<script setup>
    import { onMounted } from 'vue'
    import { wakeAPIServer } from './api/wake'
    import { useAlert } from './stores/alertSlice'

    const { callAlert } = useAlert()

    const callServer = async () => {
        callAlert({ title: '請稍等！, 喚醒後端服務！', type: 'alert' })
        try {
            const res = await wakeAPIServer()
            callAlert({ title: '成功連結後端', type: 'check' })
            return res
        } catch (error) {
            console.error(error)
            callAlert({ title: '注意! Heroku 連結失敗', type: 'errors' })
            return error
        }
    }

    onMounted(() => {
        callServer()
    })
</script>

<template>
    <router-view />
</template>

<style scoped></style>
