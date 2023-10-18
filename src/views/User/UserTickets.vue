<script setup>
    import { onBeforeMount, onMounted, ref, watch } from 'vue'
    import { userDataStore } from '../../stores/userData'
    import { userTicketList } from '../../api/ticket'
    import Select from '../../components/Form/Select.vue'
    import ExhibitionQR from '../../components/QRcode/ExhibitionQR.vue'

    const user = userDataStore()
    const ticketList = ref([])

    const init = async () => {
        await user.initUserData()
        const tickets = await userTicketList(user.userData?.id)
        ticketList.value = tickets.data
    }

    onMounted(async () => {
        await init()
    })
</script>
<template>
    <div class="border rounded p-3 mb-4 d-flex gap-4">
        <Select
            :default-value="'展覽名稱'"
            :item-list="['展覽名稱', '訂單編號']"
        />
        <div class="form-floating flex-grow-1">
            <input
                id="search"
                class="form-control"
                type="search"
            />
            <label for="search">搜索項目</label>
        </div>
    </div>
    <div>
        <ul class="d-flex flex-column gap-3">
            <li
                class="border rounded p-3"
                v-for="(item, index) in ticketList"
                :key="index"
            >
                <!-- <p>原展覽ID：{{ item?.id }}</p> -->
                <p>名稱：{{ item?.name }}</p>
                <!-- <p>圖片:{{ item?.image }}</p> -->
                <!-- <p>開始{{ item?.startDate }}</p> -->
                <!-- <p>結束：{{ item?.endDate }}</p> -->
                <!-- <p>Qrcode: {{ item?.qrcode }}</p> -->
                <p>票卷ID(不顯示給用戶看):{{ item._id }}</p>
                <!-- <p>票卷類型:{{ item.ticketType.ticketType }}</p> -->
                <p>是否可用：{{ item?.isAvailable }}</p>
                <p>{{ item.ticketType }}</p>
                <ExhibitionQR :content="`VITE_SERVER${item?.qrcode}`" />
            </li>
        </ul>
    </div>
</template>
<style lang=""></style>
