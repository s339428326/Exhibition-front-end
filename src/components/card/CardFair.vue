<template>
    <RouterLink :to="linkTo">
        <b-card
            :title="title"
            :img-src="imgSrc"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
        >
            <b-card-text>
                {{ textContent }}
            </b-card-text>
        </b-card>
    </RouterLink>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
    defineProps({
        title: String,
        imgSrc: String,
        linkTo: String,
        textContent: String
    })
</script>

<style lang="scss" scoped></style>
