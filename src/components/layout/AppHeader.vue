<template>
    <header class="bg-light text-black">
        <nav class="container py-4 d-flex justify-content-between align-items-center">
            <a
                class="fs-4 fw-bold"
                href="/"
                >Logo</a
            >
            <ul class="d-flex gap-2 fs-6 fw-bold align-items-center">
                <li class="nav-item">
                    <RouterLink
                        class="nav-link active"
                        aria-current="page"
                        to="/"
                        >Home</RouterLink
                    >
                </li>
                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        to="/about"
                        >About</RouterLink
                    >
                </li>
                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        to="/ViewExhibition"
                        >2-3 page</RouterLink
                    >
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
</script>

<style lang="scss" scoped></style>
