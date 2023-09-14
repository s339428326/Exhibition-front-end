<script setup>
    import { ref, onBeforeMount, watch } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
    import { updateUserInfoData } from '../../api/user'
    import { useForm } from 'vee-validate'
    import * as yup from 'yup'

    import AvatarUpload from '../../components/user/AvatarUpload.vue'

    const user = userDataStore()
    const userRefs = storeToRefs(user)

    const isLoading = ref(false)

    const { errors, setValues, handleSubmit, defineInputBinds } = useForm({
        initialValues: {
            name: '',
            email: ''
        },
        validationSchema: yup.object({
            name: yup.string('請輸入字串').required('喊稱不能為空').max(20, '最多請不要超過20字元'),
            email: yup.string('請輸入字串').email('請輸入正確Email').required('請勿空白')
        })
    })

    const email = defineInputBinds('email')
    const name = defineInputBinds('name')

    //submit
    const infoSubmit = handleSubmit(async (values) => {
        isLoading.value = true
        // alert(JSON.stringify(values, null, 2))
        try {
            const res = await updateUserInfoData(user.userData?.localId, values)
            const { email, name } = res.data
            user.userData.email = email
            user.userData.name = name
            alert('用戶資訊更改成功！')
        } catch (error) {
            alert(JSON.stringify(error, null, 2))
        }

        isLoading.value = false
    })

    const initUserInfo = () => {
        const { email, name } = userRefs.userData.value
        setValues({ email, name })
    }

    watch(userRefs.userData, () => {
        initUserInfo()
    })

    onBeforeMount(() => {
        initUserInfo()
    })
</script>

<template>
    <h2 class="border-bottom mb-4 fs-4 pb-3 fw-medium">會員資料</h2>
    <div class="row">
        <div class="col-md-4">
            <AvatarUpload />
        </div>
        <div class="col-md-8">
            <VeeForm
                class="d-flex flex-column gap-2 mb-4"
                @submit="infoSubmit"
            >
                <div>
                    <label
                        for="name"
                        class="form-label"
                        >暱稱</label
                    >
                    <!-- is-invalid -->
                    <input
                        :class="`form-control ${errors.name && 'is-invalid'}`"
                        v-bind="name"
                        type="text"
                        name="name"
                        id="name"
                    />
                    <small class="text-danger error-text">{{ errors.name && errors.name }}</small>
                </div>
                <div class="d-flex flex-column">
                    <label
                        class="form-label"
                        for="email"
                        >信箱</label
                    >
                    <input
                        :class="`form-control ${errors.email && 'is-invalid'}`"
                        v-bind="email"
                        type="text"
                        name="email"
                        id="email"
                    />
                    <small class="text-danger error-text">{{ errors.email && errors.email }}</small>
                </div>

                <button class="btn btn-dark ms-auto py-2 px-4 fw-medium mt-4">
                    <p v-if="isLoading === false">確認</p>
                    <div v-else>
                        <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        Loading...
                    </div>
                </button>
            </VeeForm>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .error-text {
        font-size: 14px;
        height: 14px;
    }
</style>
