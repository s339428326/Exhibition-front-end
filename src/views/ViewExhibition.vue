<template>
    <main class="view-exhibition">
        <section class="cover-banner mb-4">
            <img
                src="https://pier2.org/upload/others/files/NVT6218.jpg"
                alt="exh-banner-cover"
            />
        </section>

        <section class="p-2 container mx-auto row mb-4">
            <div class="col-7">
                <!-- 展覽Title-->
                <div class="border-bottom pb-2 mb-4">
                    <div class="d-flex justify-content-between">
                        <h1>高雄駁二展覽｜人生紀念品</h1>
                        <div>
                            <button class="btn btn-outline-primary d-flex gap-2">
                                <span class="border">ICON</span>
                                <span>收藏</span>
                            </button>
                        </div>
                    </div>
                    <time
                        class="fs-4 fw-bold"
                        datetime="#"
                        >2023/12/31 ~ 2024/01/01
                    </time>
                </div>
                <p>
                    人生中有許多珍貴的回憶，這些回憶可能透過一些際遇留存下來。在斷捨離的潮流趨勢下，我們開始思考自己真正需要保留的東西是什麼。對於許多人來說，重要的紀念品不一定是價值昂貴的物品，而是那些充滿情感和回憶的物品。
                    可能是在某個重要的日子收到的花，讓你想起了某些時刻；可能是和寵物陪伴，在人生裡的一段時光；可能是在樹下一起望著天空的那天下午；可能是在獲得獎項被肯定的時刻，也可能是依舊想念的家鄉味道，這些物品不僅讓你回憶起過去的美好時光，也能夠讓你更感受到那些經歷真實性和重要。
                    重要的是，留下這些紀念品並不是要填滿你的家，而是讓你在未來的某一天拿起它們時，能夠感受到那份特別的情感和回憶。
                    你人生中最重要的紀念品是什麼？
                    「人生紀念品」展覽邀請各領域設計師重新詮釋自身或受訪者的人生故事，透過設計手法將故事濃縮淬煉成一件件紀念品，引領觀者從設計作品中品味各種人生故事的酸甜滋味，展覽也邀請知名設計師及文字工作者分享影響他們人生的重要紀念品，期待民眾從第三者角度閱讀他人故事的同時，也回想起一些人生值得紀念的片段，讓記憶中的故事因為展覽有新一層的體會及滋味。
                </p>
            </div>
            <div class="col-3">
                <div>
                    <h2 class="text-center mb-2 border rounded-2 p-2">售票價格</h2>
                    <div class="border rounded-3 p-2 fs-5 shadow-sm mb-2">
                        <ul>
                            <li>
                                <div class="ticket-choose">
                                    <input
                                        class="d-none"
                                        type="radio"
                                        name="售票選擇"
                                        id="單展票"
                                        value="單展票"
                                    />
                                    <label
                                        class="text-center w-100"
                                        for="單展票"
                                    >
                                        <p>單展票 80</p>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="ticket-choose">
                                    <input
                                        class="d-none"
                                        type="radio"
                                        name="售票選擇"
                                        id="套票"
                                        value="套票"
                                    />
                                    <label
                                        class="text-center w-100"
                                        for="套票"
                                    >
                                        <p>套票150</p>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <button
                        class="btn btn-primary w-100 mb-2"
                        type="button"
                    >
                        加入購物車
                    </button>
                    <button
                        class="btn btn-primary w-100"
                        type="button"
                    >
                        前往結賬
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup></script>
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
