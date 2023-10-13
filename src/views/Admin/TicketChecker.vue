<script setup>
    // import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
    const onDetect = (data) => {
        console.log(data)
    }
</script>
<template>
    <div>Ticket checker</div>
    <div>
        <p>HTML 只能開啟拍照與攝影功能</p>
        <label for="camera"> Test </label>
        <input
            id="camera"
            type="file"
            accept="*"
            capture="environment"
        />
    </div>
    <div>
        <p>這是vue qrcode reader</p>
        <qrcode-stream @detect="onDetect">123</qrcode-stream>
    </div>
</template>
<style lang="scss"></style>
