<template>
    <div>
        <button
            type="button"
            class="btn btn-secondary"
            data-bs-toggle="popover"
            data-bs-placement="right"
            data-bs-custom-class="custom-popover"
            data-bs-title="客製化title"
            data-bs-content="客製化Lorem ipsum dolor sit amet consectetur."
        >
            Custom popover
        </button>
    </div>
</template>

<script>
    import { Popover } from 'bootstrap'
    export default {
        mounted() {
            const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
            const popoverList = [...popoverTriggerList]
            popoverList.map((popoverTriggerEl) => new Popover(popoverTriggerEl))
        }
    }
</script>

<style lang="scss" scoped></style>
