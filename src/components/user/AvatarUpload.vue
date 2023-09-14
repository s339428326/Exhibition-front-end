<script setup>
    import { ref, onBeforeMount, computed, watch } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
    import { updateUserInfoData } from '../../api/user'
    import { uploadImgur } from '../../api/imgur'

    const isUpload = ref(false)

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
            isUpload.value = true
            const res = await uploadImgur(data)
            const uploadFireBase = await updateUserInfoData(user.userData?.localId, {
                picture: res.data.data.link
            })
            avatar.value = res.data.data.link
            user.userData.picture = res.data.data.link
            console.log('[upload imgur responses]', res.data.data.link)
            console.log('[upload fireBase user data]', uploadFireBase)
            if (uploadFireBase) window.alert(`圖片上傳成功`)
            isUpload.value = false
            return res.data.data.link
        } catch (error) {
            console.log('[upload img responses Error]', error)
            isUpload.value = false
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
    <div class="border p-3 d-flex flex-column gap-4 rounded">
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
        width: 200px;
        height: 200px;
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
