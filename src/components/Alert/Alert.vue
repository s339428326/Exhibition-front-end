<script setup>
    import AlertFade from '../../animation/AlertFade.vue'
    import { useAlert } from '../../stores/alertSlice'

    const alert = useAlert()
</script>

<template>
    <!-- Type check close alert -->
    <AlertFade>
        <div
            class="position-fixed top-header end-header border border-dark px-3 py-3 z-alert bg-white"
            v-if="alert.isActive"
        >
            <button
                class="border-0 bg-transparent close-btn mb-1 position-absolute d-flex"
                type="button"
                @click="alert.isActive = false"
            >
                <CloseIcon :size="12" />
            </button>

            <div class="d-flex align-items-center gap-3">
                <div v-if="alert.type === 'check'">
                    <CheckCircleOutline :size="48" />
                </div>
                <div v-if="alert.type === 'error'">
                    <CloseCircleOutline :size="48" />
                </div>
                <div v-if="alert.type === 'alert'">
                    <AlertCircleOutline :size="48" />
                </div>
                <div class="">
                    <p
                        v-if="alert.title"
                        class="fs-5 fw-medium"
                    >
                        {{ alert.title }}
                    </p>
                    <p v-if="alert.content">{{ alert.content }}</p>
                </div>
            </div>
        </div>
    </AlertFade>
</template>

<style lang="scss" scoped>
    /* fillColor="#16a34a" */
    /* fillColor="#dc2626" */
    /* fillColor="#eab308" */
    .close-btn {
        top: 2px;
        left: 5px;
    }

    .top-header {
        top: 100px;
    }

    .end-header {
        right: 20px;
    }

    .z-alert {
        z-index: 9999;
    }
</style>
