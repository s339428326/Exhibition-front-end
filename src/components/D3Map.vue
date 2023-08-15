<template>
    <h1>test</h1>
    <svg
        width="800"
        height="500"
    ></svg>
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
</script>
