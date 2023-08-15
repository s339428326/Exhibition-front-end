import * as d3 from 'd3'
import * as topojson from 'topojson'
var svg = d3.select('svg')

const g = svg.append('g')

var projectmethod = d3.geoMercator().center([121, 24]).scale(3500)
var pathGenerator = d3.geoPath().projection(projectmethod)
d3.json('../COUNTY_MOI_1090820.json').then((data) => {
    console.log(data)
    const geometries = topojson.feature(data, data.objects['COUNTY_MOI_1090820'])

    g.append('path')
    const paths = g.selectAll('path').data(geometries.features)
    paths
        .enter()
        .append('path')
        .attr('d', pathGenerator)
        .attr('class', 'county')
        // 加上簡易版本 tooltip
        .append('title')
        .text((d) => d.properties['COUNTYNAME'])
})
