<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-12 col-md-3">
                <UserNavList />
            </div>
            <div class="col-12 col-md-9">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 p-3 border">
                                <!-- template -->
                                <router-view />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import UserNavList from '@/components/user/UserNavList.vue'
</script>
<style lang="scss" scoped></style>
