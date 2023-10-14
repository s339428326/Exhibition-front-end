<script setup>
    import { ref, onMounted } from 'vue'
    //////////////

    const scannedData = ref('')
    const onDecode = (result) => {
        alert(result)
        scannedData.value = result
    }
</script>

<template>
    <div>
        <h1>Test</h1>
        <qrcode-stream @decode="onDecode"></qrcode-stream>
        <div>Scanned Data: {{ scannedData }}</div>
    </div>
</template>
