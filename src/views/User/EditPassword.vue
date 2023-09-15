<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    import { login } from '../../api/auth'
    import { changePassword } from '../../api/auth'

    import { useForm } from 'vee-validate'
    import * as yup from 'yup'

    import { userDataStore } from '../../stores/userData'
    import { useAlert } from '../../stores/alertSlice'

    const { errors, values, setValues, handleSubmit, defineInputBinds, setErrors } = useForm({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: yup.object({
            password: yup.string().required('請勿空白'),
            confirmPassword: yup.string().oneOf([yup.ref('password')], '請確認密碼是否相同')
        })
    })

    const router = useRouter()

    const user = userDataStore()
    const alertStore = useAlert()

    const currentPassword = ref('')
    const isReCheck = ref(false)

    const password = defineInputBinds('password')
    const confirmPassword = defineInputBinds('confirmPassword')

    const checkCurrentPassword = async (email, password) => {
        console.log('[change]', email, password)
        const res = await login({
            email,
            password,
            returnSecureToken: true
        })
        if (res.data) {
            isReCheck.value = true
            localStorage.setItem('token', res.data.idToken)
        } else {
            isReCheck.value = false
        }
    }

    //step2 password vee-vail for confirm password

    const submit = handleSubmit(async (values) => {
        const res = await changePassword(localStorage.getItem('token'), values.password)
        if (res.data) {
            user.logout()
            alertStore.callAlert({ title: '密碼更改成功, 請重新登入！' }, 3000)
            router.push({ name: 'Home' })
        } else {
            console.error('伺服器錯誤, 請聯絡開發人員！')
            setErrors({ server: ['伺服器錯誤, 請聯絡開發人員！'] })
        }
    })
</script>
<template>
    <h1 class="border-bottom mb-4 fs-4 pb-3 fw-medium">修改密碼</h1>
    <div class="row">
        <div class="col-md-9">
            <div
                v-if="isReCheck === false"
                class="d-flex gap-2 align-items-center"
            >
                <!-- confirm current password -->
                <div>
                    <label
                        class="form-label"
                        for="current_password"
                        >請先輸入目前密碼</label
                    >
                    <input
                        v-model="currentPassword"
                        placeholder="請輸入目前密碼"
                        class="form-control"
                        type="password"
                        id="current_password"
                    />
                </div>
                <!-- current check! -->
                <button
                    @click="checkCurrentPassword(user.userData?.email, currentPassword)"
                    type="button"
                    class="btn btn-dark mt-auto"
                >
                    確認
                </button>
            </div>

            <div v-else>
                <VeeForm
                    class="d-flex flex-column gap-3"
                    @submit="submit"
                >
                    <div class="d-flex flex-column">
                        <label
                            class="form-label"
                            for="password"
                            >更改密碼</label
                        >
                        <input
                            :class="`form-control ${errors.password && 'is-invalid'}`"
                            v-bind="password"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="請輸入更改密碼"
                        />
                        <small class="text-danger error-text">{{
                            errors.password && errors.password
                        }}</small>
                    </div>
                    <div class="d-flex flex-column">
                        <label
                            class="form-label"
                            for="confirmPassword"
                            >確認更改密碼</label
                        >
                        <input
                            :class="`form-control ${errors.confirmPassword && 'is-invalid'}`"
                            v-bind="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="請次確認更改密碼"
                        />
                        <small class="text-danger error-text">{{
                            errors.confirmPassword && errors.confirmPassword
                        }}</small>
                    </div>
                    <button
                        class="btn btn-dark ms-auto"
                        type="submit"
                    >
                        更改
                    </button>
                </VeeForm>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
