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
                            <HeartOutlineIcon :size="24" />
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
    <!-- {{ list[currentItem] }} -->
</template>
<script setup>
    import { ref, watch } from 'vue'
    const props = defineProps({
        data: Array
    })

    const emit = defineEmits(['changeView'])

    const list = ref([])

    const currentItem = ref(0)

    const itemHandler = (val) => {
        currentItem.value = val
    }

    watch(currentItem, (newVal) => {
        emit('changeView', newVal)
    })

    watch(props, () => {
        list.value = [...props.data].sort((pre, next) => next.viewer - pre.viewer).slice(0, 10)
    })
</script>
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
