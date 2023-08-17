<template>
    <section class="row py-4">
        <div
            class="col-12 col-lg-6 mb-2 mb-md-0"
            id="map-container"
            ref="map"
        >
            <svg id="map"></svg>
        </div>
        <div class="col-12 col-lg-6">
            <h5>目前選擇項目：{{ currentCounty }}</h5>
            <ul>
                <li>item</li>
                <li>item</li>
                <li>item</li>
            </ul>
        </div>
    </section>
</template>
<style lang="scss">
    body {
        background: #fff;
    }

    .county {
        fill: #ebf0e4;
        stroke: gray;
        stroke-width: 0.1px;
    }

    .county:hover {
        fill: red;
    }
    .active {
        fill: #8fcf36;
    }
</style>
<script>
    import 'https://leafletjs.com/examples/choropleth/us-states.js'
    import * as d3 from 'd3'
    import * as topojson from 'topojson'
    export default {
        data() {
            //memo map list title
            return {
                w: window.innerWidth,
                currentCounty: '台北市'
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
            },
            //draw map
            async draw() {
                //refer: https://www.letswrite.tw/d3-vue-taiwan-map/
                let width = this.$refs.map.offsetWidth - 12
                let height = window.innerHeight - 500

                // const w = window.screen.width
                let rwdScale = 11000 //rwd scale number
                let centerX = 122
                let centerY = 24.3
                if (this.w > 992) {
                    rwdScale = 11000 //pc
                    centerX = 122
                    centerY = 24.3
                } else if (this.w <= 992 && this.w > 414) {
                    width = this.$refs.map.offsetWidth - 24
                    rwdScale = 9000 //pc
                    centerX = 122.6
                    centerY = 24
                    height = window.innerHeight - 650
                } else {
                    width = this.$refs.map.offsetWidth - 24
                    rwdScale = 6000 //mobile
                    centerX = 123.8
                    centerY = 23.3
                    height = window.innerHeight - 450
                }

                document.querySelector('#map').innerHTML = ''
                console.log(this.w, width, rwdScale, centerX, centerY)
                //bind d3 Dom
                const svg = d3.select('#map').attr('width', width).attr('height', height)

                //path generator
                const path = await d3
                    .geoPath()
                    .projection(d3.geoMercator().center([centerX, centerY]).scale(rwdScale))

                //read json
                await d3.json('../COUNTY_MOI_1090820.json').then((data) => {
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
                    // 添加点击事件监听器
                })
            }
        }
    }
</script>
<style scoped></style>
