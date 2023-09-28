<script setup>
    import { ref, onBeforeMount, watch } from 'vue'
    import { storeToRefs } from 'pinia'

    import { userDataStore } from '../../stores/userData'
    import { useAlert } from '../../stores/alertSlice'

    import { updateUserInfoData } from '../../api/user'
    import { changeEmail } from '../../api/auth'

    import { useForm } from 'vee-validate'
    import * as yup from 'yup'

    import AvatarUpload from '../../components/user/AvatarUpload.vue'
    import ExhibitionQR from '../../components/user/ExhibitionQR.vue'
    // import Calendar from '../../components/Calendar/Calendar.vue'

    //pinia store
    const user = userDataStore()
    const alertStore = useAlert()

    // storeToRefs 去監測 userStore 變化
    const userRefs = storeToRefs(user)

    const isLoading = ref(false)
    const isSend = ref(false)

    //Vee-vialed useForm
    //這裡使用客製化Hook嘗試製作, 非特殊需求不必這麼做
    const { errors, setValues, handleSubmit, defineInputBinds } = useForm({
        initialValues: {
            username: ''
        },
        validationSchema: yup.object({
            username: yup
                .string('請輸入字串')
                .required('喊稱不能為空')
                .max(20, '最多請不要超過20字元')
        })
    })

    const username = defineInputBinds('username')

    const changeEmailHandler = async (email) => {
        isSend.value = true
        const res = await changeEmail(email)
        if (typeof res === 'string') {
            isSend.value = false
            return alertStore.callAlert({ title: '伺服器錯誤', type: 'error' })
        }
        alertStore.callAlert({ title: '請至信箱確認信件', type: 'check' })
        isSend.value = false
    }

    //submit
    const infoSubmit = handleSubmit(async (values) => {
        isLoading.value = true
        try {
            const res = await updateUserInfoData(user.userData?.id, values)
            const { username } = res.data.user
            user.userData.username = username
            alertStore.callAlert({ title: '用戶資訊更改成功', type: 'check' })
        } catch (error) {
            console.error('[infoSubmit Error]', error)
            alertStore.callAlert({ title: '用戶資訊更改失敗', type: 'error' })
        }

        isLoading.value = false
    })

    const initUserInfo = () => {
        const { username } = userRefs.userData.value
        setValues({ username })
    }

    watch(userRefs.userData, () => {
        initUserInfo()
    })

    onBeforeMount(() => {
        initUserInfo()
    })
</script>

<template>
    <h1 class="border-bottom mb-4 fs-4 pb-3 fw-medium">會員資料</h1>
    <div class="row">
        <div class="col-md-6 col-lg-4">
            <AvatarUpload />
        </div>
        <div class="col-md-6 col-lg-8">
            <VeeForm
                class="d-flex flex-column gap-2 mb-4 border p-3 rounded"
                @submit="infoSubmit"
            >
                <h3 class="fs-5 fw-medium">個人資訊</h3>
                <div>
                    <label
                        for="username"
                        class="form-label"
                        >暱稱</label
                    >
                    <!-- is-invalid -->
                    <input
                        :class="`form-control ${errors.username && 'is-invalid'}`"
                        v-bind="username"
                        type="text"
                        name="username"
                        id="username"
                    />
                    <small class="text-danger error-text">{{
                        errors.username && errors.username
                    }}</small>
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
            <div class="d-flex gap-4 align-items-center border p-2 rounded">
                <p class="fs-5">信箱:</p>
                <div>
                    {{ user.userData?.email }}
                </div>
                <button
                    @click="changeEmailHandler({ email: user.userData?.email })"
                    class="btn btn-dark ms-auto"
                    type="button"
                >
                    <div v-if="isSend === false">更改信箱</div>
                    <div v-else>
                        <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        Loading...
                    </div>
                </button>
            </div>
        </div>
        <div class="">
            <h2 class="my-4 fs-5 fw-medium">個人展覽虛擬票卷</h2>
            <h1>這裡需要展示以購買展覽, 並點擊後自動跳出QRcode 去證明票卷</h1>
            <p>測試性元件</p>
            <ExhibitionQR />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .error-text {
        font-size: 14px;
        height: 14px;
    }
</style>
