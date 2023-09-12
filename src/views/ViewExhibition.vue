<template>
    <main class="view-exhibition">
        <!-- <h1>{{ route.params?.id }}</h1>
        {{ data?.tickGroup }} -->
        <section class="cover-banner mb-4">
            <img
                :class="`${!data?.image && 'blinking'}`"
                :src="data?.image"
                alt="exh-banner-cover"
            />
        </section>

        <section class="p-2 container mx-auto row flex-column flex-md-row mb-4">
            <div class="col col-md-8">
                <!-- 展覽Title-->
                <div class="border-bottom pb-2 mb-4 d-flex flex-wrap justify-content-between">
                    <div class="d-flex flex-column font-pathway">
                        <!-- 展覽名稱 -->
                        <h1 class="fs-2 fw-bold">{{ data?.name }}</h1>
                        <!-- 展覽時間 -->
                        <time
                            class="fs-4 fw-bold"
                            datetime="#"
                        >
                            <span>{{ new Date(data?.startDate).toLocaleDateString() }}</span>
                            <span>~</span>
                            <span>{{ new Date(data?.endDate).toLocaleDateString() }}</span>
                        </time>
                    </div>
                    <div>
                        <!-- <LikeButton
                            :className="`btn d-flex p-2 gap-2 ${
                                isHeartClick ? 'btn-primary' : 'btn-outline-primary'
                            }`"
                            :data="data"
                            :isLike="isHeartClick"
                            :handler="handleLike"
                        >
                            <template #content>
                                <p>搜藏</p>
                            </template>
                        </LikeButton> -->
                    </div>
                </div>
                <p class="mb-4">
                    {{ data?.introduce }}
                </p>
            </div>
            <div class="col col-md-4">
                <div>
                    <h2 class="text-center mb-2 border rounded-2 p-2">售票價格</h2>
                    <div class="border rounded-3 p-2 fs-5 shadow-sm mb-2">
                        <ul>
                            <!-- fix: index => firebase id -->
                            <li
                                v-for="(ticket, index) in data?.tickGroup"
                                :key="index"
                            >
                                <div class="ticket-choose">
                                    <input
                                        class="d-none"
                                        type="radio"
                                        name="售票選擇"
                                        :id="ticket?.ticketType"
                                        :value="ticket?.ticketType"
                                        :data-tickgroupindex="index"
                                        :checked="index === 0 ? true : false"
                                        @click="
                                            changeTickData({
                                                ticketType: ticket?.ticketType,
                                                price: ticket?.price
                                            })
                                        "
                                    />
                                    <label
                                        class="text-center w-100"
                                        :for="ticket?.ticketType"
                                    >
                                        <p>{{ ticket?.ticketType }} {{ ticket?.price }}</p>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <button
                        @click="addCartItemHandler"
                        class="btn btn-primary w-100 mb-2 addCartBtn"
                        type="button"
                        :data-name="data?.name"
                        :disabled="cartBtnDisable"
                    >
                        {{ cartBtnName }}
                    </button>
                    <!-- <RouterLink
                        class="btn btn-primary w-100 mb-2"
                        to="/payment"
                        >前往結賬</RouterLink
                    > -->
                    <!-- fix: change to item id -->
                </div>
            </div>
        </section>
    </main>
</template>
<script setup>
    import { ref, computed, onMounted } from 'vue'
    //vue-router
    import { useRoute, useRouter } from 'vue-router'
    //pinia
    import { useCartDataStore } from '../stores/cartData'
    import { exhibitionStore } from '../stores/exhibitionList'
    import { getOneExhibition } from '../api/exhibition'

    //components
    // import LikeButton from '../components/LikeButton.vue'

    const route = useRoute()
    const router = useRouter()

    const cart = useCartDataStore()
    const exhibition = exhibitionStore()

    const data = ref()
    const ticketCurrentData = ref({ ...data.value?.tickGroup?.[0] })
    const isHeartClick = ref(false)

    const cartBtnDisable = computed(() => {
        console.log('[cart Data]', cart.cartData)
        //判斷該項目是否已在cart中
        const exhibitionExistsInCart = cart.cartData.find(
            (item) =>
                item.name === data.value?.name &&
                item?.ticketType?.ticketType === ticketCurrentData.value.ticketType
        )
        return exhibitionExistsInCart ? true : false
    })

    const cartBtnName = computed(() => {
        if (cartBtnDisable.value) {
            return '已加入購物車'
        }
        return '加入購物車'
    })

    //[Fix]get One Data, FireBase Change to Express
    const dataInit = async () => {
        const res = await getOneExhibition(route.params?.id)
        console.log(res)
        if (!res.data) {
            router.push('/notFound')
            return
        }
        data.value = res.data
        ticketCurrentData.value = res.data.tickGroup[0]
    }

    //更換目前得選擇票種
    const changeTickData = (data) => {
        ticketCurrentData.value = data
    }

    //新增購物車項目
    const addCartItemHandler = () => {
        //push to localStorage cart data item
        const item = {
            name: data.value.name,
            startDate: data.value.startDate,
            endDate: data.value.endDate,
            image: data.value.image,
            ticketType: ticketCurrentData.value,
            price: ticketCurrentData.value?.price,
            quantity: 1
        }
        console.log('[buy]', item)
        //push to cart store cartData
        cart.addCartItem(item)
    }

    onMounted(async () => {
        dataInit()
    })
</script>
<style lang="scss">
    //image init
    .view-exhibition {
        img {
            width: 100vw;
            object-fit: cover;
            vertical-align: middle;
            object-position: top;
        }
    }

    .cover-banner {
        img {
            height: 495px;
        }
    }

    .ticket-choose {
        input:checked ~ label {
            background-color: black;
            border-radius: 0.25rem;
            color: black;
            transition: all 0.25s ease-in;
            p {
                color: white;
            }
        }
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0.5;
        }

        100% {
            opacity: 1;
        }
    }

    .blinking {
        animation: blink 1.75s infinite;
    }
</style>
