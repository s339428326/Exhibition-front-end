<script setup>
    import { ref, onMounted } from 'vue'
    // import gsap from 'gsap'

    const props = defineProps({
        data: Array
    })

    const emit = defineEmits(['currentItem'])

    const currentItem = ref({})

    const menuInit = () => {
        currentItem.value = props.data?.[0]
        emit('currentItem', currentItem.value)
    }

    // const tl = gsap.timeline({ delay: 1, paused: true })

    onMounted(() => {
        menuInit()
        //
        // Array.from(Array(5).keys()).forEach((item) => {
        //     tl.from(`.item-${item + 1}`, {
        //         x: `-200`,
        //         autoAlpha: 0,
        //         duration: 1
        //     })
        // })
        // tl.play()
    })
</script>

<template>
    <ul class="menu mt-5 pt-5 pb-5 mb-5">
        <li
            :style="{ '--i': data.length - index }"
            :class="`item-${index + 1}`"
            v-for="(item, index) in data"
            :key="item.id"
        >
            <router-link
                class="text-dark"
                :to="`/viewExhibition/${item.id}`"
            >
                <div class="front d-flex align-items-center font-pathway">
                    <div class="lh-sm bg-black text-white p-3">
                        <p class="fw-bold fs-3 border-bottom">
                            {{ new Date(item.startDate).getFullYear() }}
                        </p>
                        <span class="fs-7">
                            {{ new Date(item.startDate).getMonth() }}.{{
                                new Date(item.startDate).getDate()
                            }}~{{ new Date(item.endDate).getMonth() }}.{{
                                new Date(item.endDate).getDate()
                            }}
                        </span>
                    </div>
                    <div class="p-2">
                        <p class="fw-bold exhibition-title">{{ item.name }}</p>

                        <p>點擊人次：{{ item.viewer }}</p>
                    </div>
                </div>
                <div class="top d-flex align-items-center">
                    <p class="fs-4 fw-bold">{{ item.type }}</p>
                </div>
                <div
                    class="right d-flex justify-content-center align-items-center font-quantum fs-1"
                >
                    {{ index + 1 }}
                </div>
            </router-link>
        </li>
    </ul>
</template>
<style lang="scss" scoped>
    .exhibition-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .w-86 {
        width: 86px;
    }

    .menu {
        width: 60%;
        transform: skewY(10deg);
    }

    //right side
    .right {
        display: flex;
        width: 58px;
        height: calc(100% + 1px);
        background-color: white;
        border: 1px solid black;
        position: absolute;
        top: 0;
        right: -58px;
        transform-origin: left;
        transform: skewY(-45deg);
    }

    //top
    .top {
        background-color: white;
        border: 1px solid black;
        display: block;
        padding: 1rem;
        width: calc(100% + 2px);
        height: 58px;
        position: absolute;
        top: -58px;
        left: -2px;
        transform-origin: bottom;
        transform: skewX(-45deg);
    }

    //front
    .menu li:nth-child(n) {
        position: relative;
        background-color: white;
        border: 1px solid black;
        transition: 0.5s;
        z-index: var(--i);
    }

    .menu li:hover {
        background-color: orange;
        transform: translateX(-30%);
    }

    .w-fit-content {
        width: fit-content;
    }
</style>
