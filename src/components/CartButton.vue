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
                let total = 0
                this.cartDataInstance.cartData.forEach((item) => {
                    total += item.price * item.quantity
                })
                return total
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
            },
            closeModelHandler() {
                window.document.querySelector('body').style = null
            }
        }
    }
</script>

<template>
    <button
        class="btn btn-cart p-1 bg-light"
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
                            class="cart-item__image"
                            :src="item.image"
                            :alt="item.name"
                        />
                    </div>
                    <div class="cart-item__content">
                        <p class="item-title">{{ item.name }}</p>
                        <small class="text-black-50">
                            {{ new Date(item.startDate).toLocaleDateString() }} ~
                            {{ new Date(item.endDate).toLocaleDateString() }}</small
                        >
                        <div class="d-flex align-items-center gap-1">
                            <span>{{ item.ticketType.ticketType }}</span>
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
            <router-link
                class="btn btn-primary"
                to="/payment/confirm"
                @click="closeModelHandler"
            >
                前往結帳
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .item-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .btn-cart {
        position: relative;
        p {
            position: absolute;
            top: -12px;
            right: -12px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: red;
            color: #fff;
        }
    }

    .cart-item__content {
        max-width: 210px;
    }
    .cart-item__image {
        border-radius: 0.25rem;
        width: 125px;
        height: 125px;
        object-fit: cover;
    }
</style>
