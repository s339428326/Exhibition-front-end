<script>
    import { useCartDataStore } from '../stores/cartData'

    export default {
        data() {
            return {
                cartDataInstance: useCartDataStore()
            }
        },
        created() {
            this.cartDataInstance.initCartData()
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
            }
        },
        methods: {
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
        }
    }
</script>

<template>
    <button
        class="btn btn-cart"
        @click="handlerCart"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
    >
        <CartIcon :size="28" />
        <p>{{ cartDataInstance.cartData.length }}</p>
    </button>

    <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
    >
        <div class="offcanvas-header d-flex justify-content-start gap-4">
            <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
            <h5
                class="offcanvas-title"
                id="offcanvasExampleLabel"
            >
                購物車
            </h5>
        </div>
        <div class="offcanvas-body">
            <ul class="d-flex flex-column gap-4">
                <li
                    class="border shadow-md rounded-3 p-2 d-flex gap-3"
                    v-for="(item, index) in cartDataInstance.cartData"
                    :key="index"
                >
                    <div>
                        <img
                            class=""
                            :src="item.coverImage"
                            :alt="item.name"
                            width="125"
                            height="125"
                        />
                    </div>
                    <div>
                        <p>{{ item.name }}</p>
                        <small class="text-black-50"> {{ item.date }}</small>

                        <div class="d-flex align-items-center gap-1">
                            <span>{{ item.tickType.tickType }}</span>
                            <button
                                class="btn border-0"
                                @click="quantityHandler"
                                :data-index="index"
                                data-cal="del"
                            >
                                -
                            </button>
                            <p>{{ item.quantity }}</p>
                            <button
                                @click="quantityHandler"
                                class="btn border-0"
                                :data-index="index"
                                data-cal="add"
                            >
                                +
                            </button>

                            <button
                                class="ms-auto btn border-0"
                                @click="cartDataInstance.deleteCartItem(index)"
                            >
                                <DeleteCircleIcon :size="28" />
                            </button>
                        </div>
                        <p>NT ${{ item.price * item.quantity }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <!-- footer -->
        <div class="d-flex justify-content-between p-4 fs-5 border-top">
            <p>
                總價格：NT $
                {{ total }}
            </p>
            <button
                class="btn btn-primary"
                type="button"
            >
                前往結賬
            </button>
        </div>
    </div>
</template>

<style lang="scss">
    .btn-cart {
        position: relative;
        p {
            position: absolute;
            top: -8px;
            right: -8px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: red;
            color: #fff;
        }
    }
</style>
