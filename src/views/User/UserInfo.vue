<script setup>
    import { ref, onBeforeMount, computed, watch } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
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
                                </div>
                                <div class="col-md-8">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                    Expedita, harum! Voluptate saepe nisi assumenda repellendus
                                    eligendi inventore rem reiciendis maxime aliquid. Adipisci
                                    dolor, dolorem reprehenderit dolores assumenda aspernatur
                                    laudantium dicta?
                                </div>
                            </div>
                        </div>
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
