<template>
    <header class="position-sticky top-0 text-black bg-dark z-3">
        <nav class="container py-3 d-flex justify-content-between align-items-center">
            <div class="d-flex gap-4 align-items-center">
                <RouterLink
                    class="fs-4 text-light font-quantum l-h-1"
                    to="/"
                >
                    <div>
                        <span class="fw-normal text-secondary fs-4">A</span>
                        <span class="fw-normal fs-4">rt</span>
                    </div>

                    <span class="fw-normal fs-4"> Search </span>
                    <p class="text-secondary">Fair</p>
                </RouterLink>
            </div>

            <ul class="d-flex gap-3 fs-6 fw-bold align-items-center">
                <li class="nav-item">
                    <RouterLink
                        class="nav-link fw-medium"
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
    import { RouterLink } from 'vue-router'
    import UserButton from '../UserButton.vue'
    import CartButton from '../cartButton.vue'
</script>

<style lang="scss" scoped>
    // Google font for Logo
    @import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');

    .l-h-1 {
        line-height: 0.75;
    }

    .nav-link:hover {
        opacity: 0.8;
    }
    .nav-link {
        color: white;
        opacity: 1;
    }

    .router-link-active.router-link-exact-active.nav-link {
        color: red;
    }
</style>
