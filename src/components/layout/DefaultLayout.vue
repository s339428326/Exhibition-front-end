<script setup>
    import AppHeader from './AppHeader.vue'
    import AppFooter from './AppFooter.vue'
    import LoginModal from '../Modal/LoginModal.vue'
</script>

<template>
    <AppHeader />
    <main class="content">
        <router-view />
    </main>
    <AppFooter />
    <LoginModal />
</template>

<style scoped>
    .content {
        min-height: calc(100vh - 86px - 275px);
    }
</style>
