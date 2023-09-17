<script setup>
    import { ref, watch, onBeforeMount } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
    import { getUserTrackData, trackExhibition, deleteTrackExhibition } from '../../api/user'
    import { getOneExhibition } from '../../api/exhibition'
    import { useAlert } from '../../stores/alertSlice'

    const alertStore = useAlert()
    const user = userDataStore()
    const userRefs = storeToRefs(user)

    const keyWord = ref('')
    const exhIdArr = ref([])
    const data = ref([])
    const filterArr = ref([])

    const filterHandler = (e) => {
        filterArr.value = data.value.map((item) => item)
        filterArr.value = data.value.filter((item) => item.name.includes(e.target.value))
    }

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
            data.value.push({ id, ...res.data, isTrack: true })
        })
        filterArr.value = data.value
    }

    const unTrackExhibition = async (exhId) => {
        //view update
        const index = filterArr.value.findIndex((item) => item.id === exhId)
        filterArr.value[index].isTrack = !filterArr.value[index].isTrack

        //fireBase update
        if (filterArr.value[index].isTrack === true) {
            try {
                await trackExhibition(user.userData?.localId, exhId)
            } catch (error) {
                alertStore.callAlert({ title: '追蹤失敗', type: 'error' })
            }
        } else {
            try {
                await deleteTrackExhibition(user.userData?.localId, exhId)
            } catch (error) {
                alertStore.callAlert({ title: '取消追蹤失敗', type: 'error' })
            }
        }
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

<template>
    <h1 class="border-bottom mb-4 fs-4 pb-3 fw-medium">收藏展覽</h1>

    <div class="row">
        <div class="col-12">
            <div>
                <input
                    v-model="keyWord"
                    @input="filterHandler"
                    class="form-control mb-4"
                    type="search"
                    placeholder="請輸入展覽名稱"
                />
            </div>
            <ul class="row">
                <li
                    class="col-md-6 mb-4"
                    v-for="item in filterArr"
                    :key="item?.id"
                >
                    <div class="border border-dark d-flex justify-content-between">
                        <div class="d-flex">
                            <div class="image-box">
                                <img
                                    :src="item?.image"
                                    :alt="item?.name"
                                />
                            </div>
                            <div class="p-2 d-flex flex-column justify-content-center">
                                <h2 class="fw-bold text-hidden-1">
                                    <router-link
                                        class="text-dark"
                                        :to="`/viewExhibition/${item?.id}`"
                                        >{{ item?.name }}</router-link
                                    >
                                </h2>
                                <time class="text-hidden-1 font-pathway text-info">
                                    {{ new Date(item?.startDate).toLocaleDateString() }} ~
                                    {{ new Date(item?.endDate).toLocaleDateString() }}
                                </time>
                            </div>
                        </div>

                        <div class="border-start border-dark p-3">
                            <button
                                @click="unTrackExhibition(item?.id)"
                                class="border-0 bg-transparent"
                            >
                                <div v-if="item?.isTrack === true">
                                    <HeartIcon :size="36" />
                                </div>
                                <div v-else>
                                    <HeartOutlineIcon :size="36" />
                                </div>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div></div>
</template>

<style lang="scss" scoped>
    .image-box {
        width: 75px;
        height: 75px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .text-hidden-1 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
</style>
