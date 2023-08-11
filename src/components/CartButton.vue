<script>
    import { useCartDataStore } from '../stores/cartData'

    export default {
        setup() {
            const cartDataStore = useCartDataStore()
            const { updateCartItem, deleteCartItem, initCartData } = cartDataStore

            //取得localStorage Data
            initCartData()
            //cart
            const cartItems = cartDataStore.cartData
            const total =
                cartItems.length > 0
                    ? cartDataStore.cartData?.reduce(
                          (total, item) => total + item.price * item?.quantity,
                          0
                      )
                    : 0

            return {
                updateCartItem,
                deleteCartItem,
                cartItems,
                total
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
        <CartIcon size="28" />
        <p>{{ cartItems.length }}</p>
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
                Cart Title
            </h5>
        </div>
        <div class="offcanvas-body">
            <button
                class="btn btn-primary"
                type="button"
                @click="addItemHandler"
            >
                Test Button
            </button>
            <ul class="d-flex flex-column gap-4">
                <li
                    v-for="(item, index) in cartItems"
                    :key="index"
                >
                    {{ item.name }} {{ item.price }} {{ item.quantity }}
                </li>
            </ul>
            <section>
                <h5>測試區域</h5>
                <p>cartButton cartItems: {{ cartItems }}</p>
                <p>cartButton total: {{ total }}</p>
                <div>
                    <button
                        type="button"
                        @click="updateCartItem"
                    >
                        updateCartItem
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        @click="deleteCartItem"
                    >
                        deleteCartItem
                    </button>
                </div>
            </section>
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
