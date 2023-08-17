<template>
    <h1>test</h1>
    <div id="map-container"></div>
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
</style>
<script>
    import 'https://leafletjs.com/examples/choropleth/us-states.js'
    import '../assets/js/d3.js'
    import * as d3 from 'd3'
    import * as topojson from 'topojson'

    export default {
        created() {
            // this.draw()
        },
        mounted() {
            this.draw()
        },
        methods: {
            draw() {
                let svg = d3
                    .select('#map-container')
                    .append('svg')
                    .attr('width', 400)
                    .attr('height', 600)

                var projectmethod = d3.geoMercator().center([123, 24]).scale(8500)
                var pathGenerator = d3.geoPath().projection(projectmethod)
                d3.json('../COUNTY_MOI_1090820.json').then((data) => {
                    const geometries = topojson.feature(data, data.objects['COUNTY_MOI_1090820'])

                    svg.append('path')
                    const paths = svg.selectAll('path').data(geometries.features)
                    paths
                        .enter()
                        .append('path')
                        .attr('d', pathGenerator)
                        .attr('class', 'county')
                        // 加上簡易版本 tooltip
                        .append('title')
                        .text((d) => d.properties['COUNTYNAME'])
                })
            }
        }
    }
</script>
<style scoped></style>
