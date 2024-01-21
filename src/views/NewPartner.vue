<script setup>
    import { ref } from 'vue'
    import { newPartner } from '../api/partner'
    import { useAlert } from '../stores/alertSlice'
    import { useRouter } from 'vue-router'
    const partnerRef = ref()
    const sendBtnLoad = ref(false)
    const router = useRouter()

    const { callAlert } = useAlert()

    //[Form]    // await newPartner(postData)
    const partnerHandler = async (data) => {
        const { name, address, email, comment } = data
        const postData = {
            company: {
                name,
                address,
                email
            },
            comment
        }
        sendBtnLoad.value = true

        const res = await newPartner(postData)
        if (!res) return callAlert({ title: '表單傳送錯誤, 請通知我們', type: 'alert' })
        sendBtnLoad.value = false
        partnerRef.value.resetForm()
        callAlert({ title: '感謝加入!, 我們會盡快聯繫您', type: 'check' })
        router.push({ name: 'Home' })
    }
</script>
<template lang="">
    <div class="">
        <h1 class="d-flex my-5">
            <div class="bg-primary fs-1 text-light font-quantum l-h-1 p-2 mx-auto">
                <div>
                    <span class="fw-normal text-secondary">A</span>
                    <span class="fw-normal">rt</span>
                </div>
                <span class="fw-normal"> Search </span>
                <p class="text-secondary">Fair</p>
            </div>
        </h1>
        <VeeForm
            class="d-flex flex-column"
            v-slot="{ meta, errors }"
            id="userForm"
            ref="partnerRef"
            @submit="partnerHandler"
        >
            <div class="w-50 mx-auto">
                <div class="form-floating mb-3">
                    <VeeField
                        id="name"
                        name="name"
                        :class="`form-control ${errors['name'] && 'is-invalid'}`"
                        placeholder="***"
                        type="text"
                        rules="max:12|required"
                    />
                    <label for="name">合作廠商名稱</label>
                    <small
                        v-if="errors['name']"
                        class="text-danger"
                        >{{ errors['name'].replace('name', '合作廠商名稱') }}</small
                    >
                </div>
            </div>
            <div class="w-50 mx-auto">
                <div class="form-floating mb-3">
                    <VeeField
                        id="address"
                        name="address"
                        :class="`form-control ${errors['address'] && 'is-invalid'}`"
                        placeholder="***"
                        type="text"
                        rules="max:50|required"
                    />
                    <label for="address">公司地址</label>
                    <small
                        v-if="errors['address']"
                        class="text-danger"
                        >{{ errors['address'].replace('address', '公司地址') }}</small
                    >
                </div>
                <!-- 聯繫人資訊 -->
                <!-- 公司簡介 -->
            </div>
            <div class="w-50 mx-auto">
                <div class="form-floating mb-3">
                    <VeeField
                        id="email"
                        name="email"
                        :class="`form-control ${errors['email'] && 'is-invalid'}`"
                        placeholder="***"
                        type="email"
                        rules="email|required"
                    />
                    <label for="email">聯絡信箱</label>
                    <small
                        v-if="errors['email']"
                        class="text-danger"
                        >{{ errors['email'].replace('email', '合作廠商名稱') }}</small
                    >
                </div>
                <!-- 展覽附件 -->
                <VeeField
                    v-slot="{ field }"
                    name="comment"
                    rules="required"
                >
                    <div class="form-floating mb-4">
                        <textarea
                            v-bind="field"
                            id="comment"
                            class="form-control"
                            placeholder="Leave a comment here"
                            type="text"
                            style="height: 100px; resize: none"
                        ></textarea>
                        <label for="floatingTextarea2">合作意向</label>
                        <small
                            v-if="errors['comment']"
                            class="text-danger"
                            >{{ errors['comment'].replace('comment', '合作意向') }}</small
                        >
                    </div>
                </VeeField>
            </div>

            <button
                :class="`btn btn-dark w-50 mx-auto ${sendBtnLoad && 'disabled'}`"
                :disable="sendBtnLoad"
                type="submit"
            >
                <span
                    v-if="sendBtnLoad === true"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                ></span>

                確認送出
            </button>
        </VeeForm>
    </div>
</template>
<style lang="scss" scoped></style>
