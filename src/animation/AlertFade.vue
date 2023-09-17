<script setup></script>
<template>
    <Transition name="alert-fade">
        <slot></slot>
    </Transition>
</template>

<style lang="scss" scoped>
    .alert-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .alert-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .alert-fade-enter-from,
    .alert-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
</style>
