<script>
    import AppHeader from './AppHeader.vue'
    import AppFooter from './AppFooter.vue'
    export default {
        components: { AppHeader, AppFooter }
    }
</script>

<template>
    <AppHeader />
    <router-view class="content" />
    <AppFooter />
</template>

<style scoped>
    .content {
        min-height: calc(100vh - 96px - 56px);
    }
</style>
