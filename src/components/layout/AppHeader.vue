<template>
    <header class="text-black bg-dark">
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
                <!-- <div class="d-flex gap-2 bg-light p-1 rounded-2">
                    <Magnify />
                    <input
                        class="border-0 bg-light outline-0"
                        type="search"
                        placeholder="搜尋展覽、音樂、藝文"
                        name="search"
                        id="home-search"
                    />
                </div> -->
            </div>

            <ul class="d-flex gap-3 fs-6 fw-bold align-items-center">
                <!-- <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="/"
                        >Home</RouterLink
                    >
                </li> -->
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
    @import '@/assets/scss/layouts/header';
    @import '@/assets/scss/layouts/footer';

    // Google font for Logo
    @import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');

    .l-h-1 {
        line-height: 0.75;
    }
    .outline-0 {
        outline: none;
    }

    .font-alata {
        font-family: 'Alata', sans-serif;
    }

    .nav-item:hover {
        color: $primary;
    }
    .nav-link {
        color: $secondary;
    }

    .router-link-active.router-link-exact-active.nav-link {
        color: $danger;
        /* font-weight: 700; */
    }
</style>
