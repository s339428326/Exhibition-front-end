<script setup>
    import { ref, watch, onMounted } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
    import { exhibitionStore } from '../../stores/exhibitionList'
    import { trackExhibition, getUserTrackData, deleteTrackExhibition } from '../../api/user'

    const emit = defineEmits(['changeView'])

    const user = userDataStore()
    const exhibition = exhibitionStore()

    const userRefs = storeToRefs(user)
    const exhibitionRefs = storeToRefs(exhibition)

    const list = ref([])
    const currentItem = ref(0)
    const trackList = ref([])
    const isLoading = ref(-1)

    const itemHandler = (val) => {
        currentItem.value = val
    }

    //新增 user track exh
    const trackExhHandler = async (exhId) => {
        if (!exhId) return console.error(`error exhId:${exhId}`)
        if (!user.userData?.id) return

        isLoading.value = exhId

        if (trackList.value.findIndex((track) => track?.id === exhId) !== -1) {
            const res = await deleteTrackExhibition(exhId)
            trackList.value = trackList.value.filter((item) => item?._id !== exhId)
            isLoading.value = -1
            console.log('del track api', res)
        } else {
            const res = await trackExhibition(exhId)
            console.log('[add track api]', res, exhId, [...trackList.value, exhId])
            trackList.value.push(list.value.find((it) => it?._id === exhId))
            isLoading.value = -1
        }
    }

    const getUserTrack = async () => {
        const res = await getUserTrackData()
        if (!res?.data) return
        trackList.value = res?.data?.data
    }

    onMounted(async () => {
        getUserTrack()
    })

    watch(currentItem, (newVal) => {
        emit('changeView', newVal)
    })

    watch(exhibitionRefs.exhibitionList, () => {
        list.value = exhibition.exhibitionList
            .sort((pre, next) => next.viewer - pre.viewer)
            .slice(0, 10)
    })

    watch(userRefs.userData, () => {
        console.log(user.userData)
        if (!user.userData?.id) {
            trackList.value = []
        }
        getUserTrack()
    })
</script>
<template>
    <ul class="row">
        <li
            v-for="(item, index) in list"
            :key="item.id"
            class="col-12 col-md-6 mb-4"
            @click="itemHandler(index)"
        >
            <div class="border border-dark rank-card overflow-hidden d-flex">
                <div class="bg-dark text-white p-2 font-pathway lh-1">
                    <p># {{ index + 1 }}</p>
                    <p class="fs-3 border-bottom">{{ new Date(item.startDate).getFullYear() }}</p>
                    <p>
                        {{ new Date(item.startDate).getMonth() }}.{{
                            new Date(item.startDate).getDate()
                        }}~{{ new Date(item.endDate).getMonth() }}.{{
                            new Date(item.endDate).getDate()
                        }}
                    </p>
                </div>
                <div class="flex-grow-1">
                    <div class="border-bottom p-2">
                        <router-link
                            class="rank-card__title text-black"
                            :to="`/viewExhibition/${item.id}`"
                        >
                            {{ item.name }}
                        </router-link>
                    </div>

                    <div class="fw-bold fs-7 p-2 d-flex align-items-center justify-content-between">
                        <div>
                            <p class="">點擊率 {{ item.viewer }}</p>
                        </div>
                        <div class="d-flex gap-2">
                            <button
                                class="border-0 bg-transparent"
                                :data-bs-toggle="`${!user.userData?.username && 'modal'}`"
                                :data-bs-target="`${!user.userData?.username && '#loginModal'}`"
                                @click="trackExhHandler(item?.id)"
                            >
                                <div
                                    v-if="isLoading === item?.id"
                                    class="spinner-border text-dark spinner-border-sm"
                                    role="status"
                                ></div>
                                <div
                                    v-else-if="
                                        trackList.findIndex((track) => track?.id === item?.id) ===
                                        -1
                                    "
                                >
                                    <HeartOutlineIcon :size="24" />
                                </div>
                                <div v-else>
                                    <HeartIcon :size="24" />
                                </div>
                            </button>

                            <CartIcon :size="24" />
                        </div>
                    </div>
                </div>

                <div
                    class="d-flex justify-content-center align-items-center ms-auto border-start font-pathway bg-dark hover-op"
                >
                    <router-link
                        class="text-white p-3"
                        :to="`/viewExhibition/${item.id}`"
                        >more</router-link
                    >
                </div>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
    //rank card
    .rank-card__imageBox {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    .rank-card__title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-weight: 800;
        transition: 0.25s;
        &:hover {
            opacity: 0.8;
        }
    }

    .hover-op:hover {
        opacity: 0.8;
    }
</style>
