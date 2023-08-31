<template>
    <div v-if="isLogin === false">
        <!-- Button trigger modal -->
        <button
            type="button"
            :class="`btn btn-secondary text-white d-flex align-items-center gap-2 ${
                isLoading && 'd-none'
            }`"
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
                <div class="modal-content height-animation">
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
                        <p class="fw-bold text-center fs-4 text-dark">
                            {{ isRegisterClick ? '註冊' : '登入' }}
                        </p>

                        <!-- loginFrom -->
                        <VeeForm
                            v-slot="{ errors }"
                            v-if="isRegisterClick === false"
                            class="d-flex flex-column"
                            ref="loginRef"
                            @submit="loginSubmit"
                        >
                            <div class="d-flex flex-column">
                                <label
                                    class="text-dark"
                                    for="login-email"
                                    >信箱</label
                                >
                                <VeeField
                                    id="login-email"
                                    class="border-bottom border-top-0 border-start-0 border-end-0 border-black p-1"
                                    placeholder="請輸入信箱"
                                    name="email"
                                    type="email"
                                    rules="required|email"
                                />
                                <ErrorMessage
                                    v-if="errors['email']"
                                    as="p"
                                    class="text-danger errorMessage"
                                    name="email"
                                />
                                <p
                                    v-else
                                    class="errorMessage"
                                ></p>
                            </div>
                            <div class="d-flex flex-column">
                                <label
                                    for="login-password"
                                    class="text-dark"
                                    >密碼</label
                                >
                                <VeeField
                                    id="login-password"
                                    class="border-bottom border-top-0 border-start-0 border-end-0 border-black p-1"
                                    placeholder="請輸入密碼"
                                    name="密碼"
                                    type="password"
                                    rules="required|min:8"
                                />
                                <ErrorMessage
                                    v-if="errors['密碼']"
                                    as="p"
                                    class="text-danger errorMessage"
                                    name="密碼"
                                />
                                <p
                                    v-else
                                    class="errorMessage"
                                ></p>
                            </div>
                            <button
                                class="btn btn-primary w-100"
                                type="submit"
                                :disabled="isLoading"
                            >
                                <template v-if="isLoading === true">
                                    <span
                                        class="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    <span class="sr-only">Loading...</span>
                                </template>

                                <template v-else> 送出 </template>
                            </button>
                            <p class="h-18 text-danger mb-2">{{ resLoginErrorMessage }}</p>
                        </VeeForm>
                        <!-- registerFrom -->
                        <VeeForm
                            v-else
                            ref="registerRef"
                            v-slot="{ errors }"
                            class="d-flex flex-column"
                            @submit="registerSubmit"
                        >
                            <div class="d-flex flex-column gap-1 mb-1">
                                <label
                                    class="text-dark"
                                    for="register-email"
                                    >信箱</label
                                >
                                <VeeField
                                    id="register-email"
                                    :class="`border-bottom border-top-0 border-start-0 border-end-0  p-1 ${
                                        errors['email'] ? 'border-danger' : 'border-black'
                                    }`"
                                    placeholder="請輸入信箱"
                                    name="email"
                                    type="email"
                                    rules="required|email"
                                />

                                <ErrorMessage
                                    v-if="errors['email']"
                                    as="p"
                                    class="text-danger errorMessage"
                                    name="email"
                                />
                                <p
                                    v-else
                                    class="errorMessage"
                                ></p>
                            </div>
                            <div class="d-flex flex-column gap-1 mb-1">
                                <label
                                    class="text-dark"
                                    for="register-password"
                                    >密碼</label
                                >
                                <VeeField
                                    id="register-password"
                                    :class="`border-bottom border-top-0 border-start-0 border-end-0  p-1 ${
                                        errors['密碼'] ? 'border-danger' : 'border-black'
                                    }`"
                                    placeholder="請輸入密碼"
                                    name="密碼"
                                    type="password"
                                    rules="required|min:8"
                                />

                                <ErrorMessage
                                    v-if="errors['密碼']"
                                    as="p"
                                    class="text-danger errorMessage"
                                    name="密碼"
                                />
                                <p
                                    v-else
                                    class="errorMessage"
                                ></p>
                            </div>
                            <div class="d-flex flex-column gap-1 mb-1">
                                <label
                                    class="text-dark"
                                    for="register-confirmPassword"
                                    >請再次確認密碼</label
                                >
                                <VeeField
                                    id="register-confirmPassword"
                                    :class="`border-bottom border-top-0 border-start-0 border-end-0  p-1 ${
                                        errors['確認密碼'] ? 'border-danger' : 'border-black'
                                    }`"
                                    placeholder="請再次輸入密碼"
                                    type="password"
                                    name="確認密碼"
                                    rules="required|min:8|confirmed:@密碼"
                                />
                                <ErrorMessage
                                    v-if="errors['確認密碼']"
                                    as="p"
                                    class="text-danger errorMessage"
                                    name="確認密碼"
                                />
                                <p
                                    v-else
                                    class="errorMessage"
                                ></p>
                            </div>
                            <button
                                class="btn btn-primary w-100 mb-2"
                                type="submit"
                                :disabled="isLoading"
                            >
                                <template v-if="isLoading === true">
                                    <span
                                        class="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    <span class="sr-only">Loading...</span>
                                </template>

                                <template v-else> 註冊 </template>
                            </button>
                            <p class="h-18 text-danger mb-2">{{ resRegisterErrorMessage }}</p>
                        </VeeForm>

                        <div class="d-flex gap-2">
                            <button
                                @click="changeFromHandler"
                                class="btn btn-secondary text-white"
                                type="button"
                            >
                                {{ isRegisterClick === true ? '返回登入' : '註冊' }}
                            </button>
                            <button
                                class="btn btn-secondary text-white"
                                type="button"
                            >
                                忘記密碼
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div
        v-else
        class="d-flex pointer"
    >
        <b-dropdown
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
        >
            <template #button-content>
                <img
                    class="avatar me-2"
                    :src="`${store.userData.picture}`"
                />
                <span class="vertical-align-middle text-dark">{{ store.userData.name }}</span>
            </template>
            <b-dropdown-item to="/user/information">會員資料</b-dropdown-item>
            <b-dropdown-item to="/user/orderSearch">訂單查詢</b-dropdown-item>
            <b-dropdown-item to="/user/editPassword">修改密碼</b-dropdown-item>
            <b-dropdown-item to="/user/favoriteList">收藏展覽</b-dropdown-item>
            <b-dropdown-item @click="logout"> 登出 </b-dropdown-item>
        </b-dropdown>
    </div>

    <!-- 讀取狀態 -->
    <!-- isLoading -->
    <button
        type="button"
        :class="`btn btn-secondary text-white d-flex align-items-center gap-2 ${
            !isLoading && 'd-none'
        }`"
    >
        <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
        ></span>
        <span class="sr-only">Loading...</span>
    </button>
</template>

<script setup>
    import { userDataStore } from '../stores/userData'
    import { ref, onBeforeMount } from 'vue'
    import { Modal } from 'bootstrap'

    //login state
    const isLogin = ref(false)
    //loading state
    const isLoading = ref(false)
    //store
    const store = userDataStore()
    //change From View State
    let isRegisterClick = ref(false)
    let resLoginErrorMessage = ref('')
    let resRegisterErrorMessage = ref('')
    //Form ref
    const loginRef = ref(null)
    const registerRef = ref(null)

    //驗證token
    const verifyToken = async () => {
        isLoading.value = true

        const token = localStorage.getItem('token')
        let userId = ''
        if (token) {
            userId = await store.confirmToken(token)
        } else {
            isLoading.value = false
            return
        }
        //如果失敗跳出運作
        if (userId === false) {
            isLogin.value = false
            isLoading.value = false
            return
        }

        const userInfoData = await store.getUserInfoData(userId)
        console.log('[userInfoData]', userInfoData)
        isLogin.value = true
        isLoading.value = false
    }
    //fake logoutState
    const logout = () => {
        //clear login
        console.log('登出')
        localStorage.removeItem('token')
        isLogin.value = false
    }
    //change from view
    const changeFromHandler = (e) => {
        e.preventDefault()
        isRegisterClick.value = !isRegisterClick.value
        console.log(isRegisterClick.value)
    }
    //登入 handler
    const loginSubmit = async (data) => {
        isLoading.value = true
        console.log('[loginSubmit ]', data)
        const userData = await store.login({
            email: data.email,
            password: data['密碼']
        })

        //登入成功
        if (userData === true) {
            isLogin.value = true
            const modal = Modal.getInstance('#loginModal')
            modal.hide()
        }

        //登入失敗
        if (typeof userData === 'string') {
            loginRef.value.resetForm()
            resLoginErrorMessage.value = userData
        }
        isLoading.value = false
    }
    //註冊 handler
    const registerSubmit = async (data) => {
        console.log('[registerSubmit ]', data)
        isLoading.value = true
        const res = await store.register({
            email: data.email,
            password: data['密碼']
        })
        //註冊成功
        if (res === true) {
            isLogin.value = true
            const modal = Modal.getInstance('#loginModal')
            modal.hide()
        }

        //註冊失敗
        if (typeof res === 'string') {
            resRegisterErrorMessage.value = res
        }
        isLoading.value = false
    }

    onBeforeMount(() => {
        verifyToken()
    })
</script>

<style lang="scss" scoped>
    .avatar {
        border-radius: 50%;
        object-fit: cover;
        width: 36px;
        height: 36px;
        vertical-align: middle;
    }

    .h-18 {
        height: 18px;
    }

    .errorMessage {
        font-size: 0.8rem;
        height: 19.2px;
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
