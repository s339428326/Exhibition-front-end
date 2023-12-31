<script setup>
    import { ref, onBeforeMount, computed, watch } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
    import { updateUserInfoData } from '../../api/user'
    import { uploadImgur } from '../../api/imgur'
    import { useAlert } from '../../stores/alertSlice'

    const isUpload = ref(false)

    const alertStore = useAlert()

    const user = userDataStore()
    const userRefs = storeToRefs(user)

    const avatar = ref(null)
    const avatarData = ref(null)

    const uploadBtnDisable = computed(() => user.userData?.picture === avatar.value)

    //user avatar
    const avatarHandler = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        const reader = new FileReader()
        formData.append('image', file)

        reader.addEventListener('load', () => {
            avatar.value = reader.result
            avatarData.value = formData
        })
        if (file) reader.readAsDataURL(file)
    }

    const uploadAvatar = async (data) => {
        try {
            //loading start
            isUpload.value = true
            //response imgur server
            const res = await uploadImgur(data)
            //get link to avatar ref
            avatar.value = res.data.data.link
            // update user pinia avatar
            user.userData.avatar.imageUrl = res.data.data.link
            // [Dev]
            console.log('[upload imgur responses]', res.data.data.link)
            //hotfix
            const updateData = { avatar: { imageUrl: avatar.value, deleteHash: '' } }
            const updateAvatar = await updateUserInfoData(user.userData.id, updateData)
            if (updateAvatar) {
                alertStore.callAlert({ title: '圖片上傳成功', type: 'check' })
            }
            isUpload.value = false
            return res.data.data.link
        } catch (error) {
            console.log('[upload img responses Error]', error)
            isUpload.value = false
            alertStore.callAlert({ title: '圖片上傳失敗', type: 'error' })
            return error
        }
    }

    const init = () => {
        avatar.value = user.userData?.picture
    }

    watch(userRefs.userData, () => {
        avatar.value = user.userData?.picture
    })

    onBeforeMount(() => {
        init()
    })
</script>
<template>
    <div class="border rounded p-3">
        <div class="mb-4">
            <label
                class="d-flex justify-content-center"
                for="avatar"
            >
                <div class="avatar-label">
                    <img
                        class="avatar-img"
                        :src="avatar || user.userData?.avatar?.imageUrl"
                        alt="avatar"
                    />
                    <div class="avatar-hover">點擊更改圖片</div>
                </div>
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
            class="btn btn-dark w-100"
            :disabled="uploadBtnDisable || isUpload"
        >
            <p v-if="isUpload === false">上傳</p>
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
</template>
<style lang="scss" scoped>
    .avatar-label {
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        .avatar-hover {
            transition: 0.25s;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            color: transparent;
            background-color: transparent;
        }

        .avatar-hover:hover {
            color: white;
            background-color: rgba(0, 0, 0, 0.247);
        }
    }

    .avatar-img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 50%;
    }
</style>
