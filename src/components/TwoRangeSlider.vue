<template>
    <div class="range_container bg-danger">
        <div class="sliders_control">
            <input
                id="fromSlider"
                type="range"
                value="10"
                min="0"
                max="100"
            />
            <input
                id="toSlider"
                type="range"
                value="40"
                min="0"
                max="100"
            />
        </div>
        <div class="form_control">
            <div class="form_control_container">
                <div class="form_control_container__time">Min</div>
                <input
                    class="form_control_container__time__input"
                    type="number"
                    id="fromInput"
                    value="10"
                    min="0"
                    max="100"
                />
            </div>
            <div class="form_control_container">
                <div class="form_control_container__time">Max</div>
                <input
                    class="form_control_container__time__input"
                    type="number"
                    id="toInput"
                    value="40"
                    min="0"
                    max="100"
                />
            </div>
        </div>
    </div>
</template>
<script setup></script>
<style lang="scss">
    /* https://medium.com/@predragdavidovic10/native-dual-range-slider-html-css-javascript-91e778134816 */
    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: all;
        width: 24px;
        height: 24px;
        background-color: black;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        /* box-shadow: 0 0 0 1px #c6c6c6; */
    }

    /* Range 移動點樣式 */
    input[type='range']::-moz-range-thumb {
        -webkit-appearance: none;
        pointer-events: all;
        width: 24px;
        height: 24px;
        background-color: black;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        /* box-shadow: 0 0 0 1px #c6c6c6; */
    }

    /* Range 移動桿 */
    input[type='range']::-webkit-slider-thumb:hover {
        background: #f7f7f7;
    }

    input[type='range']::-webkit-slider-thumb:active {
        /* box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
        -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe; */
    }
</style>
