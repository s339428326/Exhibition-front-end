<template>
    <div class="container">
        <div class="row d-flex justify-content-between">
            <div class="col-3">
                <UserNavList />
            </div>
            <div class="col-9">
                <div class="p-3 my-4 bg-secondary bg-opacity-25 rounded-3">
                    <h2 class="border-bottom border-dark pb-2">會員資料</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import UserNavList from '@/components/user/UserNavList.vue'
</script>

<style lang="scss" scoped></style>
