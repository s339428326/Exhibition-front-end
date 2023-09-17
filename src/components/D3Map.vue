<template>
    <section class="row py-4 min-h-861">
        <div class="map-title d-block d-md-none">
            <div class="position-relative titleView text-light px-3 py-1 overflow-hidden d-flex">
                <h1 class="title-1 d-flex flex-column w-100 mt-2">
                    <p class="fs-5">城市</p>
                    <p class="fw-bold fs-1">{{ currentCounty }}</p>
                </h1>
                <div class="ms-auto mt-auto p-2 w-100 text-end">
                    <p class="fs-1 font-pathway">2023</p>
                    <p class="fs-5">最新展覽資訊</p>
                </div>
            </div>
        </div>
        <div
            class="col-12 col-lg-6 mb-2 mb-md-0 position-relative mb-4 mb-md-0"
            id="map-container"
            ref="map"
        >
            <div class="position-absolute map-title d-none d-md-block">
                <div
                    class="position-relative titleView text-light px-3 py-1 overflow-hidden d-flex"
                >
                    <h1 class="title-1 d-flex flex-column w-100 mt-2">
                        <p class="fs-5">城市</p>
                        <p class="fw-bold fs-4">{{ currentCounty }}</p>
                    </h1>
                    <div class="ms-auto mt-auto p-2 w-100 text-end">
                        <p class="fs-1 font-pathway">2023</p>
                        <p class="fs-7">最新展覽資訊</p>
                    </div>
                </div>
            </div>
            <svg id="map"></svg>
        </div>
        <div class="col-12 col-lg-6">
            <div
                class="d-flex justify-content-center h-100 flex-column gap-5 flex-wrap overflow-hidden align-items-center"
            >
                <Banner3DMenu :data="exhibitionListView" />
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .body {
        background: #fff;
    }

    .img-fit {
        object-fit: contain;
    }

    .fs-7 {
        font-size: 14px;
    }

    .min-h-861 {
        min-height: 861px;
    }

    //Top3 展覽用
    .image-box {
        object-fit: cover;
        object-position: top;
        width: 100%;
        max-height: 300px;
    }

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
        min-width: 250px;
        min-height: 150px;
        background-color: #0e0e0eb2;
        .title-1 {
            p:first-child {
                font-size: 1.5rem;
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
        fill: white;
        stroke: black;
        stroke-width: 1px;
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

    import Banner3DMenu from './HomePage/Banner3DMenu.vue'

    export default {
        components: {
            Banner3DMenu
        },
        data() {
            //memo map list title
            return {
                w: window.innerWidth,
                h: window.innerHeight,
                currentCounty: '臺北市',
                store: exhibitionStore(),
                exhibitionListView: [],
                exhibitionShowIndex: 0
            }
        },
        async mounted() {
            this.draw()
            window.addEventListener('resize', this.handleResize)
            await this.store.getAllExhibitionData()
            this.getExhibitionView('臺北')
        },
        unmounted() {
            window.removeEventListener('resize', this.handleResize)
        },
        methods: {
            getExhibitionView(country) {
                //filter location
                this.exhibitionListView = this.store.exhibitionList
                    .filter((item) => item.location.country === country)
                    .sort((a, b) => b.viewer - a.viewer)
                    .splice(0, 5)
            },
            //新增自適應 innerWidth for map
            handleResize() {
                // d3.select('#map').remove()
                this.draw()
                this.w = window.innerWidth
            },
            //draw map
            async draw() {
                console.log('render')
                //refer: https://www.letswrite.tw/d3-vue-taiwan-map/
                let width = this.$refs.map?.offsetWidth - 12
                let height = 816

                // const w = window.screen.width
                let rwdScale = 11000 //rwd scale number
                let centerX = 122
                let centerY = 24.5
                if (this.w > 991) {
                    rwdScale = 11000 //pc
                    centerX = 122
                    centerY = 24.5
                } else if (this.w <= 992 && this.w > 414) {
                    width = this.$refs.map.offsetWidth - 24
                    rwdScale = 9000 //pc
                    centerX = 121.8
                    centerY = 24
                    height = height * 0.8
                } else {
                    width = this.$refs.map.offsetWidth - 24
                    rwdScale = 6000 //mobile
                    centerX = 123.8
                    centerY = 23.3
                    height = height * 0.6
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

                document.querySelectorAll('.county').forEach((item) => {
                    if (item.textContent === this.currentCounty) {
                        item.classList.add('active')
                    }
                })

                return svg
            }
        }
    }
</script>
