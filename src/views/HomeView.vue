<template>
    <main>
        <TheWelcome />
        <TestToast />
        <TestPopover class="mt-4 mb-4" />
        <p>Vic_test</p>
    </main>
</template>

<script setup>
    import { onMounted } from 'vue'
    import TheWelcome from '../components/TheWelcome.vue'
    import TestToast from '../components/TestToast.vue'
    import TestPopover from '../components/TestPopover.vue'
    import { useExhibitionStore } from '../stores/exhibitionList'

    onMounted(() => {
        const exhibitionStore = useExhibitionStore()
        exhibitionStore.getExhibitionData()
    })
</script>
