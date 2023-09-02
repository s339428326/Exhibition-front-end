<template>
    <section class="row py-4">
        <div
            class="col-12 col-lg-6 mb-2 mb-md-0 position-relative"
            id="map-container"
            ref="map"
        >
            <div class="position-absolute">
                <h5 class="fs-3 fw-medium p-4">{{ currentCounty }}</h5>
            </div>
            <svg id="map"></svg>
        </div>
        <div class="col-12 col-lg-6">
            <div class="ms-auto mb-4">
                <div class="position-relative titleView text-light px-3 py-4 overflow-hidden">
                    <h1 class="title-1 d-flex flex-column">
                        <p class="font-pathway">2023</p>
                        <p class="fs-7">展覽售票檢索</p>
                    </h1>
                    <div class="text-end">
                        <p class="fs-7">最新展覽資訊</p>
                        <p class="fs-7">New Exhibition Information</p>
                    </div>
                </div>
            </div>

            <ul
                v-for="(item, index) in exhibitionListView"
                :key="index"
            >
                <li class="mb-4">
                    <!-- time -->
                    <div
                        class="d-flex align-items-end gap-0 lh-1 border-bottom border-3 border-dark gap-3 mb-2"
                    >
                        <div class="font-quantum">
                            <p class="fs-1">{{ new Date(item.startDate).getFullYear() }}</p>
                            <div class="fs-3 d-flex align-items-center">
                                <span>{{
                                    `${new Date(item.startDate).getMonth()}.${new Date(
                                        item.startDate
                                    ).getDate()}`
                                }}</span>
                                <ChevronRight :size="32" />
                                <span>{{
                                    `${new Date(item.endDate).getMonth()}.${new Date(
                                        item.endDate
                                    ).getDate()}`
                                }}</span>
                            </div>
                        </div>
                        <p class="fs-4 mb-2 fw-bold list-title">
                            {{ item.name }}
                        </p>
                        <button class="font-quantum border-0 bg-transparent ms-auto fs-4">
                            more
                        </button>
                    </div>
                    <div class="fw-medium list-content">
                        {{ item.introduce }}
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss">
    body {
        background: #fff;
    }

    .img-fit {
        object-fit: contain;
    }

    .fs-7 {
        font-size: 14px;
    }

    //Top3 展覽用
    .list-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .list-content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

    //Home page 斜線設計區塊
    .titleView {
        background-color: #0e0e0eb2;
        .title-1 {
            p:first-child {
                font-size: 3rem;
                line-height: 1.2;
            }
        }
    }

    .titleView::after {
        position: absolute;
        top: 50%;
        left: 3%;
        content: '';
        display: block;
        width: 95%;
        height: 2px;
        transform: rotate(330deg);
        background-color: white;
    }

    .lh-1 {
        line-height: 1;
    }

    //D3 使用樣式
    .county {
        fill: #d9d9d9;
        stroke: #f8f9fa;
        stroke-width: 4px;
    }

    .county:hover {
        fill: #828282;
    }

    .active {
        fill: #4e4e4e;
    }
</style>

<script>
    import * as d3 from 'd3'
    import * as topojson from 'topojson'
    import jsonFile from '../assets/json/COUNTY_MOI_1090820.json'
    import { exhibitionStore } from '../stores/exhibitionList'
    import _ from 'lodash'
    export default {
        data() {
            //memo map list title
            return {
                w: window.innerWidth,
                h: window.innerHeight,
                currentCounty: '臺北市',
                store: exhibitionStore(),
                exhibitionListView: []
            }
        },
        async mounted() {
            this.draw()
            window.addEventListener('resize', this.handleResize)
            //
            await this.store.getAllExhibitionData()
            this.getExhibitionView('臺北')
        },
        unmounted() {
            window.removeEventListener('resize', _.debounce(this.handleResize), 1000)
        },
        methods: {
            getExhibitionView(country) {
                //filter location
                this.exhibitionListView = this.store.exhibitionList
                    .filter((item) => item.location.country === country)
                    .sort((a, b) => b.viewer - a.viewer)
                    .splice(0, 3)
            },
            //新增自適應 innerWidth for map
            handleResize() {
                // d3.select('#map').remove()
                //等3 sec 執行
                this.draw()
                this.w = window.innerWidth
                this.w = window.innerHeight
            },
            //draw map
            async draw() {
                console.log('render')
                //refer: https://www.letswrite.tw/d3-vue-taiwan-map/
                let width = this.$refs.map.offsetWidth - 12
                let height = window.innerHeight

                // const w = window.screen.width
                let rwdScale = 11000 //rwd scale number
                let centerX = 122
                let centerY = 24.3
                if (this.w > 992) {
                    rwdScale = 11000 //pc
                    centerX = 122
                    centerY = 24.3
                    height = this.h * 0.6
                } else if (this.w <= 992 && this.w > 414) {
                    width = this.$refs.map.offsetWidth - 24
                    rwdScale = 9000 //pc
                    centerX = 122.6
                    centerY = 24
                    height = this.h * 0.5
                } else {
                    width = this.$refs.map.offsetWidth - 24
                    rwdScale = 6000 //mobile
                    centerX = 123.8
                    centerY = 23.3
                    height = this.h * 0.5
                }

                document.querySelector('#map').innerHTML = ''
                // console.log(this.w, width, rwdScale, centerX, centerY)
                //bind d3 Dom
                const svg = d3.select('#map').attr('width', width).attr('height', height)

                //path generator
                const path = await d3
                    .geoPath()
                    .projection(d3.geoMercator().center([centerX, centerY]).scale(rwdScale))

                const data = jsonFile
                // console.log(data)

                const geometries = topojson.feature(data, data.objects['COUNTY_MOI_1090820'])
                svg.append('path')
                const paths = svg.selectAll('path').data(geometries.features)

                paths
                    .enter()
                    .append('path')
                    //新增監聽事件
                    .on('click', async (e, d) => {
                        console.log('click', d.properties['COUNTYNAME'])
                        this.currentCounty = d.properties['COUNTYNAME']

                        console.log(this.currentCounty.slice(0, 2))
                        this.getExhibitionView(this.currentCounty.slice(0, 2))

                        const activeList = document.querySelectorAll('.active')

                        activeList.forEach((item) => {
                            item.classList.remove('active')
                        })

                        e.target.classList.add('active')
                    })
                    .attr('d', path)
                    .attr('class', `county`)
                    // 加上簡易版本 tooltip
                    .append('title')
                    .text((d) => d.properties['COUNTYNAME'])

                return svg
            }
        }
    }
</script>
