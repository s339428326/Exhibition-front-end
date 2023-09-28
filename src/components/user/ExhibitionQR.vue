<script setup>
    import { ref, onMounted } from 'vue'
    import QRCode from 'qrcode'

    const content = ref('')

    const generateQR = async (text) => {
        try {
            const res = await QRCode.toDataURL(text)
            content.value = res
        } catch (err) {
            console.error(err)
        }
    }

    onMounted(() => {
        generateQR('這是Testing')
    })
</script>

<template lang="">
    <div>
        <img
            :src="content"
            alt="Qrcode"
        />
    </div>
</template>

<style lang="scss" scoped></style>
