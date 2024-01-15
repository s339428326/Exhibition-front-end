<script setup>
    import { onMounted, ref } from 'vue'

    import { userDataStore } from '../../stores/userData'
    import { userTicketList } from '../../api/ticket'

    import Select from '../../components/Form/Select.vue'
    import ExhibitionQR from '../../components/QRcode/ExhibitionQR.vue'

    const user = userDataStore()
    const ticketList = ref([]) //keep data to pinia
    const keyWord = ref('')

    const changeTicketView = ref(false)
    const exhibitionListData = ref([])

    //Qrcode modal ref
    const qrcodeData = ref({})

    //format API data  Array to  Object
    /**
     *
     * @param {*} tickets :整理來自於API userTicketList 得Array to Object
     */
    const formatTicketList = (tickets) => {
        //Ticket constructor
        class Ticket {
            constructor(data) {
                if (!data) {
                    throw Error('please check, Ticket class constructor dependency parameters ')
                }
                this._id = data?._id
                this.name = data?.name
                this.isAvailable = data?.isAvailable
                this.startDate = data?.startDate
                this.endDate = data?.endDate
                this.qrcode = data?.qrcode
                this.ticketType = data?.ticketType?.ticketType
            }
        }

        const result = {}

        //format API Get userTicketList Data
        tickets.data.forEach((ticket) => {
            if (
                !Object.keys(result)
                    .map((resultItem) => resultItem)
                    .includes(ticket.name)
            ) {
                result[`${ticket.name}`] = {
                    id: ticket.id,
                    startDate: ticket.startDate,
                    endDate: ticket.endDate,
                    image: ticket.image,
                    ticketArr: [new Ticket(ticket)]
                }
            } else {
                result[`${ticket.name}`].ticketArr.push(new Ticket(ticket))
            }
        })
        return result
    }

    const backMainViewHandler = () => {
        changeTicketView.value = false
    }

    const changeTicketListHandler = (arr) => {
        //[feature] route keep Exhibition name to route
        changeTicketView.value = true
        exhibitionListData.value = arr
    }

    const showQrcodeHandler = (item) => {
        qrcodeData.value = { ...item }
    }

    const init = async () => {
        await user.initUserData()
        const tickets = await userTicketList(user.userData?.id)
        const result = formatTicketList(tickets)

        //[Dev] check object view
        // alert(JSON.stringify(result, null, 2))

        //init data
        ticketList.value = result
    }

    onMounted(async () => {
        await init()
    })
</script>
<template>
    <div v-if="!changeTicketView">
        <div class="border rounded p-3 mb-4 d-flex gap-4">
            <Select
                :default-value="'展覽名稱'"
                :item-list="['展覽名稱', '訂單編號']"
            />
            <div class="form-floating flex-grow-1">
                <input
                    v-model="keyWord"
                    @input="searchHandler(keyWord)"
                    id="search"
                    class="form-control"
                    type="search"
                />
                <label for="search">搜索項目</label>
            </div>
        </div>
        <div>
            <!-- ticketList -->
            <ul class="row">
                <li
                    class="col col-md-6 col-lg-4 mb-4"
                    v-for="([key, value], index) in Object.entries(ticketList).filter(
                        ([key, _value]) => key.match(keyWord)
                    )"
                    :key="index"
                >
                    <div class="border rounded overflow-hidden">
                        <img
                            class="object-fit-cover w-100"
                            height="150"
                            :src="value?.image"
                            :alt="key"
                        />
                        <div class="p-3">
                            <h2 class="fs-6 text-ellipsis-1 mb-0">
                                {{ key }}
                            </h2>
                            <p class="text-info">
                                {{ new Date(value?.startDate).toLocaleString().split(' ')[0] }} ~
                                {{ new Date(value?.endDate).toLocaleString().split(' ')[0] }}
                            </p>
                            <p>票卷總數：{{ value.ticketArr.length }}</p>
                        </div>
                        <button
                            @click="changeTicketListHandler(value.ticketArr)"
                            class="btn btn-dark w-100 rounded-0"
                        >
                            點擊查看
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div v-else>
        <button
            class="btn btn-outline-dark d-flex align-items-center mb-4"
            @click="backMainViewHandler"
            type="button"
        >
            <ChevronLeft />
            <span> 返回 </span>
        </button>
        <ul class="d-flex flex-column gap-3">
            <li
                class="border rounded p-2 d-flex justify-content-between"
                v-for="(item, index) in exhibitionListData"
                :key="index"
            >
                <div>
                    <div class="d-flex align-items-center gap-2">
                        <p>{{ item?.name }}({{ item.ticketType }})</p>
                        <div
                            :class="`fs-7 p-1 rounded-pill text-white ${
                                item?.isAvailable ? 'bg-secondary ' : 'bg-danger'
                            }`"
                        >
                            {{ item?.isAvailable ? '未使用' : '已使用' }}
                        </div>
                    </div>
                    <p class="text-info fs-6 fw-medium">
                        {{ new Date(item?.startDate).toLocaleString().split(' ')[0] }} ~
                        {{ new Date(item?.endDate).toLocaleString().split(' ')[0] }}
                    </p>
                </div>
                <div>
                    <!-- Qrcode Btn -->
                    <button
                        @click="showQrcodeHandler(item)"
                        type="button"
                        class="btn btn-dark h-100"
                        data-bs-toggle="modal"
                        data-bs-target="#qrcodeModal"
                    >
                        入場碼
                    </button>
                </div>

                <!-- <p>{{ item?.isAvailable }}</p> -->
            </li>
            <!-- Qrcode Modal -->
            <Teleport to="body">
                <div
                    class="modal fade"
                    id="qrcodeModal"
                    tabindex="-1"
                    aria-labelledby="qrcodeModal"
                    aria-hidden="true"
                >
                    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1
                                    class="modal-title fs-5"
                                    id="qrcodeModal"
                                >
                                    <div class="d-flex align-items-center gap-2">
                                        <p class="text-ellipsis-1">
                                            {{ qrcodeData?.name }}
                                        </p>

                                        <div
                                            :class="`fs-7 p-1 rounded-pill text-white ${
                                                qrcodeData?.isAvailable
                                                    ? 'bg-secondary '
                                                    : 'bg-danger'
                                            }`"
                                        >
                                            {{ qrcodeData?.isAvailable ? '未使用' : '已使用' }}
                                        </div>
                                    </div>
                                </h1>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">
                                <p class="text-center">{{ qrcodeData.ticketType }}</p>
                                <div
                                    class="d-flex justify-content-center"
                                    v-if="qrcodeData"
                                >
                                    <ExhibitionQR
                                        :content="`${qrcodeData?._id} ${qrcodeData?.qrcode}`"
                                    />
                                </div>
                                <p class="text-danger fs-7 fw-medium text-center">
                                    Qrcode等同於票卷, 請勿外洩
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Teleport>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
    .text-ellipsis-1 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
