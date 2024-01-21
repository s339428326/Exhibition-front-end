<script setup>
    import { ref, onMounted } from 'vue'
    import { partnerLogin } from '../../api/partner.js'
    import { useRouter } from 'vue-router'
    import { userDataStore } from '../../stores/userData'

    const router = useRouter()
    const user = userDataStore()

    const adminLoginRef = ref('')
    const adminLoginErrmsg = ref(null)
    const isLoading = ref(false)

    //
    const adminLoginForm = async (data) => {
        isLoading.value = true
        const res = await partnerLogin({
            email: data?.['admin-email'],
            password: data?.['admin-password']
        })

        if (typeof res === 'string') {
            adminLoginErrmsg.value = res
            isLoading.value = false
            return
        }

        if (res?.data?.user?.role !== 'user') user.userData = res?.data?.user

        router.push({
            name: 'AdminMain'
        })
        isLoading.value = false
    }
</script>
<template>
    <main class="container vh-100 d-flex justify-content-center align-items-center">
        <div class="w-form p-3">
            <div
                class="d-flex flex-column text-light font-quantum l-h-1 bg-primary fs-1 p-3 w-fit-content mb-4"
                to="/"
            >
                <div>
                    <span class="fw-normal text-secondary">A</span>
                    <span class="fw-normal">rt</span>
                </div>

                <span class="fw-normal"> Search </span>
                <p class="text-secondary">Fair</p>
            </div>
            <h1 class="fs-4 text-center mb-4">後台登入</h1>
            <VeeForm
                @submit="adminLoginForm"
                ref="adminLoginRef"
                v-slot="{ errors }"
                class="d-flex flex-column gap-2"
            >
                <div class="form-floating mb-3">
                    <VeeField
                        id="admin-email"
                        :class="`form-control ${errors[`${'admin-email'}`] ? 'border-danger' : ''}`"
                        placeholder="placeholder"
                        name="admin-email"
                        type="email"
                        rules="required|email"
                    />
                    <label for="admin-email">帳戶</label>
                    <small
                        v-if="errors['admin-email']"
                        class="text-danger"
                        >{{ errors['admin-email'].replace('admin-email', '帳戶') }}</small
                    >
                </div>
                <div class="form-floating">
                    <VeeField
                        id="admin-password"
                        :class="`form-control ${
                            errors[`${'admin-password'}`] ? 'border-danger' : ''
                        }`"
                        placeholder="placeholder"
                        name="admin-password"
                        type="password"
                        rules="required"
                    />
                    <label for="admin-password">密碼</label>
                    <small
                        v-if="errors['admin-password']"
                        class="text-danger"
                        >{{ errors['admin-password'].replace('admin-password', '密碼') }}</small
                    >
                </div>
                <small class="text-danger">{{ adminLoginErrmsg }}</small>
                <button
                    class="btn btn-dark d-flex gap-2 justify-content-center align-items-center"
                    type="submit"
                >
                    <div
                        v-if="isLoading"
                        class="spinner-border text-light"
                        role="status"
                    >
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p v-else>登入</p>
                </button>
            </VeeForm>
        </div>
    </main>
</template>
<style lang="scss" scoped>
    .w-fit-content {
        width: fit-content;
        margin-right: auto;
        margin-left: auto;
    }

    .w-form {
        width: 50%;
        @media screen and (max-width: 991px) {
            width: 100%;
        }
    }
</style>
