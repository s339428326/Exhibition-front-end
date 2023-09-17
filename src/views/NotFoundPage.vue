<template>
    <div class="container notFound">
        <router-link
            class="text-light font-quantum l-h-1 bg-primary fs-1 p-3"
            to="/"
        >
            <div>
                <span class="fw-normal text-secondary">A</span>
                <span class="fw-normal">rt</span>
            </div>

            <span class="fw-normal"> Search </span>
            <p class="text-secondary">Fair</p>
        </router-link>
        <h1 class="fs-1 font-pathway">Not Found Page 404</h1>
        <router-link
            to="/"
            class="fs-4"
            >回到首頁</router-link
        >
    </div>
</template>
<script setup></script>
<style lang="scss" scoped>
    .notFound {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }
</style>
