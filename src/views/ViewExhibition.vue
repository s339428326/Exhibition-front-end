<template>
    <main class="view-exhibition">
        <section class="cover-banner mb-4">
            <img
                :src="coverImage"
                alt="exh-banner-cover"
            />
        </section>

        <section class="p-2 container mx-auto row flex-column flex-md-row mb-4">
            <div class="col col-md-8">
                <!-- 展覽Title-->
                <div class="border-bottom pb-2 mb-4 d-flex flex-wrap justify-content-between">
                    <div class="d-flex flex-column">
                        <h1>{{ name }}</h1>
                        <time
                            class="fs-4 fw-bold"
                            datetime="#"
                            >{{ date }}
                        </time>
                    </div>
                    <div>
                        <button
                            v-if="isHeartClick"
                            class="btn btn-primary d-flex gap-2"
                            @click="HeartHandler"
                        >
                            <HeartIcon />
                            收藏
                        </button>
                        <button
                            v-else
                            class="btn btn-outline-primary d-flex gap-2"
                            @click="HeartHandler"
                        >
                            <HeartOutlineIcon />
                            收藏
                        </button>
                    </div>
                </div>
                <p class="mb-4">
                    {{ introduce }}
                </p>
            </div>
            <div class="col col-md-4">
                <div>
                    <h2 class="text-center mb-2 border rounded-2 p-2">售票價格</h2>
                    <div class="border rounded-3 p-2 fs-5 shadow-sm mb-2">
                        <ul>
                            <!-- fix: index => firebase id -->
                            <li
                                v-for="(ticket, index) in tickGroup"
                                :key="index"
                            >
                                <div class="ticket-choose">
                                    <input
                                        class="d-none"
                                        type="radio"
                                        name="售票選擇"
                                        :id="ticket.tickType"
                                        :value="ticket.tickType"
                                        :data-tickgroupindex="index"
                                        :checked="index === 0 ? true : false"
                                        @click="changeTickDate"
                                    />
                                    <label
                                        class="text-center w-100"
                                        :for="ticket.tickType"
                                    >
                                        <p>{{ ticket.tickType }} {{ ticket.price }}</p>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 綁定dataset  -->
                    <!-- name:item, price:100 -->
                    <button
                        @click="addCartItemHandler"
                        class="btn btn-primary w-100 mb-2 addCartBtn"
                        type="button"
                        :data-name="name"
                        data-price="100"
                        :disabled="cartBtnDisable"
                    >
                        {{ cartBtnName }}
                    </button>
                    <RouterLink
                        class="btn btn-primary w-100 mb-2"
                        to="/payment"
                        >前往結賬</RouterLink
                    >
                </div>
            </div>
        </section>
    </main>
</template>
<script>
    import { RouterLink } from 'vue-router'
    import { useCartDataStore } from '../stores/cartData'
    //1.取得axios 資料後渲染畫面
    export default {
        data() {
            return {
                //pinia  狀態管理
                cartDataInstance: useCartDataStore(),
                isHeartClick: false,
                //view
                name: '', //展覽名稱
                coverImage: '', //展覽圖片
                date: '2023/12/31 ~ 2024/01/01', //展覽日期
                introduce: '', //展覽介紹
                tickGroup: [
                    { tickType: '單展票', price: 80 },
                    { tickType: '套票', price: 150 }
                ], //套票資訊
                tickType: {}, //目前選擇套票
                price: '0' //目前選擇套票價格
            }
        },
        computed: {
            //加入購物車按鈕字樣控制
            cartBtnName() {
                if (this.cartBtnDisable) {
                    return '已加入購物車'
                }
                return '加入購物車'
            },
            //加入購物車按鈕disable控制
            cartBtnDisable() {
                //需要新增日期不符合時 禁用
                const item = this.cartDataInstance.cartData.find(
                    (item) =>
                        item.name === this.name && item.tickType.tickType === this.tickType.tickType
                )
                return item ? true : false
            }
        },
        // axios get page data
        async created() {
            //fake get view data
            this.name = '高雄駁二展覽｜人生紀念品'
            this.introduce =
                '人生中有許多珍貴的回憶，這些回憶可能透過一些際遇留存下來。在斷捨離的潮流趨勢下，我們開始思考自己真正需要保留的東西是什麼。對於許多人來說，重要的紀念品不一定是價值昂貴的物品，而是那些充滿情感和回憶的物品。可能是在某個重要的日子收到的花，讓你想起了某些時刻；可能是和寵物陪伴，在人生裡的一段時光；可能是在樹下一起望著天空的那天下午；可能是在獲得獎項被肯定的時刻，也可能是依舊想念的家鄉味道，這些物品不僅讓你回憶起過去的美好時光，也能夠讓你更感受到那些經歷真實性和重要。重要的是，留下這些紀念品並不是要填滿你的家，而是讓你在未來的某一天拿起它們時，能夠感受到那份特別的情感和回憶。你人生中最重要的紀念品是什麼？「人生紀念品」展覽邀請各領域設計師重新詮釋自身或受訪者的人生故事，透過設計手法將故事濃縮淬煉成一件件紀念品，引領觀者從設計作品中品味各種人生故事的酸甜滋味，展覽也邀請知名設計師及文字工作者分享影響他們人生的重要紀念品，期待民眾從第三者角度閱讀他人故事的同時，也回想起一些人生值得紀念的片段，讓記憶中的故事因為展覽有新一層的體會及滋味。'
            this.coverImage = 'https://pier2.org/upload/others/files/NVT6218.jpg'
            this.price = 100
            this.tickGroup = [
                { tickType: '單展票', price: 80 },
                { tickType: '套票', price: 150 }
            ]
            //初始值給予 票種第一項
            this.tickType = { tickType: '單展票', price: 80 }
            //
        },
        components: {
            RouterLink
        },
        methods: {
            addCartItemHandler(e) {
                console.log('test', this.price, this.tickGroup, this.name)
                const item = {
                    name: e.target.dataset.name,
                    date: this.date,
                    coverImage: this.coverImage,
                    tickType: this.tickType,
                    price: this.tickType.price,
                    quantity: 1
                }
                console.log('[addCartItemHandler]', item)
                this.cartDataInstance.addCartItem(item)
            },
            changeTickDate(e) {
                const tickGroupIndex = e.target.dataset.tickgroupindex
                this.tickType = this.tickGroup[tickGroupIndex]
                // this.cartBtnDisable = true
                // console.log(this.cartBtnDisable)
            },
            HeartHandler() {
                this.isHeartClick = !this.isHeartClick
            }
        }
    }
</script>
<style lang="scss">
    //image init
    .view-exhibition {
        img {
            width: 100%;
            object-fit: cover;
            vertical-align: middle;
        }
    }

    .cover-banner {
        img {
            max-height: 495px;
        }
    }

    .ticket-choose {
        input:checked ~ label {
            background-color: white;
            border-radius: 0.25rem;
            color: black;
            transition: all 0.25s ease-in;
        }
    }
</style>
