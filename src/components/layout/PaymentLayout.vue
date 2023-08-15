<script>
    import AppFooter from './AppFooter.vue'
    import CartHeader from './CartHeader.vue'

    export default {
        components: { AppFooter, CartHeader }
    }
</script>

<template>
    <CartHeader />
    <router-view class="content" />
    <AppFooter />
</template>

<style scoped>
    .content {
        min-height: calc(100vh - 96px - 56px);
    }
</style>
