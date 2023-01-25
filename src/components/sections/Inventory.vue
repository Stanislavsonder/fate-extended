<template>
    <TextSection
        title="Equipment & inventory"
        :model-value="inventory"
        @update:model-value="update"/>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import TextSection from "@/components/common/TextSection.vue";

export default defineComponent({
    name: "Inventory",
    emits: ['update:inventory'],
    components: {
        TextSection
    },
    props: {
        inventory: {
            type: String,
            required: true
        }
    },
    methods: {
        update(value: string) {
            this.$emit('update:inventory', value)
        }
    }


})
</script>
