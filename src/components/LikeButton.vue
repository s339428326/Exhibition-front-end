<template>
    <button
        :class="className"
        @click="handler"
    >
        <HeartOutlineIcon v-if="isLike === false" />
        <HeartIcon v-if="isLike === true" />
        <slot name="content"></slot>
    </button>
</template>

<script>
    export default {
        props: {
            className: String, //coustom classname
            data: Object, // memo data item
            isLike: Boolean, // change btn icons prop
            handler: Function
        }
    }
</script>

<style lang="scss"></style>
