<template>
    <header class="bg-light text-black">
        <nav class="container py-4 d-flex justify-content-between align-items-center">
            <div class="d-flex">
                <h1 class="fs-4 fw-bold mb-0">Logo</h1>
                <h2 class="fs-4 fw-bold mb-0 ms-3 px-3 border-start border-dark border-2">
                    購物車
                </h2>
            </div>
            <ul class="d-flex gap-2 fs-6 fw-bold align-items-center">
                <li class="nav-item">
                    <UserButton />
                </li>
                <li class="nav-item">
                    <CartButton />
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    // import { RouterLink } from 'vue-router'
    import CartButton from '../CartButton.vue'
    import UserButton from '../UserButton.vue'
</script>

<style lang="scss" scoped></style>
