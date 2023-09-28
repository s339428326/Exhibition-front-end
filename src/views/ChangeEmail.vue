<script setup>
    import { ref, onBeforeMount, watch } from 'vue'
    //[change]
    import { resetEmail, checkResetToken } from '../api/auth'
    import { useRoute, useRouter } from 'vue-router'
    import { useAlert } from '../stores/alertSlice'

    //alert store
    const { callAlert } = useAlert()

    const route = useRoute()
    const router = useRouter()
    const isLoading = ref(false)

    const changeEmailHandler = async (data) => {
        try {
            //[change]
            const res = await resetEmail(route.params?.token, data)
            if (typeof res === 'string') {
                router.push({ name: 'Home' })
                return callAlert({
                    title: '信件效期已過！, 請重新申請',
                    type: 'alert'
                })
            }
            callAlert({
                title: '信箱更新成功',
                type: 'check'
            })
            router.push({ name: 'Home' })
        } catch (error) {
            console.error(error)
            router.push({ name: 'Home' })
            callAlert({
                title: '請確認信件正確性！',
                type: 'error'
            })
        }
    }

    const checkRouteVialed = async () => {
        if (!route.params?.token) return router.push({ name: 'Home' })
        const res = await checkResetToken(route.params?.token)
        if (typeof res === 'string') {
            router.push({ name: 'Home' })
        }
    }

    watch(route, async () => {
        checkRouteVialed()
    })

    onBeforeMount(() => {
        checkRouteVialed()
    })
</script>
<template>
    <main class="container-sm">
        <div class="mt-5 border rounded-2 overflow-hidden">
            <div class="title bg-black p-3">
                <a
                    class="fs-4 font-quantum l-h-1"
                    to="/"
                >
                    <div class="d-flex">
                        <span class="fw-normal text-secondary fs-4">A</span>
                        <span class="fw-normal fs-4 text-light">rt</span>
                    </div>

                    <span class="fw-normal fs-4 text-light"> Search </span>
                    <p class="text-secondary">Fair</p>
                </a>
            </div>
            <h1 class="text-center fs-4 my-4 fw-medium">信件變更</h1>
            <VeeForm
                v-slot="{ meta, errors }"
                class="d-flex flex-column gap-2 mb-4 px-4"
                @submit="changeEmailHandler"
            >
                <div class="d-flex flex-column">
                    <div class="form-floating mb-3">
                        <VeeField
                            id="email"
                            name="email"
                            :class="`form-control ${errors['email'] && 'is-invalid'}`"
                            placeholder="xxx@xxx.xxx"
                            type="email"
                            rules="email|required"
                        />
                        <label for="email">信箱</label>
                        <small
                            v-if="errors['email']"
                            class="text-danger"
                            >{{ errors['email'].replace('email', '信箱') }}</small
                        >
                    </div>
                </div>
                <button
                    :meta="meta"
                    type="submit"
                    class="btn btn-dark py-2 px-4 fw-medium mt-2"
                >
                    <p v-if="isLoading === false">確認變更</p>
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
    </main>
</template>

<style lang="scss" scoped>
    .container-sm {
        max-width: 576px;
        margin-right: auto;
        margin: auto;
        padding-left: 12px;
        padding-right: 12px;
    }
</style>
