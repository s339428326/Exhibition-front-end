<script setup>
    import { ref, onBeforeMount, watch } from 'vue'
    import QRCode from 'qrcode'

    const props = defineProps({
        content: String
    })

    const qrCode = ref('')

    const generateQR = async (text) => {
        try {
            const res = await QRCode.toDataURL(text)
            qrCode.value = res
        } catch (err) {
            console.error('[Qrcode Error]', err)
        }
    }

    watch(props, () => {
        generateQR(props.content)
    })

    onBeforeMount(() => {
        generateQR(props.content)
    })
</script>

<template lang="">
    <div>
        <img
            :src="qrCode"
            alt="Qrcode"
        />
    </div>
</template>

<style lang="scss" scoped></style>
