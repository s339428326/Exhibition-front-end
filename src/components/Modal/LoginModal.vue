<template>
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
                        v-slot="{ errors, meta }"
                        v-if="isRegisterClick === false"
                        class="d-flex flex-column"
                        ref="loginRef"
                        @submit="loginSubmit"
                    >
                        <!-- 切割範圍 -->
                        <Field
                            id="login-email"
                            labelName="信箱"
                            placeholder="請輸入信箱"
                            type="email"
                            name="email"
                            rules="email"
                            :errors="errors"
                        />
                        <Field
                            id="login-password"
                            labelName="密碼"
                            placeholder="請輸入密碼"
                            type="password"
                            name="密碼"
                            rules="min:8"
                            :errors="errors"
                            aria-required="true"
                        />
                        <SubmitBtn
                            :isLoading="isLoading"
                            :meta="meta"
                            name="登入"
                        />
                        <p class="h-18 text-danger mb-2">{{ resLoginErrorMessage }}</p>
                    </VeeForm>
                    <!-- registerFrom -->
                    <VeeForm
                        v-else
                        ref="registerRef"
                        v-slot="{ errors, meta }"
                        class="d-flex flex-column"
                        @submit="registerSubmit"
                    >
                        <Field
                            id="register-email"
                            labelName="信箱"
                            name="email"
                            type="email"
                            placeholder="請輸入信箱"
                            rules="required|email"
                            :errors="errors"
                        />
                        <Field
                            id="register-password"
                            labelName="密碼"
                            name="密碼"
                            type="password"
                            placeholder="請輸入密碼"
                            rules="required|min:8"
                            :errors="errors"
                        />
                        <Field
                            id="register-password"
                            labelName="請再次確認密碼"
                            name="確認密碼"
                            type="password"
                            placeholder="請輸入密碼"
                            rules="required|min:8|confirmed:@密碼"
                            :errors="errors"
                        />
                        <SubmitBtn
                            :isLoading="isLoading"
                            :meta="meta"
                            name="註冊"
                        />
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
</template>
<script setup>
    import { userDataStore } from '../../stores/userData'
    import { ref } from 'vue'
    import { Modal } from 'bootstrap'
    import Field from '@/components/Form/Field.vue'
    import SubmitBtn from '@/components/Form/SubmitBtn.vue'

    const store = userDataStore()

    //change From View State
    let isRegisterClick = ref(false)
    let resLoginErrorMessage = ref('')
    let resRegisterErrorMessage = ref('')
    //Form ref
    const loginRef = ref(null)
    const registerRef = ref(null)
    //loading state
    const isLoading = ref(false)

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
            const modal = Modal.getInstance('#loginModal')
            modal.hide()
        }

        //註冊失敗
        if (typeof res === 'string') {
            resRegisterErrorMessage.value = res
        }
        isLoading.value = false
    }
</script>
<style lang="scss" scoped>
    .h-18 {
        height: 18px;
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
