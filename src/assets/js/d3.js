// // 座標變換函式
// var path = d3.geo.path().projection(
//     d3.geo
//         .mercator()
//         .center([121, 24])
//         .scale(mercatorScale)
//         .translate([width / 2, height / 2.5])
// )
// let mercatorScale,
//     w = window.screen.width
// if (w > 1366) {
//     mercatorScale = 11000
// } else if (w <= 1366 && w > 480) {
//     mercatorScale = 9000
// } else {
//     mercatorScale = 6000
// }
// // 用外層的 div 當 svg 的寬高
// const width = (this.$refs.map.offsetWidth).toFixed(),
// 			height = (this.$refs.map.offsetHeight).toFixed();

// // 讓d3抓svg，並寫入寬高
// var svg = d3.select('#svg')
//             .attr('width', width)
//             .attr('height', height)
//             .attr('viewBox', `0 0 ${width} ${height}`);

// // 讓d3抓GeoJSON檔，並寫入path的路徑
// var url = '../../taiwan.geojson.json'; // GeoJSON的檔案路徑
// // src\taiwan.geojson.json
// d3.json(url, (error, geometry) => {
//   if (error) throw error;

//   svg
//     .selectAll('path')
//     .data(geometry.features)
//     .enter().append('path')
//     .attr('d', path)
//     .attr({
//       // 設定id，為了click時加class用
//       id: (d) => 'city' + d.properties.COUNTYCODE
//     })
//     .on('click', d => {
//       this.h1 = d.properties.COUNTYNAME; // 換中文名
//       this.h2 = d.properties.COUNTYENG; // 換英文名
//       // 有 .active 存在，就移除 .active
//       if(document.querySelector('.active')) {
//         document.querySelector('.active').classList.remove('active');
//       }
//       // 被點擊的縣市加上 .active
//       document.getElementById('city' + d.properties.COUNTYCODE).classList.add('active');
//     });
// });