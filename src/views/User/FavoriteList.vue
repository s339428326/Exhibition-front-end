<template>
    <p>開發資訊 {{ exhIdArr }}</p>

    <h2 class="border-bottom mb-4 fs-4 pb-3 fw-medium">收藏展覽</h2>
    <div class="row">
        <div class="col-md-9">
            {{ data.map((item) => item)[0] }}
            <ul>
                <li
                    v-for="(item, index) in data"
                    :key="item?.id"
                >
                    <div>
                        <div>
                            <img
                                :src="item.image"
                                :alt="item.name"
                            />
                        </div>
                        <div></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div></div>
</template>

<script setup>
    import { ref, watch, onBeforeMount } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
    import { getUserTrackData } from '../../api/user'
    import { getOneExhibition } from '../../api/exhibition'

    const user = userDataStore()
    const userRefs = storeToRefs(user)

    const exhIdArr = ref([])
    const data = ref([])

    const getTrackData = async () => {
        try {
            const res = await getUserTrackData(user.userData?.localId)
            exhIdArr.value = Object.keys(res.data).filter((key) => res.data[key] === true)
        } catch (error) {
            console.log(error)
        }
    }

    const getExhibitionArr = async () => {
        data.value = []
        exhIdArr.value.forEach(async (id) => {
            const res = await getOneExhibition(id)
            data.value.push(res.data)
        })
    }

    onBeforeMount(async () => {
        await getTrackData()
        getExhibitionArr()
    })

    watch(userRefs.userData, () => {
        getTrackData()
        getExhibitionArr()
    })
</script>

<style lang="scss" scoped></style>
