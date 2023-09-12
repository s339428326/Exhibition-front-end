<template>
    <footer class="bg-dark text-white">
        <section class="container">
            <div class="border-bottom border-white mb-2 py-4">
                <div class="d-flex flex-wrap gap-4">
                    <div class="footer--items_1">
                        <div class="text-light font-quantum fs-1 l-h-1 mb-4 mb-lg-5">
                            <div>
                                <span class="fw-normal text-secondary">A</span>
                                <span class="fw-normal">rt</span>
                            </div>

                            <span class="fw-normal"> Search </span>
                            <p class="text-secondary">Fair</p>
                        </div>
                        <div class="d-flex gap-4">
                            <router-link to="#">
                                <img
                                    src="../../assets/images/appleStore.png"
                                    alt=""
                                />
                            </router-link>
                            <router-link to="#">
                                <img
                                    class=""
                                    src="../../assets/images/GooglePlay.png"
                                    alt=""
                                />
                            </router-link>
                        </div>
                    </div>
                    <div class="footer--items__list">
                        <ul class="d-flex flex-column gap-1">
                            <li class="fw-bold mb-3">商業合作</li>
                            <li>
                                <router-link
                                    class="footer-link"
                                    to="#"
                                    >成為合作夥伴</router-link
                                >
                            </li>
                            <li>
                                <router-link
                                    class="footer-link"
                                    to="#"
                                    >聯盟行銷合作</router-link
                                >
                            </li>
                        </ul>
                        <ul class="d-flex flex-column gap-1">
                            <li class="fw-bold mb-3">關於我們</li>
                            <li>
                                <router-link
                                    class="footer-link"
                                    to="#"
                                    >企業徵才</router-link
                                >
                            </li>
                            <li>
                                <router-link
                                    class="footer-link"
                                    to="#"
                                    >相關新聞</router-link
                                >
                            </li>
                        </ul>
                        <ul class="d-flex flex-column gap-1">
                            <li class="fw-bold mb-3">取得協助</li>
                            <li>
                                <router-link
                                    class="footer-link"
                                    to="#"
                                    >常見問題</router-link
                                >
                            </li>
                            <li>
                                <router-link
                                    class="footer-link"
                                    to="#"
                                    >歷史訂單</router-link
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div
                class="p-2 d-flex flex-column flex-md-row gap-1 gap-md-4 text-white align-items-center flex-wrap"
            >
                <p class="text-center">© 2023 Art Search Fair All Rights Reserved.</p>
                <div class="d-flex gap-2">
                    <router-link
                        class="footer-link"
                        to="#"
                        >隱私權政策</router-link
                    >
                    <router-link
                        class="footer-link"
                        to="#"
                        >使用者條款</router-link
                    >
                </div>
            </div>
        </section>
    </footer>
</template>

<script setup></script>

<style lang="scss">
    // Google font for Logo
    @import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');

    .fs-7 {
        font-size: 14px;
    }

    .l-h-1 {
        line-height: 0.75;
    }
    .outline-0 {
        outline: none;
    }

    .font-alata {
        font-family: 'Alata', sans-serif;
    }

    .footer-link {
        color: white;
        font-size: 14px;
    }

    .footer--items__list {
        display: flex;
        gap: 88px;
    }

    .footer--items_1 {
        margin-right: 121px;
    }
</style>
