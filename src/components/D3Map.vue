<script setup>
    defineProps({
        msg: {
            type: String,
            required: true
        }
    })
</script>

<template lang="pug">
<div class="container">
//- 地圖
#app.container
  .taiwan-map(ref="map")
  #map
    svg#svg(xmlns="http://www.w3.org/2000/svg", preserveAspectRatio="xMidYMid meet")

  .shop-list
    h1 {{ h1 }}
    h2 {{ h2 }}
    </div>
</template>

<style scoped>
    h1 {
        font-weight: 500;
        font-size: 2.6rem;
        position: relative;
        top: -10px;
    }

    h3 {
        font-size: 1.2rem;
    }

    .greetings h1,
    .greetings h3 {
        text-align: center;
    }

    @media (min-width: 1024px) {
        .greetings h1,
        .greetings h3 {
            text-align: left;
        }
    }
</style>
