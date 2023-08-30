<template>
    <header class="text-black bg-primary">
        <nav class="container py-4 d-flex justify-content-between align-items-center">
            <RouterLink
                class="fs-4 fw-bold text-black"
                to="/"
                >Logo</RouterLink
            >
            <ul class="d-flex gap-3 fs-6 fw-bold align-items-center">
                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="/"
                        >Home</RouterLink
                    >
                </li>
                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        to="/searchExhibition"
                        >搜索頁</RouterLink
                    >
                </li>
                <li>
                    <CartButton />
                </li>
                <li class="nav-item">
                    <UserButton />
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router'
    import UserButton from '../UserButton.vue'
    import CartButton from '../cartButton.vue'
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/layouts/header';
    @import '@/assets/scss/layouts/footer';

    .nav-item:hover {
        color: $primary;
    }
    .router-link-active.router-link-exact-active.nav-link {
        color: $danger;
        font-weight: 700;
    }
</style>
