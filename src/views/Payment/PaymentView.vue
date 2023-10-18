<script setup>
    import Cookies from 'js-cookie'
    import { ref, computed, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useCartDataStore } from '~/stores/cartData'
    import { userDataStore } from '../../stores/userData'
    import { getOrder } from '../../api/order'
    import { useAlert } from '../../stores/alertSlice'

    //vue-router
    const router = useRouter()
    //pinia
    const cart = useCartDataStore()
    const user = userDataStore()
    const { callAlert } = useAlert()

    //隱藏隱密資訊
    const hiddenString = (str, len) => {
        if (typeof str !== 'string') return
        return `${str.split('').splice(0, len).join('')}${'*'.repeat(str.length - len)}`
    }

    //controller page
    let pageView = ref(1)
    const userForm = ref(null)
    const paymentForm = ref(null)
    const orderData = ref({})

    //確認綠界回傳建立訂單成功
    const isPay = ref(false)

    const paymentHandler = async () => {
        try {
            //建立訂單//引導到Ec payment form page
            const { name, phone, address } = userForm.value.getValues()

            router.push({
                name: 'ECPayment',
                state: {
                    data: {
                        userId: user.userData?.id,
                        name,
                        phone,
                        address,
                        total: total.value,
                        orderList: JSON.parse(JSON.stringify(cart.cartData)),
                        TradeDesc: '此為測試性商品, 非授權販售感謝！',
                        TotalAmount: total.value.toString(),
                        ItemName: cart.cartData
                            .map(
                                (item) =>
                                    `${item.name}${item.ticketType.ticketType}x${item.quantity} 單價:${item.price}`
                            )
                            .join('#')
                    }
                }
            })
            // cart.clearCart() //clear form
        } catch (error) {
            callAlert({
                title: '訂單建立失敗',
                type: 'error'
            })
            console.error(error)
        }
    }

    const pageHandler = (method) => {
        if (pageView.value === 0) return

        switch (method) {
            case 'increase':
                pageView.value += 1
                break
            case 'decrease':
                pageView.value = pageView.value - 1
                console.log(pageView.value, pageView.value - 1)
                break
        }
    }

    const paymentFormHandler = (data) => {
        orderData.value = { ...orderData.value, ...data }
        pageView.value += 1
    }

    const userFormHandler = (data) => {
        orderData.value = { ...orderData.value, ...data }
        pageView.value += 1
    }

    const total = computed(() => {
        let result = 0
        if (cart.cartData?.length) {
            cart.cartData.forEach((item) => {
                result += item.price * item.quantity
            })
        }
        return result
    })

    const quantityHandler = (method, index) => {
        switch (method) {
            case 'increase':
                cart.updateCartItem(
                    { ...cart.cartData[index], quantity: cart.cartData[index]?.quantity + 1 },
                    index
                )
                break
            case 'decrease':
                if (cart.cartData[index]?.quantity === 0) return
                cart.updateCartItem(
                    { ...cart.cartData[index], quantity: cart.cartData[index]?.quantity - 1 },
                    index
                )
                break
            case 'delete':
                cart.deleteCartItem(index)
                break
        }
    }

    //確認是否有訂單重綠界回來
    const checkOrderIdIsPay = async () => {
        const orderId = Cookies.get('orderId')
        if (orderId) {
            //[Feature] Loading state
            // Loading state = true
            pageView.value = 3
            const order = await getOrder(Cookies.get('orderId'))
            console.log('[checkOrderIdIsPay order]', order)

            if (order?.data.isPay) {
                isPay.value = true
                pageView = 4
                orderData.value = order.data
                Cookies.remove('orderId')
            } else {
                // Loading state = false
                isPay.value = false
                pageView = 3
                console.log('check point [orderId check]', order, order?.data.isPay)
                Cookies.remove('orderId')
                callAlert({
                    title: '綠界付款失敗, 請通知後台人員',
                    type: 'error'
                })
            }
        } else {
            console.log('[dev]: 目前沒有orderId')
        }
    }

    //[Feature] init userData
    onMounted(() => {
        callAlert({
            title: '提醒:此頁面User info 未取得',
            type: 'error'
        })
        // if (!user.userData?.id) {
        //     router.push({
        //         name: 'Home'
        //     })
        //     callAlert({
        //         title: '建立訂單請勿重新整理頁面',
        //         type: 'error'
        //     })
        // }
        cart.initCartData()
        checkOrderIdIsPay()
    })
</script>

<template>
    <main class="container mb-5">
        <!-- Step Bar -->

        <section class="my-5">
            <ul class="d-flex justify-content-between p-4 border rounded-4 bg-gray shadow-sm">
                <li class="border-black p-2 after-line">
                    <p
                        class="border border-black p-2 fw-bold box d-flex align-items-center justify-content-center mx-auto mb-2"
                    >
                        1
                    </p>
                    <h1 class="text-center fs-6">建立訂單</h1>
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
            <div class="col-lg-8">
                <!-- page-1 -->
                <ul
                    v-if="pageView === 1"
                    class="d-flex gap-3 flex-column mb-4"
                >
                    <!-- Exhibition card -->
                    <li
                        v-for="(item, index) in cart.cartData"
                        :key="index"
                        class="border rounded p-3"
                    >
                        <div class="d-flex flex-row flex-md-column gap-4">
                            <div>
                                <img
                                    class="img-box"
                                    :src="item?.image"
                                />
                            </div>
                            <div>
                                <p class="fw-medium title-card">
                                    {{ item?.name }}
                                </p>
                                <p>({{ item?.ticketType?.ticketType }})</p>
                                <p class="text-info mb-2">
                                    {{ new Date(item?.startDate).toLocaleDateString() }} ~
                                    {{ new Date(item?.endDate).toLocaleDateString() }}
                                </p>
                            </div>
                        </div>
                        <!--  -->
                        <div class="d-flex justify-content-end gap-2 align-items-center ms-md-4">
                            <div :class="`d-flex gap-2 ${item.quantity === 0 && 'd-none'}`">
                                <p class="">價格</p>
                                <p class="text-info mb-2">NT$ {{ item?.price * item?.quantity }}</p>
                            </div>
                            <button
                                @click="quantityHandler('delete', index)"
                                :class="`btn text-danger ${item?.quantity !== 0 && 'd-none'}`"
                                type="button"
                            >
                                <DeleteCircleIcon :size="32" />
                                <span>刪除此項目</span>
                            </button>
                            <button
                                type="button"
                                @click="quantityHandler('decrease', index)"
                                class="btn btn-dark"
                            >
                                -
                            </button>
                            <p>{{ item?.quantity }}</p>
                            <button
                                type="button"
                                @click="quantityHandler('increase', index)"
                                class="btn btn-dark"
                            >
                                +
                            </button>
                        </div>
                    </li>
                    <div class="d-flex gap-4">
                        <!-- [Feature there] -->
                        <button
                            @click="pageHandler('decrease')"
                            class="btn btn-dark w-50"
                            type="button"
                            :disabled="pageView === 1"
                        >
                            上一步
                        </button>
                        <button
                            :class="`btn btn-dark w-50 ${pageView !== 1 && 'd-none'}`"
                            @click="pageHandler('increase')"
                            type="button"
                        >
                            下一步
                        </button>
                    </div>
                </ul>
                <!-- [Feature] Next call create Order to mongoDB, Call EC pay  -->
                <!-- page-2 -->
                <VeeForm
                    v-slot="{ meta, errors }"
                    id="userForm"
                    :class="`row ${pageView === 2 ? 'd-flex' : 'd-none'}`"
                    ref="userForm"
                    @submit="userFormHandler"
                >
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            <VeeField
                                id="name"
                                name="name"
                                :class="`form-control ${errors['name'] && 'is-invalid'}`"
                                placeholder="***"
                                type="text"
                                rules="max:20|required"
                            />
                            <label for="name">訂票人名稱</label>
                            <small
                                v-if="errors['name']"
                                class="text-danger"
                                >{{ errors['name'].replace('name', '訂票人名稱') }}</small
                            >
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            <VeeField
                                id="phone"
                                name="phone"
                                :class="`form-control ${errors['phone'] && 'is-invalid'}`"
                                placeholder="***"
                                type="text"
                                rules="min:12|max:20|required"
                            />
                            <label for="phone">聯絡電話</label>
                            <small
                                v-if="errors['phone']"
                                class="text-danger"
                                >{{ errors['phone'].replace('phone', '聯絡電話') }}</small
                            >
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-floating mb-3">
                            <VeeField
                                id="address"
                                name="address"
                                :class="`form-control ${errors['address'] && 'is-invalid'}`"
                                placeholder="***"
                                type="text"
                                rules="min:12|max:20|required"
                            />
                            <label for="address">地址(實體票寄送地址)</label>
                            <small
                                v-if="errors['address']"
                                class="text-danger"
                                >{{ errors['address'].replace('address', '地址') }}</small
                            >
                        </div>
                    </div>
                    <div class="d-flex gap-4">
                        <button
                            @click="pageHandler('decrease')"
                            class="btn btn-dark w-50"
                            type="button"
                        >
                            上一步
                        </button>
                        <button
                            :class="`btn btn-dark w-50`"
                            @click="paymentHandler"
                            type="button"
                            :disabled="!meta.valid"
                        >
                            下一步
                        </button>
                    </div>
                </VeeForm>
                <!-- page-3 -->
                <VeeForm
                    v-slot="{ meta, errors }"
                    id="paymentForm"
                    :class="`row ${pageView === 3 ? 'd-flex' : 'd-none'}`"
                    ref="paymentForm"
                    @submit="paymentFormHandler"
                >
                    <h1 class="fs-4">建立訂單結果</h1>
                    <p :class="`${!isPay && 'text-danger'}`">
                        綠界建立訂單{{ isPay ? '成功' : '失敗' }}
                    </p>
                    <ol class="mb-5">
                        <li>此為專案連接綠界測試服務</li>
                        <li>若出現失敗請自行點擊下一頁, 系統將默認成功</li>
                    </ol>
                    <button
                        class="btn btn-dark w-100"
                        @click="pageHandler('increase')"
                    >
                        下一步
                    </button>
                </VeeForm>
                <!-- page-finish -->
                <div :class="`${pageView === 4 ? 'd-block' : 'd-none'}`">
                    <div class="border rounded p-3 mb-4">
                        <p class="border-bottom pb-2 fs-5 fw-medium mb-2">訂購資料</p>
                        <ul class="d-flex flex-column gap-2">
                            <li
                                class="d-flex justify-content-between align-items-center"
                                v-for="(item, index) in cart?.cartData"
                                :key="index"
                            >
                                <div class="d-flex flex-column">
                                    <p>{{ item?.name }}</p>
                                    <p>{{ item?.ticketType?.ticketType }}</p>
                                </div>
                                <p>x {{ item?.quantity }}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="border rounded p-3 mb-4">
                        <p class="border-bottom pb-2 fs-5 fw-medium">聯絡人資訊</p>
                        <ul class="d-flex gap-2 flex-column my-2">
                            <li>訂購人：{{ hiddenString(orderData?.name, 2) }}</li>
                            <li>地址：{{ hiddenString(orderData?.address, 2) }}</li>
                            <li></li>
                        </ul>
                    </div>
                    <!-- 這裡要新增訂購成功更改isPay -->
                    <router-link
                        to="/"
                        class="btn btn-dark w-100"
                        type="button"
                    >
                        訂購成功
                    </router-link>
                </div>
            </div>
            <!-- right side -->
            <section class="col-lg-4">
                <div
                    class="border rounded-4 shadow-sm p-4 d-flex flex-column justify-content-between order-result"
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
    </main>
</template>

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
        width: 100%;
        height: 128px;
        object-position: top;
        @media screen and (max-width: 991px) {
            width: 64px;
            height: 64px;
        }
    }

    .title-card {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 60%;
        @media screen and (max-width: 768px) {
            max-width: unset;
            white-space: unset;
        }
    }
</style>
