<template>
    <div class="d-flex flex-column">
        <label
            class="text-dark"
            :for="id"
            >{{ labelName }}</label
        >
        <VeeField
            :id="id"
            :class="`border-bottom border-top-0 border-start-0 border-end-0  p-1 ${
                errors[`${name}`] ? 'border-danger' : 'border-black'
            }`"
            :placeholder="placeholder"
            :name="name"
            :type="type"
            :rules="rules"
        />
        <ErrorMessage
            v-if="errors[`${name}`]"
            as="p"
            class="text-danger errorMessage"
            :name="name"
        />
        <p
            v-else
            class="errorMessage"
        ></p>
    </div>
</template>
<script setup>
    defineProps({
        id: String,
        labelName: String,
        errors: Object,
        rules: String,
        type: String,
        name: String,
        placeholder: String
    })
</script>
<style lang="scss">
    .errorMessage {
        font-size: 0.8rem;
        height: 19.2px;
    }
</style>
