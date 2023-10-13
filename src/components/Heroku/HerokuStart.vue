<script setup>
    import { onMounted } from 'vue'
    import { startHeroku } from '../../api/heroku'
    import { useAlert } from '../../stores/alertSlice'

    const alertStore = useAlert()

    const callHeroku = async () => {
        alertStore.callAlert({ title: '請稍等！, 喚醒後端服務！', type: 'alert' })
        try {
            const res = await startHeroku()
            alertStore.callAlert({ title: '成功連結後端', type: 'check' })
            return res
        } catch (error) {
            console.error(error)
            alertStore.callAlert({ title: '注意! Heroku 連結失敗', type: 'errors' })
            return error
        }
    }

    onMounted(() => {
        callHeroku()
    })
</script>

<template>
    <div></div>
</template>

<style scoped></style>
