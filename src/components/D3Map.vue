<template>
    <section class="row py-4">
        <div
            class="col-12 col-lg-6 mb-2 mb-md-0 bg-light rounded-4"
            id="map-container"
            ref="map"
        >
            <svg id="map"></svg>
        </div>
        <div class="col-12 col-lg-6">
            <h5>目前選擇項目：{{ currentCounty }}</h5>
            <div
                v-for="(item, index) in products"
                :key="index"
            >
                <b-card
                    overlay
                    style="max-width: 100%"
                    :img-src="item.imgSrc"
                    :img-alt="item.imgAlt"
                    text-variant="white"
                    :class="`img-fit position-relative`"
                >
                    <b-card-text>
                        {{ (index + 1).toString().padStart(2, '0') }}
                        <p :class="`my-2 fs-4`">{{ item.productName }}</p>
                        <p :class="`position-absolute bottom-0 start-0 p-2`">
                            {{ item.productDate }}
                        </p>
                    </b-card-text>
                </b-card>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    body {
        background: #fff;
    }

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
    .img-fit {
        object-fit: contain;
    }
</style>

<script>
    import * as d3 from 'd3'
    import * as topojson from 'topojson'
    import jsonFile from '../assets/json/COUNTY_MOI_1090820.json'

    export default {
        data() {
            //memo map list title
            return {
                w: window.innerWidth,
                h: window.innerHeight,
                currentCounty: '台北市',
                products: [
                    {
                        imgSrc: 'https://picsum.photos/450/150/?image=42',
                        imgAlt: 'Card Image',
                        productArea: '台中',
                        productName: '花曲陳瑞瓊膠彩畫花曲陳瑞瓊膠彩畫花曲陳瑞瓊膠彩畫花曲花曲',
                        productDate: '2023/07/01'
                    },
                    {
                        imgSrc: 'https://picsum.photos/450/150/?image=43',
                        imgAlt: 'Card Image',
                        productArea: '新北',
                        productName: '花曲陳瑞瓊膠彩畫花曲陳瑞瓊膠彩畫花曲陳瑞瓊膠彩畫花曲花曲2',
                        productDate: '2023/07/01'
                    },
                    {
                        imgSrc: 'https://picsum.photos/450/150/?image=41',
                        imgAlt: 'Card Image',
                        productArea: '台中',
                        productName: '花曲陳瑞瓊膠彩畫花曲陳瑞瓊膠彩畫花曲陳瑞瓊膠彩畫花曲花曲3',
                        productDate: '2023/07/01'
                    }
                ]
            }
        },
        mounted() {
            this.draw()
            window.addEventListener('resize', this.handleResize)
        },
        unmounted() {
            window.removeEventListener('resize', this.handleResize)
        },
        methods: {
            //新增自適應 innerWidth for map
            handleResize() {
                // d3.select('#map').remove()
                this.draw()
                this.w = window.innerWidth
                this.w = window.innerHeight
            },
            //draw map
            async draw() {
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
                console.log(data)

                const geometries = topojson.feature(data, data.objects['COUNTY_MOI_1090820'])
                svg.append('path')
                const paths = svg.selectAll('path').data(geometries.features)

                paths
                    .enter()
                    .append('path')
                    //新增監聽事件
                    .on('click', (e, d) => {
                        console.log('click', d.properties['COUNTYNAME'])
                        this.currentCounty = d.properties['COUNTYNAME']
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
