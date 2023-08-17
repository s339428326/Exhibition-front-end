<template>
    <div :class="className">
        <b-form-group
            :label="label"
            v-slot="{ ariaDescribedby }"
        >
            <b-form-radio
                v-for="(item, idx) in options"
                :key="idx"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                :name="name"
                :value="item.value"
                >{{ item.name }}</b-form-radio
            >
            <a
                v-if="btnName != ''"
                href="#"
                @click="excute"
                ref="refBtnName"
                >{{ btnName }}</a
            >
        </b-form-group>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    defineProps({
        options: Array,
        label: String,
        typeSelected: String,
        name: String,
        className: String,
        btnName: String
    })
    const emit = defineEmits(['update', 'btnEvent'])

    const selected = ref(null)

    watch(selected, async (newVal) => {
        emit('update', newVal)
    })

    const refBtnName = ref(null)

    const excute = () => {
        // 隱藏按鈕
        refBtnName.value.style.display = 'none'
        emit('btnEvent')
    }
</script>

<style lang="scss" scoped>
    :deep(.form-label) {
        font-weight: 700;
    }
</style>
