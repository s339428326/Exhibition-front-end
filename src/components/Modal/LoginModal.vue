<script setup>
    import { ref, watch } from 'vue'
    import { sendForgetEmail } from '../../api/auth'

    import { userDataStore } from '../../stores/userData'
    import { useAlert } from '../../stores/alertSlice'

    import { Modal } from 'bootstrap'

    import Field from '@/components/Form/Field.vue'
    import SubmitBtn from '@/components/Form/SubmitBtn.vue'

    const store = userDataStore()
    const { callAlert } = useAlert()

    //change From View State
    let fromView = ref('登入')
    let resLoginErrorMessage = ref('')
    let resRegisterErrorMessage = ref('')
    //Form ref
    const loginRef = ref(null)
    const registerRef = ref(null)
    const forgetPasswordRef = ref(null)
    //loading state
    const isLoading = ref(false)
    //email CD Time
    const emailTime = ref({
        isSend: false,
        counter: 60
    })

    //change from view
    const changeFromHandler = (viewName) => {
        // e.preventDefault()
        fromView.value = viewName
        console.log(fromView)
    }

    //Email Time watcher
    watch(emailTime.value, () => {
        let counter
        if (emailTime.value.isSend) {
            counter = setTimeout(() => {
                emailTime.value.counter--
            }, 1000)
        }
        if (emailTime.value.counter === 0) {
            clearTimeout(counter)
            emailTime.value.counter = 60
            emailTime.value.isSend = false
        }
    })

    //忘記密碼 handler
    const forgetPasswordSubmit = async (data) => {
        //test alert
        isLoading.value = true
        const modal = Modal.getInstance('#loginModal')
        try {
            const res = await sendForgetEmail(data)
            console.log(res)
            emailTime.value.isSend = true
            forgetPasswordRef.value.resetForm()
            callAlert({
                title: '信件已發送請至信箱確認',
                type: 'check'
            })
            modal.hide()
        } catch (error) {
            callAlert({
                title: '錯誤！',
                type: 'error'
            })
            modal.hide()
            console.error(error)
        }
        isLoading.value = false
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
    const registerSubmit = async (data, _method) => {
        console.log('[registerSubmit ]', data)
        isLoading.value = true

        const res = await store.register({
            username: data.email.split('@')[0],
            email: data.email,
            password: data.password,
            confirmPassword: data['確認密碼']
        })

        //註冊成功
        if (res === true) {
            const modal = Modal.getInstance('#loginModal')
            modal.hide()
        } else {
            //註冊失敗
            if (res?.message) {
                resRegisterErrorMessage.value = res?.message
            }
            const { setErrors } = _method
            setErrors(res)
        }

        isLoading.value = false
    }
</script>
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
                        <!-- {{ isRegisterClick ? '註冊' : '登入' }} -->
                        {{ fromView }}
                    </p>
                    <!-- loginFrom -->
                    <VeeForm
                        v-slot="{ errors, meta }"
                        v-if="fromView === '登入'"
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
                        v-if="fromView === '註冊'"
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
                            name="password"
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
                            rules="required|min:8|confirmed:@password"
                            :errors="errors"
                        />
                        <SubmitBtn
                            :isLoading="isLoading"
                            :meta="meta"
                            name="註冊"
                        />
                        <p class="h-18 text-danger mb-2">{{ resRegisterErrorMessage }}</p>
                    </VeeForm>
                    <VeeForm
                        v-if="fromView === '忘記密碼'"
                        v-slot="{ errors, meta }"
                        ref="forgetPasswordRef"
                        class="d-flex flex-column"
                        @submit="forgetPasswordSubmit"
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
                        <SubmitBtn
                            :isLoading="isLoading"
                            :meta="meta"
                            :name="` ${
                                emailTime.isSend
                                    ? `已發送, 等待${emailTime.counter}秒後可重試`
                                    : '發送信件'
                            }`"
                            :disable="emailTime.isSend"
                        />
                        <p class="h-18 text-danger mb-2">{{ resRegisterErrorMessage }}</p>
                    </VeeForm>
                    <div class="d-flex gap-2">
                        <button
                            @click="changeFromHandler(fromView === '登入' ? '註冊' : '登入')"
                            class="btn btn-secondary text-white"
                            type="button"
                        >
                            {{ fromView === '登入' ? '註冊' : '返回登入' }}
                        </button>
                        <button
                            @click="changeFromHandler('忘記密碼')"
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
