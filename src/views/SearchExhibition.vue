<template>
    <div class="container">
        <div class="d-flex">
            <Magnify class="me-2 fs-4" />
            <b-form-input
                v-model="keyword"
                placeholder="請輸入關鍵字"
            ></b-form-input>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    const keyword = ref(null)
</script>

<style lang="scss" scoped></style>
