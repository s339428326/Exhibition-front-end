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
    <AppFooter class="position-fixed bottom-0 start-0 end-0" />
</template>

<style scoped></style>
