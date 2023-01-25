<template>
    <TextSection
        title="Origin & Appearance"
        :model-value="description"
        @update:model-value="update"/>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import TextSection from "@/components/common/TextSection.vue";

export default defineComponent({
    name: "Description",
    emits: ['update:description'],
    components: {
        TextSection
    },
    props: {
        description: {
            type: String,
            required: true
        }
    },
    methods: {
        update(value: string) {
            this.$emit('update:description', value)
        }
    }


})
</script>
