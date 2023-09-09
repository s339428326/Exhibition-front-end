<template>
    <div class="container">
        <div class="row d-flex justify-content-between">
            <div class="col-3">
                <UserNavList />
            </div>
            <div class="col-9">
                <div class="p-3 my-4 bg-secondary bg-opacity-25 rounded-3">
                    <h2 class="border-bottom border-dark pb-2">會員資料</h2>
                    <form>
                        <div class="row my-3">
                            <div class="col-3">
                                <img
                                    src="https://fakeimg.pl/150x100/"
                                    class="rounded"
                                />
                            </div>
                            <div class="col-9 mt-auto">
                                <label
                                    for="inputEmail"
                                    class="col-md-3 col-12 col-form-label"
                                    >會員姓名</label
                                >
                                <div class="col-md-9 col-12">
                                    <input
                                        type="text"
                                        id="inputName"
                                        class="form-control"
                                        placeholder="王小明"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label
                                for="inputEmail"
                                class="col-md-3 col-12 col-form-label"
                                >會員電子郵件</label
                            >
                            <div class="col-md-9 col-12">
                                <input
                                    type="email"
                                    id="inputEmail"
                                    class="form-control"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label
                                for="inputPhoto"
                                class="col-md-3 col-12 col-form-label"
                                >手機號碼</label
                            >
                            <div class="col-md-9 col-12">
                                <input
                                    type="password"
                                    id="inputPhoto"
                                    class="form-control"
                                    placeholder="000-000000"
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label
                                for="inputPassword"
                                class="col-md-3 col-12 col-form-label"
                                >會員密碼</label
                            >
                            <div class="col-md-9 col-12">
                                <input
                                    type="password"
                                    class="form-control"
                                    id="inputPassword"
                                    placeholder="設定新密碼"
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label
                                for="inputBirth"
                                class="col-md-3 col-12 col-form-label"
                                >出生年月日</label
                            >
                            <div class="col-md-9 col-12">
                                <input
                                    type="password"
                                    id="inputBirth"
                                    class="form-control"
                                    placeholder="xxxx/xx/xx"
                                />
                            </div>
                        </div>
                        <div class="row mb">
                            <div class="col-12">
                                <button
                                    type="submit"
                                    class="btn btn-primary"
                                >
                                    送出
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import UserNavList from '@/components/user/UserNavList.vue'
</script>

<style lang="scss" scoped>
    // scss在這編輯
</style>