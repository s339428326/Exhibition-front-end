<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-3 mb-4">
                <UserNavList />
            </div>
            <div class="col-md-9">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script setup>
    import UserNavList from '@/components/user/UserNavList.vue'
</script>
<style lang="scss" scoped></style>
