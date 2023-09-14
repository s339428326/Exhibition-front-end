<script setup>
    import { ref, onBeforeMount, computed, watch } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
    import { uploadImgur } from '../../api/imgur'
    import { updateUserInfoData } from '../../api/user'

    import AvatarUpload from '../../components/user/AvatarUpload.vue'
    import UserNavList from '@/components/user/UserNavList.vue'

    //Step.1 Read user store Data
    //Step.2 init user Data to ref value
    //Step.3

    // const user = userDataStore()
    // const userRefs = storeToRefs(user)

    // const avatar = ref(null)
    // const avatarData = ref(null)

    const userInfo = ref({})

    //user name and email
    const infoSubmit = (data) => {
        console.log(data)
        userInfo.value = { ...userInfo.value, ...data }
    }

    // const uploadBtnDisable = computed(() => user.userData?.picture === avatar.value)

    // //user avatar
    // const avatarHandler = (e) => {
    //     const file = e.target.files[0]
    //     const formData = new FormData()
    //     const reader = new FileReader()
    //     formData.append('image', file)

    //     reader.addEventListener('load', () => {
    //         avatar.value = reader.result
    //         avatarData.value = formData
    //     })
    //     if (file) reader.readAsDataURL(file)
    // }

    // const uploadAvatar = async (data) => {
    //     try {
    //         const res = await uploadImgur(data)
    //         const uploadFireBase = await updateUserInfoData(user.userData?.localId, {
    //             picture: res.data.data.link
    //         })
    //         avatar.value = res.data.data.link
    //         user.userData.picture = res.data.data.link
    //         console.log('[upload imgur responses]', res.data.data.link)
    //         console.log('[upload fireBase user data]', uploadFireBase)
    //     } catch (error) {
    //         console.log('[upload img responses Error]', error)
    //     }
    // }

    // const init = () => {
    //     avatar.value = user.userData?.picture
    // }

    // watch(userRefs.userData, () => {
    //     avatar.value = user.userData?.picture
    // })

    // onBeforeMount(() => {
    //     init()
    // })
</script>

<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-12 col-md-3">
                <UserNavList />
            </div>
            <div class="col-12 col-md-9">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 p-3 border">
                                <h2 class="border-bottom mb-4 fs-4 pb-3">會員資料</h2>
                                <div class="col-md-4">
                                    <AvatarUpload />
                                    <!-- component -->
                                    <!-- <div class="border p-3 d-flex flex-column gap-4 rounded">
                                        <p>會員頭像</p>
                                        <div class="d-flex justify-content-center">
                                            <label
                                                class="avatar-label border"
                                                for="avatar"
                                            >
                                                <img
                                                    class="avatar-img"
                                                    :src="avatar || user.userData?.picture"
                                                    alt="avatar"
                                                    width="200"
                                                    height="200"
                                                />
                                                <div class="avatar-hover">點擊更改圖片</div>
                                            </label>
                                            <input
                                                class="d-none"
                                                @change="avatarHandler"
                                                type="file"
                                                name="avatar"
                                                id="avatar"
                                                accept="image/*"
                                            />
                                        </div>
                                        <button
                                            @click="uploadAvatar(avatarData)"
                                            class="btn btn-dark"
                                            :disabled="uploadBtnDisable"
                                        >
                                            上傳
                                        </button>
                                    </div> -->
                                </div>
                            </div>
                        </div>

                        <div class="">
                            <div>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                                eligendi odit impedit quam, voluptas nesciunt inventore repellendus
                                ipsam id ut officiis. Facere tempora doloremque, molestiae ratione
                                praesentium repellat voluptas deserunt?
                            </div>
                        </div>
                    </div>
                    <div>
                        <!-- <p>{{ uploadBtnDisable }}</p>
                        <p>{{ user.userData?.picture }}</p>
                        <p>userData {{ user.userData }}</p>
                        <p>userInfo {{ userInfo }}</p>
                        <p>avatar {{ avatar }}</p> -->
                    </div>
                    <!-- email -->
                    <!-- username -->
                    <!-- user Avatar -->
                    <!-- <VeeForm
                        v-slot="{ errors, meta }"
                        class="d-flex flex-column"
                        ref="loginRef"
                        @submit="infoSubmit"
                    >
                        <label
                            class="text-dark"
                            for="名稱"
                            >名稱</label
                        >
                        <VeeField
                            id="t1"
                            :class="`form-control ${errors['名稱'] ? 'border-danger' : 'border'}`"
                            placeholder="placeholder"
                            name="名稱"
                            type="text"
                            rules="min:8"
                        />
                        <ErrorMessage
                            v-if="errors['名稱']"
                            as="p"
                            class="text-danger errorMessage"
                            name="名稱"
                        />
                        <p
                            v-else
                            class="errorMessage"
                        ></p>
                        <button type="submit">修改</button>
                    </VeeForm> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
