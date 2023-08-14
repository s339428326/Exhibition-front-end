<script>
    import AppHeader from './AppHeader.vue'
    import AppFooter from './AppFooter.vue'
    export default {
        components: { AppHeader, AppFooter }
    }
</script>

<template>
    <AppHeader />
    <router-view />
    <AppFooter />
</template>

<style scoped></style>
