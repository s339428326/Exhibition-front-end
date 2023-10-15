<script setup>
    //注意使用ver.5 因為開發團隊文件未更新完全, 請直接參考以下API文件
    // https://vue-qrcode-reader.netlify.app/api/QrcodeStream.html

    import { ref } from 'vue'
    //Not Vue-qrcode-reader team recommend method close camera
    const camera = ref(false)

    const scannedData = ref('')

    //記入該名檢票員掃描票卷(工作人員工作記錄非主要功能)
    const ticketCheckerData = ref([])

    //

    const onDetect = (detected) => {
        scannedData.value = detected[0]?.rawValue
        if (scannedData) alert(JSON.stringify(detected, null, 2))
        // if (scannedData) camera.value = false
    }

    const closeCamera = () => {
        camera.value = !camera.value
    }

    //refer(QR code 檢測框)
    //https://vue-qrcode-reader.netlify.app/demos/CustomTracking.html
    const paintOutline = (detectedCodes, ctx) => {
        for (const detectedCode of detectedCodes) {
            const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

            ctx.strokeStyle = 'red'

            ctx.beginPath()
            ctx.moveTo(firstPoint.x, firstPoint.y)
            for (const { x, y } of otherPoints) {
                ctx.lineTo(x, y)
            }
            ctx.lineTo(firstPoint.x, firstPoint.y)
            ctx.closePath()
            ctx.stroke()
        }
    }
</script>

<template>
    <div>
        <h1>Test</h1>
        {{ camera }}
        <button
            type="button"
            @click="closeCamera"
        >
            Close Testing
        </button>

        <div>Scanned Data: {{ scannedData }}</div>
        <qrcode-stream
            v-if="camera"
            :track="paintOutline"
            @camera-on="onReady"
            @detect="onDetect"
        ></qrcode-stream>
    </div>
</template>
