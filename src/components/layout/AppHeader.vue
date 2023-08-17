<template>
    <header class="text-black">
        <nav class="container py-4 d-flex justify-content-between align-items-center">
            <a
                class="fs-4 fw-bold"
                href="/"
                >Logo</a
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
                <li class="nav-item">
                    <UserButton />
                </li>
                <li>
                    <CartButton />
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
    import CartButton from '../CartButton.vue'
    import UserButton from '../UserButton.vue'
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
