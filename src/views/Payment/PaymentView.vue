<template>
    <div class="container mb-5">
        <!-- Step Bar -->
        <section class="my-5">
            <ul class="d-flex justify-content-between p-4 border rounded-4 bg-gray shadow-sm">
                <li class="border-black p-2 after-line">
                    <p
                        class="border border-black p-2 fw-bold box d-flex align-items-center justify-content-center mx-auto mb-2"
                    >
                        1
                    </p>
                    <p class="text-center">建立訂單</p>
                </li>
                <li class="flex-grow-1 border-bottom border-2 h-0 mt-4"></li>
                <li class="border-black p-2">
                    <p
                        class="border border-black p-2 fw-bold box d-flex align-items-center justify-content-center mx-auto mb-2"
                    >
                        2
                    </p>
                    <p class="text-center">填寫訂購資料</p>
                </li>
                <li class="flex-grow-1 border-bottom border-2 h-0 mt-4"></li>
                <li class="border-black p-2">
                    <p
                        class="border border-black p-2 fw-bold box d-flex align-items-center justify-content-center mx-auto mb-2"
                    >
                        3
                    </p>
                    <p class="text-center">填寫付款資料</p>
                </li>
                <li class="flex-grow-1 border-bottom border-2 h-0 mt-4"></li>
                <li class="border-black p-2">
                    <p
                        class="border border-black p-2 fw-bold box d-flex align-items-center justify-content-center mx-auto mb-2"
                    >
                        4
                    </p>
                    <p class="text-center">完成訂購</p>
                </li>
            </ul>
        </section>
        <div class="row">
            <!-- left side -->
            <!-- Step 1 -->
            <section
                :class="`col-auto col-md-8 mb-4 mb-md-0  flex-grow-1 ${
                    page === 1 ? 'd-block' : 'd-none'
                }`"
            >
                <div class="border rounded-4 shadow-sm p-4 h-100 d-flex flex-column">
                    <h2 class="mb-4 fs-4">建立訂單</h2>
                    <ul class="d-flex flex-column gap-4">
                        <li
                            v-for="(item, index) in cartDataInstance.cartData"
                            :key="index"
                        >
                            <div class="d-flex gap-4">
                                <!-- img -->
                                <div>
                                    <img
                                        class="img-box"
                                        :src="item?.image"
                                        :alt="item?.name"
                                    />
                                </div>
                                <!-- content -->
                                <div class="d-flex flex-column">
                                    <p class="fw-medium">{{ item?.name }}</p>
                                    <small>{{ item?.date }}</small>
                                    <small>{{ item?.ticketType.ticketType }}</small>
                                    <div class="d-flex gap-3 align-items-center">
                                        <!--  -->
                                        <button
                                            @click="quantityHandler"
                                            :data-index="index"
                                            :data-cal="'del'"
                                            type="button"
                                            class="btn border-0 btn-dark"
                                        >
                                            -
                                        </button>
                                        <p>{{ item?.quantity }}</p>
                                        <!--  -->
                                        <button
                                            @click="quantityHandler"
                                            :data-index="index"
                                            :data-cal="'add'"
                                            type="button"
                                            class="btn border-0 btn-dark"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p class="fs-6 fw-bold">
                                        NT$ {{ item?.price * item?.quantity }}
                                    </p>
                                </div>
                                <!-- delButton -->
                                <div></div>
                            </div>
                        </li>
                    </ul>
                    <div class="flex-grow-1 d-flex">
                        <button
                            @click="pageHandler('add')"
                            class="btn btn-dark w-100 border mt-auto"
                            type="button"
                        >
                            下一步
                        </button>
                    </div>
                </div>
            </section>
            <!-- Step 2 -->
            <div
                :class="`col-auto col-md-8 mb-4 mb-md-0  flex-grow-1 ${
                    page === 2 ? 'd-block' : 'd-none'
                }`"
            >
                <div class="border p-3 rounded-4 shadow-sm">
                    <b-form
                        class="row"
                        @submit="pageHandler('add')"
                    >
                        <h2 class="fs-4 mb-3 fw-medium">訂購資料</h2>
                        <!-- 收件人 -->
                        <b-form-group
                            id="name"
                            class="col-auto col-6 mb-2"
                            label="收件人"
                            label-for="name"
                        >
                            <b-form-input
                                id="username"
                                v-model="form.name"
                                type="name"
                                placeholder="請輸入收件人"
                                required
                            ></b-form-input>
                            <b-form-invalid-feedback :state="validationName">
                                請輸入收件人
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="validationName">
                                Looks Good.
                            </b-form-valid-feedback>
                        </b-form-group>
                        <!-- 電話 -->
                        <b-form-group
                            class="col-auto col-6"
                            id="tel"
                            label="電話"
                            label-for="tel"
                        >
                            <b-form-input
                                id="tel"
                                v-model="form.tel"
                                type="tel"
                                placeholder="請輸入電話"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <!-- 地址-->
                        <b-form-group
                            class="col-12 mb-2"
                            id="address"
                            label="地址"
                            label-for="address"
                        >
                            <b-form-input
                                id="address"
                                v-model="form.address"
                                type="text"
                                placeholder="請輸入地址"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <!-- 信箱 -->
                        <b-form-group
                            class="col-12"
                            id="email"
                            label="信箱"
                            label-for="email"
                        >
                            <b-form-input
                                id="email"
                                v-model="form.email"
                                type="email"
                                placeholder="請輸入信箱"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <div class="mt-4 d-flex gap-4">
                            <button
                                @click="pageHandler('del')"
                                class="btn btn-dark w-100"
                                type="button"
                            >
                                上一步
                            </button>
                            <button
                                class="btn btn-dark w-100"
                                type="submit"
                            >
                                下一步
                            </button>
                        </div>
                    </b-form>
                </div>
            </div>
            <!-- Step 3 -->
            <div
                :class="`col-auto col-md-8 mb-4 mb-md-0  flex-grow-1  ${
                    page === 3 ? 'd-block' : 'd-none'
                }`"
            >
                <div class="border p-3 rounded-4 shadow-sm">
                    <b-form
                        class="row"
                        @submit="pageHandler('add')"
                    >
                        <h2 class="fs-4 mb-3 fw-medium">付款資料</h2>
                        <!-- 持卡人姓名 -->
                        <b-form-group
                            id="cardName"
                            class="col-12 mb-2"
                            label="持卡人姓名"
                            label-for="cardName"
                        >
                            <b-form-input
                                id="card"
                                v-model="form.cardName"
                                type="card"
                                placeholder="請輸入持卡人姓名"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <!-- 信用卡  -->
                        <b-form-group
                            id="cardNumber"
                            class="col-12 mb-2"
                            label="信用卡"
                            label-for="cardNumber"
                        >
                            <b-form-input
                                id="cardNumber"
                                v-model="form.cardNumber"
                                type="text"
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <!-- 有效期限 -->
                        <b-form-group
                            id="cardDate"
                            class="col-auto col-md-6"
                            label="有效期限"
                            label-for="cardDate"
                        >
                            <b-form-input
                                id="cardDate"
                                v-model="form.cardDate"
                                type="text"
                                placeholder="MM/YY"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <!-- CVC  -->
                        <b-form-group
                            id="cvc"
                            class="col-auto col-md-2"
                            label="CVC"
                            label-for="cvc"
                        >
                            <b-form-input
                                id="cvc"
                                v-model="form.cvc"
                                type="cvc"
                                placeholder="xxx"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <div class="mt-4 d-flex gap-4">
                            <button
                                @click="pageHandler('del')"
                                class="btn btn-dark w-100"
                                type="button"
                            >
                                上一步
                            </button>
                            <button
                                class="btn btn-dark w-100"
                                type="submit"
                            >
                                下一步
                            </button>
                        </div>
                    </b-form>
                </div>
            </div>
            <!-- Step 4 -->
            <div
                :class="`col-auto col-md-8 flex-grow-1 order-1 order-md-0 ${
                    page === 4 ? 'd-block' : 'd-none'
                }`"
            >
                <div class="border p-4 rounded-4">
                    <h2 class="fs-4 fw-medium mb-3">完成訂單</h2>

                    <h3 class="pb-2 mb-4 border-bottom">購買明細</h3>
                    <ul class="d-flex flex-column gap-4 mb-4">
                        <li
                            v-for="(item, index) in cartDataInstance.cartData"
                            :key="index"
                        >
                            <div class="d-flex gap-4 align-items-center">
                                <!-- img -->
                                <div>
                                    <img
                                        class="img-box-2"
                                        :src="item?.image"
                                        :alt="item?.name"
                                    />
                                </div>
                                <!-- content -->
                                <div class="d-flex flex-column">
                                    <p class="fw-medium">{{ item?.name }}</p>
                                    <small>{{ item?.date }}</small>
                                    <small>{{ item?.ticketType.ticketType }}</small>
                                </div>
                                <p>數量：{{ item?.quantity }}</p>
                                <p class="fs-6 fw-bold ms-auto">
                                    NT$ {{ item?.price * item?.quantity }}
                                </p>
                                <!-- delButton -->
                                <div></div>
                            </div>
                        </li>
                    </ul>
                    <h3 class="pb-2 mb-3 border-bottom">訂購資訊</h3>
                    <ul class="d-flex flex-column gap-1">
                        <li>收件者： {{ form.name }}</li>
                        <li>信箱： {{ form.email }}</li>
                        <li>電話： {{ form.tel }}</li>
                        <li>地址： {{ form.address }}</li>
                        <li>
                            信用卡：{{
                                form.cardNumber
                                    .split('')
                                    .map((item, index) => (index < 4 ? item : '*'))
                                    .join('')
                            }}
                        </li>
                    </ul>
                    <div class="mt-4 d-flex gap-4">
                        <button
                            @click="pageHandler('del')"
                            class="btn btn-dark w-100"
                            type="button"
                        >
                            上一步
                        </button>
                        <!-- change url -->
                        <button
                            type="button"
                            class="btn btn-dark w-100"
                        >
                            完成訂單
                        </button>
                    </div>
                </div>
            </div>
            <!-- right side -->
            <section class="col-4 flex-grow-1">
                <div
                    class="border rounded-4 shadow-sm p-4 d-flex flex-column justify-content-between"
                >
                    <h2 class="fs-4 mb-3">訂單摘要</h2>
                    <ul class="d-flex flex-column gap-2 mb-4">
                        <li class="d-flex justify-content-between fs-6">
                            <p>小計</p>
                            <p>$ {{ total }} NTD</p>
                        </li>
                        <li class="d-flex justify-content-between fs-6">
                            <p>今日節省總金額</p>
                            <p>$ 0 NTD</p>
                        </li>
                        <li class="d-flex justify-content-between fs-6">
                            <p>運送</p>
                            <p>$ 0 NTD</p>
                        </li>
                        <li class="d-flex justify-content-between fs-6">
                            <p>稅款</p>
                            <p>$ 0 NTD</p>
                        </li>
                    </ul>
                    <div class="mb-4">
                        <label
                            for="cupon"
                            class="mb-2"
                        >
                            優惠碼(未開放)
                        </label>
                        <input
                            id="cupon"
                            class="w-100 border rounded-1 p-1"
                            placeholder="請輸入優惠碼"
                            type="text"
                            disabled="true"
                        />
                    </div>
                    <!-- 總結 -->
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <p class="fs-5 fw-medium">總金額</p>
                        <p class="fs-5 fw-medium">NTD $ {{ total }}</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import { useCartDataStore } from '@/stores/cartData'
    export default {
        data() {
            return {
                cartDataInstance: useCartDataStore(),
                page: 1,
                form: {
                    email: '',
                    name: '',
                    tel: '',
                    address: '',
                    cardNumber: '',
                    cardName: '',
                    cvc: ''
                }
            }
        },
        created() {
            this.cartDataInstance.initCartData()
        },
        methods: {
            //form data
            onSubmit(e) {
                e.preventDefault()
                alert(JSON.stringify(this.form))
            },
            //page
            pageHandler(cal) {
                switch (cal) {
                    case 'add':
                        this.page += 1
                        break
                    case 'del':
                        if (this.page === 1) return
                        this.page -= 1
                        break
                }
            },
            // quantity
            quantityHandler(e) {
                const { index, cal } = e.target.dataset

                if (this.cartDataInstance.cartData[index].quantity === 1 && cal === 'del') return

                const newData = {
                    ...this.cartDataInstance.cartData[index],
                    tickType: { ...this.cartDataInstance.cartData[index].tickType },
                    quantity:
                        cal === 'add'
                            ? this.cartDataInstance.cartData[index].quantity + 1
                            : cal === 'del'
                            ? this.cartDataInstance.cartData[index].quantity - 1
                            : 1
                }
                this.cartDataInstance.updateCartItem(newData, index)
            }
        },
        computed: {
            total() {
                return this.cartDataInstance.cartData.length > 1
                    ? this.cartDataInstance.cartData.reduce(
                          (pre, next) => pre.price * pre.quantity + next.price * next.quantity
                      )
                    : this.cartDataInstance.cartData.length === 1
                    ? this.cartDataInstance.cartData[0].price *
                      this.cartDataInstance.cartData[0].quantity
                    : 0
            },
            nextBtnDisable() {
                return this.page === 1
            }
            //表單驗證
            // validationName() {
            //     if (this.name.length === 0) {
            //         return true
            //     }
            //     return false
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .box {
        width: 32px;
        height: 32px;
    }
    .h-0 {
        height: 0;
    }
    .img-box {
        object-fit: cover;
        border-radius: 0.25rem;
        width: 125px;
        height: 125px;
    }

    .img-box-2 {
        object-fit: cover;
        border-radius: 0.25rem;
        width: 75px;
        height: 75px;
    }
</style>
