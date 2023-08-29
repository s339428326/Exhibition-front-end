<template>
    <div v-if="isLogin === false">
        <!-- Button trigger modal -->
        <button
            type="button"
            class="btn btn-secondary text-white d-flex align-items-center gap-2"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
        >
            <AccountCircle />
            登入 / 註冊
        </button>

        <!-- Modal -->
        <div
            class="modal fade"
            id="loginModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <!-- header -->
                    <div class="d-flex justify-content-end">
                        <button
                            class="bg-black text-white p-2 close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="text-center fs-3 fw-light text-black">登入</p>
                        <b-form @submit="loginHandler">
                            <b-form-group
                                id="input-group-email"
                                class="text-black mb-4"
                                label="信箱"
                                label-for="email"
                            >
                                <b-form-input
                                    class="border-0 border-bottom rounded-0 border-black outline-none"
                                    id="email"
                                    v-model="loginForm.email"
                                    type="email"
                                    placeholder="請輸入信箱"
                                    required
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group
                                id="input-group-password"
                                class="text-black"
                                label="密碼"
                                label-for="password"
                            >
                                <b-form-input
                                    class="border-0 border-bottom rounded-0 border-black outline-none"
                                    id="password"
                                    v-model="loginForm.password"
                                    type="password"
                                    placeholder="請輸入密碼"
                                    required
                                ></b-form-input>
                            </b-form-group>
                            <!-- 錯誤訊息 -->
                            <p class="error my-2">{{ errorMessage }}</p>
                            <button
                                class="btn btn-primary w-100 mt-2"
                                type="submit"
                            >
                                登入
                            </button>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div
        class="d-flex pointer"
        v-else
    >
        <b-dropdown
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
        >
            <template #button-content>
                <AccountCircle class="me-1" />
                <template v-if="isLogin">
                    <span class="vertical-align-middle">登出</span>
                </template>
                <template v-else>
                    <span class="vertical-align-middle">登入</span>
                </template>
            </template>
            <b-dropdown-item to="/user/information">會員資料</b-dropdown-item>
            <b-dropdown-item to="/user/orderSearch">訂單查詢</b-dropdown-item>
            <b-dropdown-item to="/user/editPassword">修改密碼</b-dropdown-item>
            <b-dropdown-item to="/user/favoriteList">收藏展覽</b-dropdown-item>
            <b-dropdown-item>
                <button
                    class="border-0 bg-transparent"
                    type="button"
                >
                    登出
                </button>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
    import { BForm, BFormGroup, BFormInput } from 'bootstrap-vue-next'
    import { userDataStore } from '../stores/userData'
    import { Modal } from 'bootstrap'

    export default {
        data() {
            return {
                userDataInstance: userDataStore(),
                isLogin: false,
                errorMessage: '',
                registerForm: {
                    email: '',
                    password: ''
                },
                loginForm: {
                    email: '',
                    password: ''
                }
            }
        },
        components: {
            BForm,
            BFormGroup,
            BFormInput
        },
        methods: {
            async loginHandler(e) {
                e.preventDefault()
                const userData = await this.userDataInstance.login(this.loginForm)

                //登入成功
                if (userData === true) {
                    this.isLogin = true
                    const modal = Modal.getInstance('#loginModal')
                    modal.hide()
                }

                //登入失敗
                if (typeof userData === 'string') {
                    //clear input value
                    this.loginForm.email = ''
                    this.loginForm.password = ''
                    this.errorMessage = userData
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .outline-none {
        outline: none;
    }

    .error {
        height: 12px;
        color: #ef4444;
        font-size: 0.75rem;
    }

    .close {
        border: none;
        border-top-right-radius: 0.375rem;
        border-bottom-left-radius: 1rem;
    }

    .close:hover {
        opacity: 0.9;
    }
</style>
