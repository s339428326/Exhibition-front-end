<script>
    import AppFooter from './AppFooter.vue'
    import CartHeader from './CartHeader.vue'

    export default {
        components: { AppFooter, CartHeader }
    }
</script>

<template>
    <CartHeader />
    <router-view />
    <AppFooter />
</template>

<style scoped></style>
