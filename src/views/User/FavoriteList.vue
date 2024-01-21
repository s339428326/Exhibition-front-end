<script setup>
    import { ref, watch, onMounted } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
    import { getUserTrackData, trackExhibition, deleteTrackExhibition } from '../../api/user'
    import { getOneExhibition } from '../../api/exhibition'
    import { useAlert } from '../../stores/alertSlice'
    import { filter } from 'd3'

    const alertStore = useAlert()
    const user = userDataStore()
    const userRefs = storeToRefs(user)
    const isLoading = ref(false)

    const keyWord = ref('')
    const data = ref([])
    const filterArr = ref([])

    const filterHandler = (e) => {
        filterArr.value = data.value.map((item) => item)
        filterArr.value = data.value.filter((item) => item.name.includes(e.target.value))
    }

    const getTrackData = async () => {
        isLoading.value = true
        try {
            const res = await getUserTrackData()
            data.value = res?.data?.data
            filterArr.value = res?.data?.data
            isLoading.value = false
        } catch (error) {
            console.log(error)
            isLoading.value = false
        }
    }

    //取消追蹤展覽
    const unTrackExhibition = async (exhId) => {
        try {
            await deleteTrackExhibition(exhId)
            data.value = data.value.filter((it) => it?._id !== exhId)
            filterArr.value = filterArr.value.filter((it) => it?._id !== exhId)
            console.log(filterArr.value)
        } catch (error) {
            console.log(error)
        }
    }

    onMounted(async () => {
        await getTrackData()
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
                                <h2 class="fw-bold fs-5 text-hidden-1">
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
                            <!-- " -->
                            <button
                                class="border-0 bg-transparent"
                                @click="unTrackExhibition(item?.id)"
                            >
                                <div
                                    v-if="isLoading === true"
                                    class="spinner-border text-primary"
                                    role="status"
                                >
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div v-else>
                                    <HeartIcon :size="36" />
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
